/// <reference types='codeceptjs' />
type steps_file = typeof import('./support/steps_file.js');
type loginScreen = typeof import('./support/screens/login.js');
type questionScreen = typeof import('./support/screens/question.js');
type accountScreen = typeof import('./support/screens/account.js');

declare namespace CodeceptJS {
  interface SupportObject { 
    I: I, 
    current: any, 
    loginScreen: loginScreen, 
    questionScreen: questionScreen,
    accountScreen: accountScreen
  }
  interface Methods extends Appium { }
  interface I extends ReturnType<steps_file> { }
  namespace Translation {
    interface Actions { }
  }
}
