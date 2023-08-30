const BaseComponent = require("../../base.component");

class InboxComponent extends BaseComponent {
  constructor() {
    super("#email_list");
  }

  get emailMessageLink() {
    return this.rootEl.$(
      '//td[text()="gcp-estimate@cloudpricingcalculator.appspotmail.com "]'
    );
  }
}

module.exports = InboxComponent;
