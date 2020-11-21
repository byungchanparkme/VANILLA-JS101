class Template {
  constructor() {
    this.defaultTemplate = `
      <li data-id="{{id}}" class="{{completed}}">
        <div class="view">
          <input class="toggle" type="checkbox" {{checked}} />
          <label>{{title}}</label>
          <button class="destroy"></button>
        </div>
      </li>
    `
  }

  insert(data) {
    if (data.length === 0) return ""
    let view = ""
    let template
    for (let i = 0; i < data.length; i++) {
      template = this.defaultTemplate
      let completed = ""
      let checked = ""

      if (data[i].completed) {
        completed = "completed"
        checked = "checked"
      }

      template = template.replace("{{id}}", data[i].id)
      template = template.replace("{{title}}", data[i].title)
      template = template.replace("{{completed}}", completed)
      template = template.replace("{{checked}}", checked)
      view = view + template
    }

    return view
  }
}

export default Template
