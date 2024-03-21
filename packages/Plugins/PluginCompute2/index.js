export default class HandleComputed {
  constructor() {
    this.count = null
  }
  setCount(count) {
    this.count = count
  }
  handleAdd() {
    return this.count + 2
  }
  handleMinus() {
    return this.count - 2
  }
}