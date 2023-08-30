class BasePage {
  constructor(url) {
    this.url = url;
  }
  open() {
    return browser.newWindow(this.url);
  }
}

module.exports = BasePage;
