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
}
module.exports = GoogleCloudCalculatorPage;
