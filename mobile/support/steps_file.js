module.exports = function() {
  return actor({
    seeThatPopHaveText(text) {
      this.waitForElement('#android:id/message', 10)
      this.see(text, '#android:id/message')
    }
  });
}
