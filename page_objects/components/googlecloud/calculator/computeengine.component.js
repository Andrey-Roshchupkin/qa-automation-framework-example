const BaseComponent = require("../../base.component");

class ComputeEngineComponent extends BaseComponent {
  constructor() {
    super("div.compute-engine-block");
  }

  input(name) {
    const elements = {
      numberofinstances:
        '//input[@ng-model="listingCtrl.computeServer.quantity"]',
      whatareinstancesfor:
        '//input[@ng-model="listingCtrl.computeServer.label"]',
    };
    return this.rootEl.$(elements[name.toLowerCase()]);
  }

  async chooseSelectMenu(name) {
    const elements = {
      operatingsystem: "Operating System / Software",
      provisionmodel: "VM Class",
      series: "Series",
      machinetype: "Instance type",
      addgpus: "Add GPUs",
      gputype: "GPU type",
      numberofgpus: "Number of GPUs",
      localssd: "Local SSD",
      datacenterlocation: "Datacenter location",
      commitedusage: "ted usage",
    };
    return await this.rootEl
      .$(`[aria-label*="${elements[name.toLowerCase()]}"]`)
      .click();
  }

  get addToEstimateButton() {
    return this.rootEl.$("button=Add to Estimate");
  }
}

module.exports = ComputeEngineComponent;
