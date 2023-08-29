const BaseComponent = require("../../base.component");

class EmailFormComponent extends BaseComponent {
  constructor() {
    super("form[name=emailForm]");
  }

  item(name) {
    const selectors = {
      email: "input[type=email]",
    };
    return this.rootEl.$(selectors[name.toLowerCase()]);
  }

  get sendEmailButton() {
    return this.rootEl.$("//md-dialog-actions/button[2]");
  }
}

module.exports = EmailFormComponent;
