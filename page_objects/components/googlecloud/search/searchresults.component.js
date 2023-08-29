const BaseComponent = require("../../base.component");

class SearchResultsComponent extends BaseComponent {
  constructor() {
    super("div.catalog-main");
  }
  searchResultLink(searchQuery) {
    return this.rootEl.$(`b=${searchQuery}`);
  }
}

module.exports = SearchResultsComponent;
