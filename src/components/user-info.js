class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(`.${userNameSelector}`);
    this._userDescriptionElement = document.querySelector(`.${userDescriptionSelector}`);
    this._userAvatarElement = document.querySelector(`.${userAvatarSelector}`);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
      userAvatar: this._userAvatarElement.style.backgroundImage.slice(5, -2)
    }
  }

  setUserInfo({ userName, userDescription, userAvatar }) {
    if (userName) this._userNameElement.textContent = userName;
    if (userDescription) this._userDescriptionElement.textContent = userDescription;
    if (userAvatar) this._userAvatarElement.style.backgroundImage = `url(${userAvatar})`;
    // Проверяем инфу с сервера. Братухи, сеструхи и небинарные персоны, у нас тут больше нету моков.
  }
}

export default UserInfo;
