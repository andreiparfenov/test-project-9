export const renderLoading = (isLoading = false) => {
  const currentActiveButton = document.querySelector('.popup_is-opened .popup__button');
  if (isLoading) {
    currentActiveButton.textContent = 'Загрузка...';
    return;
  }

  currentActiveButton.textContent = 'Сохранить';
};
