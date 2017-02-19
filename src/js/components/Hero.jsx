import React, {Component} from 'react';
import '../../css/Hero.css';
import HeroGiphy from './HeroGiphy.jsx'

export default class Hero extends Component {
  render() {
    return (
      <div className="Hero">
        <HeroGiphy keyword={this.props.hero_name}/>
        <div className="Hero-info"><strong>Hero Name: </strong>{this.props.hero_name}</div>
        <div className="Hero-info"><strong>Real Name: </strong>{this.props.real_name}</div>
        <div className="Hero-info"><strong>Gender: </strong>{this.props.gender}</div>
        <div className="Hero-info"><strong>intelligence: </strong>{this.props.attributes.intelligence}</div>
        <div className="Hero-info"><strong>strength: </strong>{this.props.attributes.strength}</div>
        <div className="Hero-info"><strong>speed: </strong>{this.props.attributes.speed}</div>
        <div className="Hero-info"><strong>durability: </strong>{this.props.attributes.durability}</div>
        <div className="Hero-info"><strong>power: </strong>{this.props.attributes.power}</div>
        <div className="Hero-info"><strong>combat: </strong>{this.props.attributes.combat}</div>
        <div className="Hero-info"><strong>powers: </strong>{this.props.powers.join(', ')}</div>
        <div className="Hero-info"><strong>weaknesses: </strong>{this.props.weaknesses.join(', ')}</div>
      </div>
    );
  }
}
