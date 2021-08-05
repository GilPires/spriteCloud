# spriteCloud
# a. How to run the tests locally
- Make sure you  Python3 and pytest are installed.
- Make sure you  node.js and npm are installed.
- Make sure you have chrome latest version installed
- Install python requirements:

    $ pip install requirements.txt 

- Install other dependencies:

    $ npm install

- Run pytest api tests with:

    $ pytest

- Run nightwatch e2e tests with:
   
    $ npm test

-Important know:
    
    Sometimes the latest release of chrome and chromedriver are diffent so make sure these are the same of the test might fail
    
    Go to the file nightwatch.conf.js and in the 'chromeOptions', 'args' array remove 'headless' to see the browser while running the e2e tests

# b. How to run the test in a CI/CD pipeline

I choose Travis CI as my CI platform.
Travis will test every PR made to this repository.
All you need to do is go to the following link to see the results:

https://travis-ci.com/github/GilPires/spriteCloud

If you wish to run the tests again all you need to do is click 'Restart build'

# c. Has a link to the results in Calliope.pro

https://app.calliope.pro/profiles/3562/reports

# d. What you used to select the scenarios, what was your approach? e. Why are they the most important

I started this project by doing some exploratory testing. I tried to look for any functionality with high level of complexity on the web and for any API call.
After that intake I try to reflect on my finding with the context of the problem (online shoping)
In the case of online shopping the most important part of the process is choosing your items, register and  pay.  
I ended up discarding the payment functionality because of the lack of API call and therefore complexity.

I decided to test:
-add item to cart
-remove items to cart
-register email

I decided to use Python and JavaScrip to show a little versatility and used e2e test since it is what I'm the most specialize in.
The approach I use in was to make the e2e tests and api test to complement eachother.
I try to focus the in the response I got from the api to test things that would be hard in the e2e and vice versa.

# f. What could be the next steps to your project

The next step besides a more exaustive tests of the previous mention scenarios. 
For exemple there is still enumerous aways i can manipulate the the json response to test things like the number of same items or the limit of these and there were also other approches i could add and remove items in the card (on the web)

But besides that the next step would be to test  the full registration and payment 
