const BasePage = require("../base.page");
const { HeaderComponent } = require("../../components");

class GoogleCloudIndexPage extends BasePage {
  constructor() {
    super("https://cloud.google.com/");
    this.header = new HeaderComponent();
  }
}
module.exports = GoogleCloudIndexPage;
