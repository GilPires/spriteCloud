
module.exports = {
  
  'Test main page': (browser) => {
    const {url, email} = browser.globals;
    const page = browser.page.mainPage();
    browser
      .url(url)
      .assert.urlEquals(url);

    for(var i =1; i<=7;i++){
      
      const productImage = {
        selector: `//*[@id="homefeatured"]/li[${i}]/div`,
        locateStrategy: 'xpath',
      };
      const addToCartButton = {
        selector: `//a[@title="Add to cart" and @data-id-product="${i}"]`,
        locateStrategy: 'xpath',
      };
      // add items to cart
      if (i<7){
        browser
          .moveToElement(productImage,0,0)
          .waitForElementVisible(addToCartButton)
          .click(addToCartButton);
        page
          .waitForElementVisible('@addedToCartWindow')
          .assert.visible('@continueShoopingButton')
          .click('@continueShoopingButton')
          .assert.not.visible('@addedToCartWindow');
      }
      //test the other way to add items to the card 
      else{
        browser
          .moveToElement(productImage,0,0)
          .click(productImage)
          .assert.urlEquals(url.concat('?id_product=7&controller=product'))
        page 
          .waitForElementVisible('@quantityWantedInput')
          .clearValueCustom('@quantityWantedInput')
          .setValue('@quantityWantedInput', 2)
          .assert.attributeContains('@quantityWantedInput', 'value', 2)
          .assert.visible('@plusQuantityButton')
          .click('@plusQuantityButton')
          .assert.attributeContains('@quantityWantedInput', 'value', 3)
          .assert.visible('@addToCartButton')
          .click('@addToCartButton')
          .waitForElementVisible('@addedToCartWindow')
          .assert.visible('@proceedToCheckoutButton')
          .click('@proceedToCheckoutButton')
      }
    }
    browser 
      .assert.urlEquals(url.concat('?controller=order'));
    
    for(var i =7; i>=1;i--){
      const cartItem = {
        selector: `(//tr[contains(@id, 'product_')])[${i}]`,
        locateStrategy: 'xpath',
      };
      const minusQuantityButton=  {
        selector: cartItem.selector +'//a[@class="cart_quantity_down btn btn-default button-minus"]',
        locateStrategy: 'xpath',
      };
      const quantityOfItemInCart= {
        selector: cartItem.selector +'//td[@class="cart_quantity text-center"]//input[@type="text"]',
        locateStrategy: 'xpath',
      };
      const deleteItemButton = {
        selector: cartItem.selector +'//i[@class="icon-trash"]',
        locateStrategy: 'xpath',
      };
       //assert items were added to the cart 
       browser
         .assert.visible(cartItem)  

        // test delete from cart functionality 
        if(i==7){
          browser
            .assert.attributeContains(quantityOfItemInCart, 'value', 3)
            .assert.visible(deleteItemButton)
            .click(deleteItemButton)
            .assert.not.elementPresent(cartItem)
        }
        // test other way of deleting from cart 
        else if(i==6){
          browser
            .assert.attributeContains(quantityOfItemInCart, 'value', 1)
            .assert.visible(minusQuantityButton)
            .click(minusQuantityButton)
            .assert.not.elementPresent(cartItem)
        }
        else{
          browser
            .assert.attributeContains(quantityOfItemInCart, 'value', 1)
        }
    }
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
