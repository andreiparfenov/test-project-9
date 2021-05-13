class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = data.currentUserId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._cardSelector = cardSelector;
  }

  _updateLikesView() {
    this._element.querySelector('.card__like-count').textContent = this._likes.length;

    if (this.isLiked()) this._element.querySelector('.card__like-button')
      .classList.add('card__like-button_is-active');
    else this._element.querySelector('.card__like-button')
      .classList.remove('card__like-button_is-active');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button')
      .addEventListener('click', () => this._handleLikeClick(this));

    this._element.querySelector('.card__delete-button')
      .addEventListener('click', () => this._handleDeleteIconClick(this));

    this._element.querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick({
        name: this._text,
        src: this._link
      }));
  }

  removeCard() {
    this._element.remove();

    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    this._updateLikesView();
    this._setEventListeners();

    this._element.querySelector('.card__delete-button')
      .classList.add(this._userId === this._ownerId ? 'card__delete-button_visible' : 'card__delete-button_hidden');
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._text;

    return this._element;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  id() {
    return this._cardId;
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._updateLikesView();
  }
}

export default Card;
