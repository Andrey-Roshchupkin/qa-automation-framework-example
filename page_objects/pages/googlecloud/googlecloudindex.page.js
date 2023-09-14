const BasePage = require("../base.page");
const { HeaderComponent } = require("../../components");

class GoogleCloudIndexPage extends BasePage {
  constructor() {
    super("https://cloud.google.com/");
    this.header = new HeaderComponent();
  }
  async search(searchValue) {
    // 2. By clicking the search button on the portal at the top of the page, enter in the search field search value
    await expect(this.header.rootEl).toBeDisplayed();
    await this.header.searchInput.click();
    await this.header.searchInput.setValue(searchValue);
    // 3. Start the search by clicking the search button.
    await browser.keys("Enter");
  }
}
module.exports = GoogleCloudIndexPage;
