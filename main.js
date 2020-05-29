/**
 * @author Ruslan Myznikov
 * Created at 29.05.2020
 */

let selectors = {
  $todoList: document.getElementById('todo_list'),
  $addBtn: document.getElementById('add_btn'),
  $taskNameTextarea: document.getElementById('task_name')
}

class TodoList {
  todo = [{
    state: true,
    text: 'Add a new TODO'
  }];

  addNewTodo = (todoTask) => {
    if (!this.todo.filter(el => el.text === todoTask).length) {
      this.todo.push({state: false, text: todoTask})
    } else {
      alert('Todo task already exists')
    }
  }

  render = () => {
    selectors.$todoList.innerHTML = ''
    this.todo.forEach(el => {
      let divWrap = document.createElement('div');
      el.state && divWrap.classList.add('line-through')
      divWrap.innerHTML = `<input type="checkbox" ${el.state ? 'checked' : ''}><span>${el.text}</span><span class="remove-todo">X</span>`
      selectors.$todoList.appendChild(divWrap);
      let removeBtn = divWrap.getElementsByClassName('remove-todo')[0];
      let checkbox = divWrap.getElementsByTagName('input')[0];
      removeBtn.addEventListener('click', this.removeTodo);
      checkbox.addEventListener('change', this.changeState);
    })
    this.saveToLocaleStorage()
  }

  initClickAddHandler = () => {
    selectors.$addBtn.addEventListener('click', () => {
      let todoStr = selectors.$taskNameTextarea.value;
      if (todoStr) {
        this.addNewTodo(todoStr);
        this.render();
      }
    })
  }

  removeTodo = (event) => {
    this.todo = this.todo.filter(el => el.text !== event.target.parentElement.getElementsByTagName('span')[0].innerHTML);
    this.render();
  }

  changeState = (event) => {
    this.todo.forEach(el => {
      if (el.text === event.target.parentElement.getElementsByTagName('span')[0].innerHTML) {
        el.state = event.target.checked;
      }
      event.target.parentElement.classList.toggle('line-through', event.target.checked)
    })
    this.saveToLocaleStorage()
  }

  saveToLocaleStorage = () => {
    if (this.todo.length) {
      localStorage.setItem('TodoList', JSON.stringify(this.todo))
    } else {
      localStorage.removeItem('TodoList')
    }
  }
}

function main() {
  let todoList = new TodoList();
  let todoLS = localStorage.getItem('TodoList');
  if (todoLS) {
    todoList.todo = JSON.parse(todoLS)
  }
  todoList.render();
  todoList.initClickAddHandler();
};

document.body.onload = () => {
  main();
}
