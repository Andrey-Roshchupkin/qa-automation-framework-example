const testData = require("../test_data/data-layer");
const { page } = require("../page_objects");

describe("Hurt Me Plenty", () => {
  it("Google cloud calculator works correctly", async () => {
    // 1. Open https://cloud.google.com/
    await page("googlecloudindex").open();
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
    await expect(browser).toHaveTitleContaining(testData.searchValue);

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
    // 8. Check the correspondence of the data of the following fields: VM Class, Instance type, Region, local SSD, commitment term
    await expect(
      page("googlecloudcalculator").resultblock.rootEl
    ).toBeDisplayed();
    // VM Class
    await expect(
      page("googlecloudcalculator").resultblock.getResultField("provisionmodel")
    ).toHaveTextContaining(testData.resultvalues.provisionModel);
    // Instance type
    await expect(
      page("googlecloudcalculator").resultblock.getResultField("machinetype")
    ).toHaveTextContaining(testData.resultvalues.machineType);
    //Region
    await expect(
      page("googlecloudcalculator").resultblock.getResultField(
        "atacenterlocation"
      )
    ).toHaveTextContaining(testData.resultvalues.datacenterLocation);
    //local SSD
    await expect(
      page("googlecloudcalculator").resultblock.getResultField("localssd")
    ).toHaveTextContaining(testData.resultvalues.localSSD);
    //commitment term
    await expect(
      page("googlecloudcalculator").resultblock.getResultField("commitedusage")
    ).toHaveTextContaining(testData.resultvalues.commitedUsage);
    // 9. Check that the rental amount per month matches the amount received when passing the test manually.
    await expect(
      page("googlecloudcalculator").resultblock.getResultField(
        "totalestimatedmonthlycost"
      )
    ).toHaveTextContaining(testData.resultvalues.totalEstimatedMonthlyCost);
  });
});
