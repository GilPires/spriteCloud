module.exports = {
    elements: {
      addedToCartWindow: {
        selector: '//div[@class="clearfix"]',
        locateStrategy: 'xpath',
      },
      continueShoopingButton: {
        selector: '//span[@title="Continue shopping"]',
        locateStrategy: 'xpath',
      },
      proceedToCheckoutButton: {
        selector: '//a[@title="Proceed to checkout"]',
        locateStrategy: 'xpath',
      },
      quantityWantedInput: {
        selector: '//input[@id="quantity_wanted"]',
        locateStrategy: 'xpath',
      },
      plusQuantityButton: {
        selector: '//a[@class="btn btn-default button-plus product_quantity_up"]',
        locateStrategy: 'xpath',
      },
      addToCartButton: {
        selector: '//p[@id="add_to_cart"]',
        locateStrategy: 'xpath',
      }, 
      createAccountInput: {
        selector: '//input[@id="email_create"]',
        locateStrategy: 'xpath',
      },
      createAccountButton: {
        selector: '//button[@id="SubmitCreate"]',
        locateStrategy: 'xpath',
      },
      invalidEmaillAlert : {
        selector: '//li[contains(text(), "Invalid email address.")]',
        locateStrategy: 'xpath',
      },
      personalInformationTitle : {
        selector: '//h3[contains(text(), "Your personal information")]',
        locateStrategy: 'xpath',
      },
    },
  };