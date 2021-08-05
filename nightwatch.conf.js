module.exports = {

  src_folders: ['e2e/tests'],
  output_folder: 'e2e/build/reports',
  custom_commands_path: [
    'e2e/customCommands',
  ],
  custom_assertions_path: [
    'e2e/customAssertions',
  ],
  page_objects_path: 'e2e/pageObjects',

  test_settings: {
    default: {
      globals: {
        url: 'http://automationpractice.com/index.php',
        email: 'jonh@example.com',
      },
      screenshots: {
        enabled: true,
        path: 'e2e/build/screenshots',
        on_failure: true,
        on_error: true,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        acceptSslCerts: true,
        chromeOptions: {  // remove the 'headless' argument to see the browser while running the test
          args: ['headless','no-sandbox', 'window-size=1280,800', 'disable-features=CookiesWithoutSameSiteMustBeSecure,SameSiteByDefaultCookies'],
          w3c: false,
        },
      },
      webdriver: {
        start_process: true,
        server_path: 'node_modules/.bin/chromedriver',
        log_path: false,
        port: 9515,
      },
    },
  },
}
