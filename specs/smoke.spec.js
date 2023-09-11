const testData = require("../test_data/data-layer");
const { page } = require("../page_objects");
const { getPriceFromEl } = require("../utils");

describe("Hardcore", () => {
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

    const googleEstimatePriceText = await getPriceFromEl(
      await page("googlecloudcalculator").resultblock.totalEstimatedMonthlyCost
    );

    // 8. Select EMAIL ESTIMATE
    await page("googlecloudcalculator").resultblock.emailEstimateButton.click();

    // 9. In a new tab, open a service for generating temporary emails
    await page("tempemailmain").open("tempEmail");
    expect(browser).toHaveTitle(
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
    await browser.scroll(0, 200);
    await page("TempEmailMain").inbox.emailMessageLink.click();
    await browser.scroll(0, 400);
    const priceFromEmailText = await getPriceFromEl(
      await page("TempEmailMain").emailmessage.priceFromEmail
    );
    expect(priceFromEmailText).toEqual(googleEstimatePriceText);
  });
});
