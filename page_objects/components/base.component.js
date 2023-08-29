class BaseComponent {
  constructor(rootselector) {
    this.rootselector = rootselector;
  }

  get rootEl() {
    return $(this.rootselector);
  }
}
module.exports = BaseComponent;
