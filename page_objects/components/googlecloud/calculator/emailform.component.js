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
  // "button*=Send Email" / button.md-primary /"button[ng-click='emailQuote.emailQuote(true); emailQuote.$mdDialog.hide()']"
  get sendEmailButton() {
    return this.rootEl.$("button.md-primary");
  }
}

module.exports = EmailFormComponent;
