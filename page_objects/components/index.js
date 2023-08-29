// Google Cloud components
const HeaderComponent = require("./googlecloud/common/header.component");
const SearchResultsComponent = require("./googlecloud/search/searchresults.component");
const PaginationComponent = require("./googlecloud/calculator/pagination.component");
const ComputeEngineComponent = require("./googlecloud/calculator/computeengine.component");
const SelectMenuComponent = require("./googlecloud/calculator/selectmenu.component");
const ResultBlockComponent = require("./googlecloud/calculator/resultblock.component");
const EmailFormComponent = require("./googlecloud/calculator/emailform.component");

//Temporary Email components
const TempEmailMainComponent = require("./termpemail/common/tempemailmain.component");
const InboxComponent = require("./termpemail/common/inbox.component");
const EmailMessageComponent = require("./termpemail/common/emailmessage.component");

module.exports = {
  HeaderComponent,
  PaginationComponent,
  SearchResultsComponent,
  ComputeEngineComponent,
  SelectMenuComponent,
  ResultBlockComponent,
  EmailFormComponent,
  TempEmailMainComponent,
  InboxComponent,
  EmailMessageComponent,
};
