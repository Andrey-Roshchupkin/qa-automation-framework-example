const BaseComponent = require("../../base.component");

class SelectMenuComponent extends BaseComponent {
  constructor() {
    super("");
  }

  async selectOption(name) {
    return await browser
      .$(
        `//body/div/md-select-menu//md-option//div[normalize-space(text())='${name}']`
      )
      .click();
  }
}

module.exports = SelectMenuComponent;
