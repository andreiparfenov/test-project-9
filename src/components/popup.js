import { ESC_KEYCODE } from '../utils/constants.js';

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);

    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    evt.preventDefault();

    if (evt.which === ESC_KEYCODE) {
      this.close();
    }
  }


  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add('popup_is-opened');
    document.addEventListener('keyup', this._handleEscUp);
  }

  close() {
    this._popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._handleEscUp);
  }

}

export default Popup;
