const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);
require('dotenv').config()

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './e2e/*_test.js',
  output: './output',
  helpers: {
    Appium: {
      app: './app/hxp-beta2.apk',
      platform: 'Android',
      device: 'emulator',
      desiredCapabilities: {
        platformName: 'Android',
        deviceName: 'emulator',
        app: `./app/hxp-beta2.apk`,
        automationName: 'UIAutomator2',
        udid: 'emulator-5554'
      }
    }
  },
  plugins: {
    tesults: {
      require: 'codeceptjs-tesults',
      enabled: true,
      target: process.env.TESULTS_TOKEN
    }
  },
  include: {
    I: './support/steps_file.js',
    loginScreen: './support/screens/login.js',
    questionScreen: './support/screens/question.js',
  },
  name: 'mobile'
}