const BasePage = require("../base.page");
const { SearchResultsComponent, HeaderComponent } = require("../../components");

class GoogleCloudSearchPage extends BasePage {
  constructor() {
    super("");
    this.header = new HeaderComponent("devsite-header");
    this.searchResults = new SearchResultsComponent();
  }
}
module.exports = GoogleCloudSearchPage;
