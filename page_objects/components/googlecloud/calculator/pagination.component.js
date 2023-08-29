const BaseComponent = require("../../base.component");

class PaginationComponent extends BaseComponent {
  constructor() {
    super("md-card-content > md-tabs");
  }

  item(name) {
    const selectors = {
      computeengine: "#tab-item-1",
      gkestandart: "#tab-item-2",
    };

    return this.rootEl.$(selectors[name.toLowerCase()]);
  }
}

module.exports = PaginationComponent;
