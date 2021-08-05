
module.exports = {
  
    'Test register email': (browser) => {
      const {url, email} = browser.globals;
      const page = browser.page.page();
      // test register scenario
      browser
        .url(url);
      page
        .waitForElementVisible('@loginPageButton')
        .click('@loginPageButton')
        .assert.urlContains(url.concat('?controller=authentication'));
      // test invalid email
      page
        .assert.visible("@createAccountInput")
        .setValue('@createAccountInput', 'Jonh')
        .assert.visible("@createAccountButton")
        .click("@createAccountButton")
        .assert.visible('@invalidEmaillAlert')
      //test valid email
      .assert.visible("@createAccountInput")
      .setValue('@createAccountInput', email)
      .assert.visible("@createAccountButton")
      .click("@createAccountButton")
      .assert.visible('@personalInformationTitle')
      browser.end();
    },
  };