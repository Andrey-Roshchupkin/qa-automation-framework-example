const GoogleCloudIndexPage = require("./googlecloud/googlecloudindex.page");
const GoogleCloudSearchPage = require("./googlecloud/googlecloudsearch.page");
const GoogleCloudCalculatorPage = require("./googlecloud/googlecloudcalculator.page");

const TempEmailMainPage = require("./tempemail/tempemailmain.page");
/**
 * @param name {"googlecloudindex"|"googlecloudsearch"|"googlecloudcalculator"|"tempemailmain"}
 * @returns {GoogleCloudIndexPage|GoogleCloudSearchPage|GoogleCloudCalculatorPage|TempEmailMainPage}
 */

function page(name) {
  const items = {
    googlecloudindex: new GoogleCloudIndexPage(),
    googlecloudsearch: new GoogleCloudSearchPage(),
    googlecloudcalculator: new GoogleCloudCalculatorPage(),
    tempemailmain: new TempEmailMainPage(),
  };
  return items[name.toLowerCase()];
}

module.exports = {
  GoogleCloudIndexPage,
  GoogleCloudSearchPage,
  GoogleCloudCalculatorPage,
  TempEmailMainPage,
  page,
};
