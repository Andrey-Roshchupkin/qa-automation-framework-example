const BaseComponent = require("../../base.component");

class EmailMessageComponent extends BaseComponent {
  constructor() {
    super(".email_body");
  }

  get priceFromEmail() {
    return this.rootEl.$("h2*=Estimated Monthly Cost: USD");
  }
}

module.exports = EmailMessageComponent;
