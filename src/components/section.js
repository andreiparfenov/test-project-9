class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(`.${containerSelector}`);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

export default Section;

// Старая реализация класса. Актуальная до изменений в программе.
// class Section {
//   constructor({ items, renderer }, containerSelector) {
//     this._renderedItems = items;
//     this._renderer = renderer;
//
//     this._container = document.querySelector(`.${containerSelector}`);
//   }
//
//   renderItems() {
//     this._renderedItems.forEach(item => {
//       this._renderer(item);
//     });
//   }
//
//   addItem(element) {
//     this._container.append(element);
//   }
//
// }
//
// export default Section;
