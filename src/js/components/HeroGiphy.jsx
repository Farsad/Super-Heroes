import React, {Component} from 'react';
import {getGiphy} from '../model';

export default class HeroGiphy extends Component {
  constructor(props) {
    super(props);
    this.state = {giphyURL: ''};

  }

  setGiphy(hero_name) {
    getGiphy(hero_name).then(url => {
      this.setState({giphyURL: url});
    });
  }

  componentWillMount() {
    this.setGiphy(this.props.keyword);
  }

  componentWillReceiveProps(props) {
    this.setGiphy(props.keyword);
  }

  render() {
    return (
      <img src={this.state.giphyURL}/>
    );
  }
}