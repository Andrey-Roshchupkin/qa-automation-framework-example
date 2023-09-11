const BasePage = require("../base.page");
const { SearchResultsComponent, HeaderComponent } = require("../../components");

class GoogleCloudSearchPage extends BasePage {
  constructor() {
    super("");
    this.header = new HeaderComponent("devsite-header");
    this.searchResults = new SearchResultsComponent();
  }
  async goToSearchResultPage(searchResult) {
    // 4. In the search results, click on search result link and go to its page.
    await expect(this.searchResults.rootEl).toBeDisplayed();
    await this.searchResults.searchResultLink(searchResult).click();
  }
}
module.exports = GoogleCloudSearchPage;
