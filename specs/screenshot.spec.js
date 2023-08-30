const { page } = require("../page_objects");

describe("Screenshot example", () => {
  it("Makes screenshot on error", async () => {
    // 1. Open https://cloud.google.com/
    await page("googlecloudindex").open("googleCloud");
    await expect(browser).toHaveTitle(
      "Cloud Computing Services | Google Screenshot"
    );
  });
});
