const testData = require("../test_data/data-layer");
const { page } = require("../page_objects");

describe("Hardcore", () => {
  it("Google cloud calculator works correctly", async () => {
    // 1. Open https://cloud.google.com/
    await page("googlecloudindex").open("googleCloud");
    await expect(browser).toHaveTitle(
      "Cloud Computing Services | Google Cloud"
    );
    // 2. By clicking the search button on the portal at the top of the page, enter in the search field "Google Cloud Platform Pricing Calculator"
    await expect(page("googlecloudindex").header.rootEl).toBeDisplayed();
    await page("googlecloudindex").header.searchInput.click();
    await page("googlecloudindex").header.searchInput.setValue(
      testData.searchValue
    );
    // 3. Start the search by clicking the search button.
    await browser.keys("Enter");
    await expect(browser).toHaveTitle(/Результаты поиска по запросу/);

    // 4. In the search results, click "Google Cloud Platform Pricing Calculator" and go to the calculator page.
    await expect(
      page("googlecloudsearch").searchResults.rootEl
    ).toBeDisplayed();
    await page("googlecloudsearch")
      .searchResults.searchResultLink(testData.searchResult)
      .click();
    await expect(browser).toHaveTitle("Google Cloud Pricing Calculator");
    // 5. Activate the COMPUTE ENGINE section at the top of the page
    await page("googlecloudcalculator").switchToInnerFrame();

    await expect(
      page("googlecloudcalculator").pagination.rootEl
    ).toBeDisplayed();
    await page("googlecloudcalculator")
      .pagination.item("computeengine")
      .click();
    await expect(
      page("googlecloudcalculator")
        .pagination.item("computeengine")
        .toHaveAttribute("class", "md-tab  md-active")
    );
    // 6. Fill in the form with the following data:
    //     * Number of instances: 4
    await page("googlecloudcalculator")
      .computeengine.input("numberofinstances")
      .setValue(testData.numberOfInstances);
    //     * What are these instances for ?: leave blank

    await page("googlecloudcalculator")
      .computeengine.input("whatareinstancesfor")
      .setValue(testData.whatAreInstancesFor);
    //     * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or other User Provided OS
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "operatingsystem"
    );

    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.operatingSystem
    );
    //     * VM Class: Regular
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "provisionmodel"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.provisionModel
    );
    //     * Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "series"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.series
    );

    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "machinetype"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.machineType
    );
    //     * Select Add GPUs
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "addgpus"
    );
    //         * GPU type: NVIDIA Tesla P100
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "gputype"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.gpuType
    );
    //         * Number of GPUs: 1
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "numberofgpus"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.numberOfGPUs
    );
    //     * Local SSD: 2x375 Gb
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "localssd"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.localSSD
    );
    //     * Datacenter location: Frankfurt (europe-west3)
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "datacenterlocation"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.datacenterLocation
    );
    //     * Commited usage: 1 Year
    await page("googlecloudcalculator").computeengine.chooseSelectMenu(
      "commitedusage"
    );
    await page("googlecloudcalculator").selectmenu.selectOption(
      testData.commitedUsage
    );

    // 7. Click Add to Estimate
    await page(
      "googlecloudcalculator"
    ).computeengine.addToEstimateButton.click();

    let googleEstimatePriceTextRaw = await page("googlecloudcalculator")
      .resultblock.getResultField("totalestimatedmonthlycost")
      .getText();

    googleEstimatePriceText =
      googleEstimatePriceTextRaw.match(/(USD [\d,\.]+)/i)[0];
    // 8. Select EMAIL ESTIMATE
    await page("googlecloudcalculator").resultblock.emailEstimateButton.click();

    // 9. In a new tab, open a service for generating temporary emails
    await page("tempemailmain").open("tempEmail");
    await expect(browser).toHaveTitle(
      "Guerrilla Mail - Disposable Temporary E-Mail Address"
    );

    // 10. Copy the mailing address generated in 10minutemail
    const emailAdress = await page(
      "TempEmailMain"
    ).main.emailAdressInput.getText();
    // 11. Return to the calculator, in the Email field enter the address from the previous paragraph
    await browser.switchWindow("Google Cloud Pricing Calculator");
    await page("googlecloudcalculator").switchToInnerFrame();
    await page("googlecloudcalculator")
      .emailform.item("email")
      .setValue(emailAdress);
    // 12. Press SEND EMAIL
    await page("googlecloudcalculator").emailform.sendEmailButton.click();
    // 13. Wait for the letter with the cost calculation and check that the Total Estimated Monthly Cost in the letter matches what is displayed in the calculator
    await browser.switchWindow(
      "Guerrilla Mail - Disposable Temporary E-Mail Address"
    );

    await expect(page("TempEmailMain").inbox.emailMessageLink).toBeExisting({
      wait: 30000,
      interval: 1000,
    });

    await page("TempEmailMain").inbox.emailMessageLink.click();

    await expect(page("TempEmailMain").emailmessage.priceFromEmail).toHaveText(
      googleEstimatePriceText
    );
  });
});
