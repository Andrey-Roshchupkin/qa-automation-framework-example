const BaseComponent = require("../../base.component");

class ResultBlockComponent extends BaseComponent {
  constructor() {
    super("//*[@id='resultBlock']");
  }

  getResultField(name) {
    const elements = {
      provisionmodel: '//*[@id="compute"]/md-list/md-list-item[4]/div[1]',
      machinetype: '//*[@id="compute"]/md-list/md-list-item[5]/div[1]',
      atacenterlocation: '//*[@id="compute"]/md-list/md-list-item[1]/div[1]',
      localssd: '//*[@id="compute"]/md-list/md-list-item[8]/div[1]',
      commitedusage: '//*[@id="compute"]/md-list/md-list-item[3]/div[1]',
      totalestimatedmonthlycost:
        '//*[@id="resultBlock"]/md-card/md-card-content/div/div/div/div[1]/h2/b',
    };
    return this.rootEl.$(elements[name.toLowerCase()]);
  }

  get emailEstimateButton() {
    return this.rootEl.$('button[id="Email Estimate"]');
  }
}

module.exports = ResultBlockComponent;
