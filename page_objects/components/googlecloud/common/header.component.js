const BaseComponent = require("../../base.component");

class HeaderComponent extends BaseComponent {
  constructor(selector = "header") {
    super(selector);
  }

  get searchInput() {
    return this.rootEl.$("input[aria-label='Search']");
  }
}

module.exports = HeaderComponent;
