class View {
  constructor(template) {
    this.template = template

    this.$todoList = document.querySelector(".todo-list")
    this.$todoInput = document.querySelector(".new-todo")
    this.$clearCompleted = document.querySelector(".clear-completed")
  }

  bind(event, handler) {
    if (event === "newTodo") {
      this.$todoInput.addEventListener("change", () => {
        handler(this.$todoInput.value)
      })
    } else if (event === "itemRemove") {
      this.$todoList.addEventListener("click", (event) => {
        const target = event.target
        if (target.className === "destroy") {
          const targetId = this._getItemId(target.parentNode, "li")
          console.log(targetId)
          handler({ id: targetId })
        }
      })
    } else if (event === "itemToggle") {
      this.$todoList.addEventListener("click", (event) => {
        const target = event.target
        if (target.type === "checkbox") {
          const targetId = this._getItemId(target)
          handler({ id: targetId, completed: target.checked })
        }
      })
    } else if (event === "itemEdit") {
      this.$todoList.addEventListener("click", (event) => {
        const target = event.target
        if (target.tagName.toLowerCase() === "label") {
          const targetId = this._getItemId(target)
          handler({ id: targetId })
        }
      })
    } else if (event === "itemEditDone") {
      this.$todoList.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
          const target = event.target
          const targetId = this._itemId(target)
          handler({ id: targetId, title: target.value })
        }
      })
    } else if (event === "removeCompleted") {
      this.$clearCompleted.addEventListener("click", () => {
        handler()
      })
    }
  }

  render(viewCmd, data) {
    const viewCommands = {
      showEntries: () => {
        this._addItem(data)
      },
      clearNewTodo: () => {
        this.$todoInput.value = ""
      },
      removeItem: () => {
        this._removeItem(data)
      },
      elementComplete: () => {
        this._elementComplete(data.id, data.completed)
      },
      editItem: () => {
        this._editItem(data.id, data.title)
      },
      editItemDone: () => {
        this._editItemDone(data.id, data.title)
      },
    }
    viewCommands[viewCmd]()
  }

  _addItem(data) {
    this.$todoList.innerHTML = this.template.insert(data)
  }

  _getItemId(element, tagName) {
    let li
    if (tagName) {
      if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
        li = element.parentNode
      }
    } else {
      li = element.parentNode.parentNode
    }
    return parseInt(li.dataset.id, 10)
  }

  _itemId(element) {
    let li
    li = element.parentNode
    return parseInt(li.dataset.id, 10)
  }

  _removeItem(id) {
    const listItem = document.querySelector('[data-id="' + id + '"]')
    if (listItem) {
      this.$todoList.removeChild(listItem)
    }
  }

  _elementComplete(id, completed) {
    const listItem = document.querySelector('[data-id="' + id + '"]')
    if (listItem) {
      listItem.className = completed ? "completed" : ""
    }
  }

  _editItem(id, title) {
    const listItem = document.querySelector('[data-id="' + id + '"]')
    if (listItem) {
      listItem.className += "editing"

      const input = document.createElement("input")
      input.className = "edit"

      listItem.appendChild(input)
      input.focus()
      input.value = title
    }
  }

  _editItemDone(id, title) {
    const listItem = document.querySelector('[data-id="' + id + '"]')
    if (listItem) {
      const input = document.querySelector("input.edit", listItem)
      listItem.removeChild(input)
      listItem.className = listItem.className.replace("editing", "")

      const labels = document.querySelectorAll("label")
      labels.forEach((label) => {
        if (label.parentNode.parentNode === listItem) {
          label.textContent = title
        }
      })
    }
  }
}

export default View
