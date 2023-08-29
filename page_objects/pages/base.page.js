class BasePage {
  constructor(url) {
    this.url = url;
  }
  open() {
    browser.newWindow(this.url);
    browser.maximizeWindow();
  }
}

module.exports = BasePage;
