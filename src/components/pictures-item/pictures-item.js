import React, { Component } from 'react';
import Api from '../../api.js';
import Modal from '../modal/modal.js';

export default class PicturesItem extends Component {
  constructor(props) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isActive: false
    };
  }
  
  onImageClick() {
    const api = new Api();
    api.getImage(this.props.image.id)
      .then((image) => {
        this.setState({image: image});
        this.toggleModal();
      });
  };

  toggleModal() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    return (
      <li className="pictures__item">
        <img
          onClick={this.onImageClick}
          className="pictures__image"
          src={this.props.image.url}
          alt={this.props.image.id}
        />
        <Modal
          isActive={this.state.isActive}
          image={this.state.image}
          toggleModal={this.toggleModal}
        />
      </li>
    );
  }
};