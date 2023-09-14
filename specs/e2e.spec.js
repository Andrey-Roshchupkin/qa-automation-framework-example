const testData = require("../test_data/data-layer");
const { page } = require("../page_objects");

describe("Hurt Me Plenty", () => {
  it("Google cloud calculator works correctly", async () => {
    // 1. Open https://cloud.google.com/
    await page("googlecloudindex").open();
    expect(browser).toHaveTitle("Cloud Computing Services | Google Cloud");
    // 2. By clicking the search button on the portal at the top of the page, enter in the search field "Google Cloud Platform Pricing Calculator"
    // 3. Start the search by clicking the search button.
    await page("googlecloudindex").search(testData.searchValue);
    expect(browser).toHaveTitleContaining(testData.searchValue);
    // 4. In the search results, click "Google Cloud Platform Pricing Calculator" and go to the calculator page.

    await page("googlecloudsearch").goToSearchResultPage(testData.searchResult);
    expect(browser).toHaveTitle(testData.searchResult);
    // 5. Activate the COMPUTE ENGINE section at the top of the page
    await page("googlecloudcalculator").switchToInnerFrame();

    await page("googlecloudcalculator").selectPaginationItem(
      testData.paginationItem
    );

    expect(
      await page("googlecloudcalculator").pagination.item(
        testData.paginationItem
      )
    ).toHaveAttribute("class", "md-tab  md-active");

    // 6. Fill in the form with the following data:
    //     * Number of instances: 4
    //     * What are these instances for ?: leave blank
    //     * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or other User Provided OS
    //     * VM Class: Regular
    //     * Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
    //     * Select Add GPUs
    //         * GPU type: NVIDIA Tesla P100
    //         * Number of GPUs: 1
    //     * Local SSD: 2x375 Gb
    //     * Datacenter location: Frankfurt (europe-west3)
    //     * Commited usage: 1 Year
    // 7. Click Add to Estimate
    await page("googlecloudcalculator").fillCalculatorDataAndAddToEstimate(
      testData
    );
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
        "datacenterlocation"
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
      page("googlecloudcalculator").resultblock.totalEstimatedMonthlyCost
    ).toHaveTextContaining(testData.resultvalues.totalEstimatedMonthlyCost);
  });
});
