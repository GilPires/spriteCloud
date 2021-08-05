exports.command = function exitTour(browser) {
  const selector = {
    selector: 'div[class="shepherd-content"]',
    timeout: 3000,
    suppressNotFoundErrors: true,
  };

  browser.isVisible(selector, (result) => {
    if (result.value === true) {
      browser
        .pause(300)
        .keys(browser.Keys.ESCAPE)
        .acceptAlert();
    }
  });
};
