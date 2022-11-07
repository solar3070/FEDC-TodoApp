import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";

export default function App({ $target }) {
  this.state = {
    username: "jun",
    todos: [],
  };

  new Header({
    $target,
    initialState: this.state.username,
  });

  new TodoForm({
    $target,
    onSubmit: (content) => {
      alert(`${content} 추가처리!`);
    },
  });

  const todoList = new TodoList({
    $target,
    initialState: this.state.todos,
    onToggle: (id) => {
      alert(`${id} 토글 예정`);
    },
    onRemove: (id) => {
      alert(`${id} 삭제 예정`);
    },
  });
}
