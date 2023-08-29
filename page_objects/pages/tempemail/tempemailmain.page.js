const BasePage = require("../base.page");
const {
  TempEmailMainComponent,
  InboxComponent,
  EmailMessageComponent,
} = require("../../components");

class TempEmailMainPage extends BasePage {
  constructor() {
    super("https://www.guerrillamail.com/ru/");
    this.main = new TempEmailMainComponent();
    this.inbox = new InboxComponent();
    this.emailmessage = new EmailMessageComponent();
  }
}

module.exports = TempEmailMainPage;
