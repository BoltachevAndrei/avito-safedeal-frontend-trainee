import React, { Component } from 'react';
import Api from '../../api.js';
import PicturesList from '../pictures-list/pictures-list';

export default class Pictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    const api = new Api();
    api.getImages()
      .then((images) => this.setState({images: images}));
  }

  render() {
    return (
      <div className="pictures">
        <PicturesList images={this.state.images}/>
      </div>
    );
  }
};
