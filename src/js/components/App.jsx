import React, {Component} from 'react';
import {getHero, getHeroes} from '../../js/model';
import NewHero from './NewHero.jsx';
import HeroMerger from './HeroMerger.jsx';
import Hero from './Hero.jsx';
import '../../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      pageContent: null
    };
    this.handleNewHeroClick = this.handleNewHeroClick.bind(this);
    this.handleHeroClick = this.handleHeroClick.bind(this);
    this.loadHeroes = this.loadHeroes.bind(this);
    this.getHeroesData = this.getHeroesData.bind(this);
    this.handleHeroesMergeClick = this.handleHeroesMergeClick.bind(this);
  }

  componentDidMount() {
    this.loadHeroes();
  }

  loadHeroes() {
    getHeroes().then((json) => {
      this.setState({heroes: json})
    });
  }

  getHeroesData() {
    return this.state.heroes;
  }

  handleNewHeroClick() {
    this.setState(() => ({
      pageContent: 'newHeroForm',
      hero: null
    }));
  }

  handleHeroesMergeClick() {
    this.setState(() => ({
      pageContent: 'HeroesMergerForm',
      hero: null
    }));
  }

  handleHeroClick(event) {
    const target = event.target;

    getHero(target.dataset.id).then((json) => {
      this.setState(() => ({
        pageContent: 'hero',
        heroInfo: json
      }));
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Our Super Heroes!</h2>
          <div className="App-heroes">
            {this.state.heroes.map((hero) => {
              return (
                <a href="#" key={hero.id} data-id={hero.id} onClick={this.handleHeroClick}>{hero.hero_name}, </a>);
            })}
          </div>
          <div>
            <span className="App-headerButton" onClick={this.handleNewHeroClick}>Make New Hero</span>
            <span className="App-headerButton" onClick={this.handleHeroesMergeClick}>Merge Heroes</span>
          </div>
        </div>
        <div className="App-content">
          {this.state.pageContent === 'newHeroForm' ?
            <NewHero updateHandle={this.loadHeroes}/>
            : (this.state.pageContent === 'HeroesMergerForm' ?
                <HeroMerger getHeroesData={this.getHeroesData} updateHandle={this.loadHeroes}/>
                : (this.state.pageContent === 'hero' ?
                  <Hero {...this.state.heroInfo} />
                  : '')
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
