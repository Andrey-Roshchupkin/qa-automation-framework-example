const BaseComponent = require("../../base.component");

class TempEmailMainComponent extends BaseComponent {
  constructor() {
    super("#guerrilla_mail");
  }
  get emailAdressInput() {
    return this.rootEl.$("#email-widget");
  }
}

module.exports = TempEmailMainComponent;
