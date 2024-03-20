export default class Todo {
  constructor() {
    this.list = []
  }
  setList(list) {
    this.list = list
  }
  addTodo(todo) {
    if (!todo) {
      alert('请输入内容')
      return false
    }
    this.list.push(todo)
    return this.list
  }
  delTodo(idx) {
    this.list.splice(idx, 1)
    return this.list
  }
}