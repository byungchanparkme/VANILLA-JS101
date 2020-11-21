class Storage {
  constructor(name) {
    this._dbName = name
    if (!localStorage.getItem(name)) {
      const data = {
        todos: [],
      }
      localStorage.setItem(this._dbName, JSON.stringify(data))
    }
  }
  findAll(callback) {
    callback.call(this, JSON.parse(localStorage.getItem(this._dbName)).todos)
  }
  save(updateData, callback, id) {
    const data = JSON.parse(localStorage.getItem(this._dbName))
    let targetTodo

    if (id) {
      data.todos = data.todos.map((todo) => {
        if (todo.id === id) {
          todo = { ...todo, ...updateData }
          targetTodo = todo
        }
        return todo
      })
      localStorage.setItem(this._dbName, JSON.stringify(data))
      callback.call(this, targetTodo)
    } else {
      updateData.id = new Date().getTime()

      data.todos.push(updateData)
      localStorage.setItem(this._dbName, JSON.stringify(data))
      callback.call(this, [updateData])
    }
  }
  remove(id, callback) {
    const data = JSON.parse(localStorage.getItem(this._dbName))
    let todos = data.todos
    todos = todos.filter((todo) => todo.id !== id)
    localStorage.setItem(this._dbName, JSON.stringify(data))
    callback.call(this, id)
  }

  find(query, callback) {
    if (!callback) return

    const data = JSON.parse(localStorage.getItem(this._dbName))
    let todos = data.todos
    const targetTodos = todos.filter((todo) => {
      for (let q in query) {
        if (todo[q] !== query[q]) return false
        return true
      }
    })
    callback.call(this, targetTodos)
  }
}

export default Storage
