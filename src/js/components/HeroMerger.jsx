import React, {Component} from 'react';
import {newHero} from '../../js/model';
import {arrayUnique} from '../../js/helpers';
import Hero from './Hero.jsx';
import '../../css/Form.css';

class HeroMerger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      newHeroCreated: false,
      heroId: 12,
      heroes: props.getHeroesData(),
      formData: {
        hero_name: '',
        real_name: '',
        gender: 'Male',
        attributes: {
          intelligence: 0,
          strength: 0,
          speed: 0,
          durability: 0,
          power: 0,
          combat: 0
        },
        powers: [],
        weaknesses: []
      },
      first_hero_selector: '',
      second_hero_selector: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHeroChange = this.handleHeroChange.bind(this);
    this.handlePowerChange = this.handlePowerChange.bind(this);
  }

  handleHeroChange(event) {
    this.setState({[event.target.name]: event.target.value}, () => {
      if (this.state.first_hero_selector !== '' && this.state.second_hero_selector !== '') {
        const selectedHeroes = this.state.heroes.filter(
          hero => (hero.id == this.state.first_hero_selector
          || hero.id == this.state.second_hero_selector));

        let formData = this.state.formData;
        formData.weaknesses = arrayUnique(selectedHeroes[0].weaknesses.concat(selectedHeroes[1].weaknesses));

        this.setState({
          showForm: true,
          selectedHeroes,
          formData
        });
      }
    });
  }
  // Validate Powers' checkbox and update formData with selected Powers
  handlePowerChange(event) {
    const target = event.target;
    let formData = this.state.formData;
    if (!target.checked) {
      const index = formData.powers.indexOf(target.value)
      if (index > -1) {
        formData.powers.splice(index, 1);
      }
    } else if (target.checked && !formData.powers[target.value]) {
      if (document.querySelectorAll('input[name="powers"]:checked').length > 5) {
        target.checked = false;
      } else {
        formData.powers.push(target.value)
      }
    }
    this.setState({formData});
  }

  // Update formData object with new changes in form fields
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const dataGroup = target.dataset.group ? target.dataset.group : null;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let formData = this.state.formData;

    if (dataGroup) {
      formData[dataGroup][name] = value;
    } else {
      formData[name] = value;
    }

    this.setState({
      formData
    });
  }

  handleSubmit(event) {
    newHero(this.state.formData).then((json) => {
      this.setState({newHeroCreated: true, heroId: json.id})
      this.props.updateHandle();
    });
    event.preventDefault();
  }

  render() {
    return (
      !this.state.newHeroCreated ? (
          <form className="Form" onSubmit={this.handleSubmit}>
            Select two heroes for merge:
            <div className="Form-field">
              <label className="Form-label">
                First Hero:&nbsp;
                <select required name="first_hero_selector"
                        value={this.state.first_hero_selector}
                        onChange={this.handleHeroChange}>
                  <option value="" disabled></option>
                  {this.state.heroes.map(hero => {
                    return (<option key={hero.id} value={hero.id}>{hero.hero_name}</option>);
                  })}
                </select>
              </label>
              &nbsp;&nbsp;
              <label className="Form-label">
                Second Hero:&nbsp;
                <select required name="second_hero_selector"
                        value={this.state.second_hero_selector}
                        onChange={this.handleHeroChange}>
                  <option value="" disabled></option>
                  {this.state.heroes.map(hero => {
                    return (<option key={hero.id} value={hero.id}>{hero.hero_name}</option>);
                  })}
                </select>
              </label>
            </div>
            {this.state.showForm ?
              <div>
                <div className="Form-field">
                  <label className="Form-label">
                    Hero Name:
                    <input required name="hero_name" type="text" value={this.state.formData.hero_name}
                           onChange={this.handleInputChange}/>
                  </label>
                </div>
                <div className="Form-field">
                  <label className="Form-label">
                    Real Name:
                    <input required name="real_name" type="text" value={this.state.formData.real_name}
                           onChange={this.handleInputChange}/>
                  </label>
                </div>
                <div className="Form-field">
                  Gender:
                  <label className="Form-label">
                    <input name="gender" type="radio" value="Male" checked={this.state.formData.gender === 'Male'}
                           onChange={this.handleInputChange}/>
                    Male
                  </label>
                  <label className="Form-label">
                    <input name="gender" type="radio" value="Female" checked={this.state.formData.gender === 'Female'}
                           onChange={this.handleInputChange}/>
                    Female
                  </label>
                </div>
                <br/>Attributes:

                <div className="Form-fieldSet">
                  <div className="Form-field">
                    Intelligence:
                    <label className="Form-label">
                      <input required name="intelligence" type="radio"
                             value={this.state.selectedHeroes[0].attributes.intelligence}
                             data-group="attributes"
                             checked={this.state.formData.attributes.intelligence == this.state.selectedHeroes[0].attributes.intelligence}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[0].attributes.intelligence}
                    </label>
                    <label className="Form-label">
                      <input required name="intelligence" type="radio"
                             value={this.state.selectedHeroes[1].attributes.intelligence}
                             data-group="attributes"
                             checked={this.state.formData.attributes.intelligence == this.state.selectedHeroes[1].attributes.intelligence}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[1].attributes.intelligence}
                    </label>
                  </div>
                  <div className="Form-field">
                    Strength:
                    <label className="Form-label">
                      <input required name="strength" type="radio"
                             value={this.state.selectedHeroes[0].attributes.strength}
                             data-group="attributes"
                             checked={this.state.formData.attributes.strength == this.state.selectedHeroes[0].attributes.strength}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[0].attributes.strength}
                    </label>
                    <label className="Form-label">
                      <input required name="strength" type="radio"
                             value={this.state.selectedHeroes[1].attributes.strength}
                             data-group="attributes"
                             checked={this.state.formData.attributes.strength == this.state.selectedHeroes[1].attributes.strength}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[1].attributes.strength}
                    </label>
                  </div>
                  <div className="Form-field">
                    Speed:
                    <label className="Form-label">
                      <input required name="speed" type="radio" value={this.state.selectedHeroes[0].attributes.speed}
                             data-group="attributes"
                             checked={this.state.formData.attributes.speed == this.state.selectedHeroes[0].attributes.speed}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[0].attributes.speed}
                    </label>
                    <label className="Form-label">
                      <input required name="speed" type="radio" value={this.state.selectedHeroes[1].attributes.speed}
                             data-group="attributes"
                             checked={this.state.formData.attributes.speed == this.state.selectedHeroes[1].attributes.speed}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[1].attributes.speed}
                    </label>
                  </div>
                  <div className="Form-field">
                    Durability:
                    <label className="Form-label">
                      <input required name="durability" type="radio"
                             value={this.state.selectedHeroes[0].attributes.durability}
                             data-group="attributes"
                             checked={this.state.formData.attributes.durability == this.state.selectedHeroes[0].attributes.durability}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[0].attributes.durability}
                    </label>
                    <label className="Form-label">
                      <input required name="durability" type="radio"
                             value={this.state.selectedHeroes[1].attributes.durability}
                             data-group="attributes"
                             checked={this.state.formData.attributes.durability == this.state.selectedHeroes[1].attributes.durability}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[1].attributes.durability}
                    </label>
                  </div>
                  <div className="Form-field">
                    Power:
                    <label className="Form-label">
                      <input required name="power" type="radio" value={this.state.selectedHeroes[0].attributes.power}
                             data-group="attributes"
                             checked={this.state.formData.attributes.power == this.state.selectedHeroes[0].attributes.power}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[0].attributes.power}
                    </label>
                    <label className="Form-label">
                      <input required name="power" type="radio" value={this.state.selectedHeroes[1].attributes.power}
                             data-group="attributes"
                             checked={this.state.formData.attributes.power == this.state.selectedHeroes[1].attributes.power}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[1].attributes.power}
                    </label>
                  </div>
                  <div className="Form-field">
                    Combat:
                    <label className="Form-label">
                      <input required name="combat" type="radio" value={this.state.selectedHeroes[0].attributes.combat}
                             data-group="attributes"
                             checked={this.state.formData.attributes.combat == this.state.selectedHeroes[0].attributes.combat}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[0].attributes.combat}
                    </label>
                    <label className="Form-label">
                      <input required name="combat" type="radio" value={this.state.selectedHeroes[1].attributes.combat}
                             data-group="attributes"
                             checked={this.state.formData.attributes.combat == this.state.selectedHeroes[1].attributes.combat}
                             onChange={this.handleInputChange}/>
                      {this.state.selectedHeroes[1].attributes.combat}
                    </label>
                  </div>
                </div>
                <br/>
                <div className="Form-field">
                  Powers:
                  <div className="Form-fieldInfo">Select Max Five Powers</div>
                  {arrayUnique(this.state.selectedHeroes[0].powers.concat(this.state.selectedHeroes[1].powers)).map(power => {
                    return (
                      <label key={power} className="Form-label">
                        <input name="powers" type="checkbox" value={power} onChange={this.handlePowerChange}/>
                        {power}
                      </label>
                    )
                  })}
                </div>
                <div className="Form-field">
                  <label className="Form-label">
                    Weaknesses:
                    <textarea disabled name="weaknesses" value={this.state.formData.weaknesses.join(', ')}/>
                  </label>
                  <div className="Form-fieldInfo">separate with commas</div>
                </div>
                <input type="submit" className="Form-submit" value="Submit"/>
              </div> : ''}
          </form>
        ) : (
          <div>
            <div className="Form-success">Your Merged Hero have been created!</div>
            <Hero {...this.state.formData}/>
          </div>
        )
    );
  }
}

export default HeroMerger;
