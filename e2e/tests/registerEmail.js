
module.exports = {
  
    'Test register email': (browser) => {
      const {url, email} = browser.globals;
      const page = browser.page.page();
      // test register scenario
      browser
        .url(url.concat('?controller=order&step=1'));
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