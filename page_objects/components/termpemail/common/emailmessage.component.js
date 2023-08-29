const BaseComponent = require("../../base.component");

class EmailMessageComponent extends BaseComponent {
  constructor() {
    super(".email_body");
  }

  get priceFromEmail() {
    return this.rootEl.$(
      '//*[@id="display_email"]/div/div[2]/div/div/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/h3'
    );
  }
}

module.exports = EmailMessageComponent;
