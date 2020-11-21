class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.showAll()

    this.view.bind("newTodo", (title) => {
      this.addItem(title)
    })
    this.view.bind("itemRemove", (item) => {
      this.removeItem(item.id)
    })
    this.view.bind("itemToggle", (item) => {
      this.toggleComplete(item.id, item.completed)
    })
    this.view.bind("itemEdit", (item) => {
      this.editItem(item.id)
    })
    this.view.bind("itemEditDone", (item) => {
      this.editItemSave(item.id, item.title)
    })
    this.view.bind("removeCompleted", () => {
      this.removeCompletedItems()
    })
  }

  showAll() {
    this.model.read((data) => {
      this.view.render("showEntries", data)
    })
  }

  addItem(title) {
    if (title.trim() === "") return
    // 새로운 데이터를 로컬 스토리지에 저장하고 인풋 창을 초기화한다.
    this.model.create(title, (title) => {
      this.view.render("clearNewTodo", title)
    })
    // 새로운 데이터가 반영된 데이터를 읽어들여 이 데이터를 토대로 뷰를 렌더링한다.
    this.showAll()
  }

  removeItem(id) {
    this.model.remove(id, (id) => {
      this.view.render("removeItem", id)
    })
  }

  toggleComplete(id, completed) {
    this.model.update(id, { completed: completed }, (data) => {
      this.view.render("elementComplete", {
        id: data.id,
        completed: data.completed,
      })
    })
  }

  editItem(id) {
    this.model.read(id, (data) => {
      this.view.render("editItem", { id: id, title: data[0].title })
    })
  }

  editItemSave(id, title) {
    title = title.trim()

    if (title.length !== 0) {
      this.model.update(id, { title: title }, (data) => {
        this.view.render("editItemDone", {
          id: data.id,
          title: data.title,
        })
      })
    } else {
      this.removeItem(id)
    }
  }

  removeCompletedItems() {
    this.model.read({ completed: true }, (data) => {
      data.forEach((item) => this.removeItem(item))
    })
  }
}

export default Controller
