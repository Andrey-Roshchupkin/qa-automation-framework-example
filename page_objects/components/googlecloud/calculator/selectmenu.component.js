const BaseComponent = require("../../base.component");

class SelectMenuComponent extends BaseComponent {
  constructor() {
    super("");
  }
  // `//div[contains(@class, 'md-clickable')]//div[normalize-space(text())='${name}']` / `//body/div//div[normalize-space(text())='${name}']`
  async selectOption(name) {
    return await browser
      .$(
        `//div[contains(@class, 'md-clickable')]//div[normalize-space(text())='${name}']`
      )
      .click();
  }
}

module.exports = SelectMenuComponent;
