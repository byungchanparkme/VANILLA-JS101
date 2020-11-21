class Model {
  constructor(storage) {
    this.storage = storage
  }

  read(query, callback) {
    const queryType = typeof query
    callback = callback || function () {}

    if (queryType === "function") {
      callback = query
      return this.storage.findAll(callback)
    } else if (queryType === "number" || queryType === "string") {
      query = parseInt(query, 10)
      return this.storage.find({ id: query }, callback)
    } else {
      return this.storage.find(query, callback)
    }
  }
  create(title, callback) {
    title = title || ""
    callback = callback || function () {}

    const newTodo = {
      title: title.trim(),
      completed: false,
    }

    this.storage.save(newTodo, callback)
  }

  remove(id, callback) {
    this.storage.remove(id, callback)
  }

  update(id, data, callback) {
    this.storage.save(data, callback, id)
  }
}

export default Model
