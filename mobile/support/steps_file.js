module.exports = function() {
  return actor({
    seeThatPopHaveText(text) {
      this.waitForElement('#android:id/message', 10)
      this.see(text, '#android:id/message')
    },

    resetStudent(student) {
      this.sendPostRequest('/students', student)
      this.seeResponseCodeIsSuccessful()
    },

    /**
     * @param {*} data 
     * @returns {Promise<string>}
     */
    async createEnroll(data) {
      const response = await this.sendPostRequest('/enrollments', {
        email: data.student.email,
        plan_id: data.plan.id,
        price: data.plan.price
      })
      this.seeResponseCodeIsSuccessful()

      return response.data.enrollment_code
    }
  });
}
