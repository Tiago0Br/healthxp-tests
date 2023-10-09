/// <reference types='codeceptjs' />
type steps_file = typeof import('./support/steps_file.js');
type loginScreen = typeof import('./support/screens/login.js');
type questionScreen = typeof import('./support/screens/question.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginScreen: loginScreen, questionScreen: questionScreen }
  interface Methods extends Appium { }
  interface I extends ReturnType<steps_file> { }
  namespace Translation {
    interface Actions { }
  }
}
