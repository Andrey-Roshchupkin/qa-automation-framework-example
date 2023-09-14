const BasePage = require("../base.page");
const {
  HeaderComponent,
  PaginationComponent,
  ComputeEngineComponent,
  SelectMenuComponent,
  ResultBlockComponent,
  EmailFormComponent,
} = require("../../components");

class GoogleCloudCalculatorPage extends BasePage {
  constructor() {
    super("");
    this.header = new HeaderComponent("devsite-header");
    this.pagination = new PaginationComponent();
    this.computeengine = new ComputeEngineComponent();
    this.selectmenu = new SelectMenuComponent();
    this.resultblock = new ResultBlockComponent();
    this.emailform = new EmailFormComponent();
  }

  async switchToInnerFrame() {
    await browser.switchToFrame(await $("devsite-iframe > iframe"));
    await browser.switchToFrame(await $("#myFrame"));
  }
  async switchToRootFrame() {
    await browser.switchToParentFrame();
    await browser.switchToParentFrame();
  }

  async selectPaginationItem(paginationItem) {
    await expect(this.pagination.rootEl).toBeDisplayed();
    await this.pagination.item(paginationItem).click();
  }

  async fillCalculatorDataAndAddToEstimate(testData) {
    // 6. Fill in the form with the following data:
    //     * Number of instances:
    await this.computeengine
      .input("numberofinstances")
      .setValue(testData.numberOfInstances);
    //     * What are these instances for ?:

    await this.computeengine
      .input("whatareinstancesfor")
      .setValue(testData.whatAreInstancesFor);
    //     * Operating System / Software:
    await this.computeengine.chooseSelectMenu("operatingsystem");

    await this.selectmenu.selectOption(testData.operatingSystem);
    //     * VM Class:
    await this.computeengine.chooseSelectMenu("provisionmodel");
    await this.selectmenu.selectOption(testData.provisionModel);
    //     * Instance type:
    await this.computeengine.chooseSelectMenu("series");
    await this.selectmenu.selectOption(testData.series);

    await this.computeengine.chooseSelectMenu("machinetype");
    await this.selectmenu.selectOption(testData.machineType);
    //     * Select Add GPUs
    await this.computeengine.chooseSelectMenu("addgpus");
    //         * GPU type:
    await this.computeengine.chooseSelectMenu("gputype");
    await this.selectmenu.selectOption(testData.gpuType);
    //         * Number of GPUs:
    await this.computeengine.chooseSelectMenu("numberofgpus");
    await this.selectmenu.selectOption(testData.numberOfGPUs);
    //     * Local SSD:
    await this.computeengine.chooseSelectMenu("localssd");
    await this.selectmenu.selectOption(testData.localSSD);

    //     * Datacenter location:
    await this.computeengine.chooseSelectMenu("datacenterlocation");
    await this.selectmenu.selectOption(testData.datacenterLocation);
    //     * Commited usage:
    await this.computeengine.chooseSelectMenu("commitedusage");
    await this.selectmenu.selectOption(testData.commitedUsage);

    // 7. Click Add to Estimate
    await this.computeengine.addToEstimateButton.click();
  }
}

module.exports = GoogleCloudCalculatorPage;
