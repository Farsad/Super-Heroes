import React, {Component} from 'react';
import {newHero} from '../../js/model';
import Hero from './Hero.jsx';
import '../../css/Form.css';

class NewHero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newHeroCreated: false,
      heroId: null,
      formData: {
        hero_name: '',
        real_name: '',
        gender: 'Male',
        attributes: {
          intelligence: 50,
          strength: 50,
          speed: 50,
          durability: 50,
          power: 50,
          combat: 50
        },
        powers: [],
        weaknesses: []
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Update formData object with new changes in form fields
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const dataGroup = target.dataset.group ? target.dataset.group : null;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let formData = this.state.formData;

    // convert texts with comma to array (used for Powers and Weaknesses)
    if (target.dataset.dataType && target.dataset.dataType === 'array') {
      value = value.split(/\s*,\s*/);
    }

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
      this.setState({newHeroCreated: true, heroId: json.id});
      this.props.updateHandle();
    });
    event.preventDefault();
  }

  render() {
    return (
      !this.state.newHeroCreated ? (
          <form className="Form" onSubmit={this.handleSubmit}>
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
                <label className="Form-label">
                  Intelligence:
                  <input name="intelligence" type="range" min="0" max="100" data-group="attributes"
                         value={this.state.formData.attributes.intelligence}
                         onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="Form-field">
                <label className="Form-label">
                  Strength:
                  <input name="strength" type="range" min="0" max="100" data-group="attributes"
                         value={this.state.formData.attributes.strength}
                         onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="Form-field">
                <label className="Form-label">
                  Speed:
                  <input name="speed" type="range" min="0" max="100" data-group="attributes"
                         value={this.state.formData.attributes.speed}
                         onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="Form-field">
                <label className="Form-label">
                  Durability:
                  <input name="durability" type="range" min="0" max="100" data-group="attributes"
                         value={this.state.formData.attributes.durability}
                         onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="Form-field">
                <label className="Form-label">
                  Power:
                  <input name="power" type="range" min="0" max="100" data-group="attributes"
                         value={this.state.formData.attributes.power}
                         onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="Form-field">
                <label className="Form-label">
                  Combat:
                  <input name="combat" type="range" min="0" max="100" data-group="attributes"
                         value={this.state.formData.attributes.combat}
                         onChange={this.handleInputChange}/>
                </label>
              </div>
            </div>
            <br/>
            <div className="Form-field">
              <label className="Form-label">
                Powers:
                <textarea required name="powers" data-data-type="array"
                          value={this.state.formData.powers.join(', ')}
                          onChange={this.handleInputChange}/>
              </label>
              <div className="Form-fieldInfo">separate with comma</div>
            </div>
            <div className="Form-field">
              <label className="Form-label">
                Weaknesses:
                <textarea required name="weaknesses" data-data-type="array"
                          value={this.state.formData.weaknesses.join(', ')}
                          onChange={this.handleInputChange}/>
              </label>
              <div className="Form-fieldInfo">separate with comma</div>
            </div>
            <input type="submit" className="Form-submit" value="Submit"/>
          </form>
        ) : (
          <div>
            <div className="Form-success">Your Hero have been created!</div>
            <Hero {...this.state.formData}/>
          </div>
        )
    );
  }
}

export default NewHero;
