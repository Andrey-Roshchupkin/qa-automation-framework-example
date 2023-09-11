const BaseComponent = require("../../base.component");

class ResultBlockComponent extends BaseComponent {
  constructor() {
    super("#resultBlock");
  }

  async getResultField(name) {
    const elements = {
      provisionmodel: "Provisioning model:",
      machinetype: "Instance type:",
      datacenterlocation: "Region:",
      localssd: "Local SSD:",
      commitedusage: "Commitment term:",
    };
    return await this.rootEl.$(
      `//div[contains(text(), "${elements[name.toLowerCase()]}")]`
    );
  }

  get totalEstimatedMonthlyCost() {
    return this.rootEl.$("div.cpc-cart-total b");
  }

  get emailEstimateButton() {
    return this.rootEl.$('button[id="Email Estimate"]');
  }
}

module.exports = ResultBlockComponent;
