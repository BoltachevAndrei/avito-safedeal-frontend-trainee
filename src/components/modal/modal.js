import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Api from '../../api.js';
import ModalOverlay from '../modal-overlay/modal-overlay.js';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      username: ``,
      comment: ``,
      animation: `modal`,
      isUsernameValid: false,
      isCommentValid: false,
      isFormValid: false
    };
  }

  addAnimation() {
    this.setState({animation: `modal shake`});
  }

  removeAnimation() {
    this.setState({animation: `modal`});
  }

  shake() {
    this.addAnimation();
    setTimeout(() => {
      this.removeAnimation();
    }, 1000);
  }

  onInputChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({[name]: value}, () => {
      this.validateField(name, value);
    });
  }

  validateField(name, value) {
    let isUsernameValid = this.state.isUsernameValid;
    let isCommentValid = this.state.isCommentValid;
    switch (name) {
      case `username`:
        isUsernameValid = value.length > 0;
        break;
      case `comment`:
        isCommentValid = value.length > 0;
        break;
      default:
        break;
    }
    this.setState(
      {
        isUsernameValid: isUsernameValid,
        isCommentValid: isCommentValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      isFormValid: this.state.isUsernameValid && this.state.isCommentValid
    });
  }

  setDefaultStates() {
    this.setState({
      username: ``,
      comment: ``,
      animation: `modal`,
      isUsernameValid: false,
      isCommentValid: false,
      isFormValid: false
    });
  }
  
  onSubmitClick(e) {
    e.preventDefault();
    new Api().sendComment(this.props.image.id, {
      'name': this.state.username,
      'comment': this.state.comment,
      'date': new Date(),
    })
    .then(() => {
      this.props.toggleModal();
      this.setDefaultStates();
    })
    .catch(() => this.shake());
  }

  render() {
    const children = this.props.isActive ? (
      <div className={this.state.animation}>
        <div className="modal__container">
          <img className="modal__image" src={this.props.image.url} alt="" />
          <ul className="modal__comments-list">
            {this.props.image.comments.map((comment) =>
              <li className="modal__comments-item" key={comment.id}>
                <p className="modal__comments-date">{new Date(comment.date).toLocaleDateString()}</p>
                <p className="modal__comments-text">{comment.text}</p>
              </li>
            )}
          </ul>
          <form className="modal__form" action="">
            <input
              className="modal__input modal__input--name"
              name="username"
              type="text"
              placeholder="Ваше имя"
              value={this.state.username}
              onChange={this.onInputChange}
            />
            <input
              className="modal__input"
              name="comment"
              type="text"
              placeholder="Ваш комментарий"
              value={this.state.comment}
              onChange={this.onInputChange}
            />
            <button
              className={this.state.isFormValid ? "modal__submit" : "modal__submit modal__submit--disabled"}
              onClick={this.onSubmitClick}
              disabled={!this.state.isFormValid}
            >
              Оставить комментарий
            </button>
          </form>
          <button
            className="modal__close"
            type="submit"
            onClick={this.props.toggleModal}
          >
            <span className="visually-hidden">
              Закрыть
            </span>
          </button>
        </div>
        <ModalOverlay />
      </div>
    ) : null;
    return ReactDOM.createPortal(
      children,
      document.getElementById(`root-modal`)
    );
  }
}