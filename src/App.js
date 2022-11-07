import { request } from "./api.js";
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
    onSubmit: async (content) => {
      const todo = {
        content,
        isCompleted: false,
      };
      this.setState({
        ...this.state,
        todos: [...this.state.todos, todo],
      });
      await request(`/${this.state.username}`, {
        method: "POST",
        body: JSON.stringify(todo),
      });
      await fetchTodos();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    todoList.setState(this.state.todos);
  };

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

  const fetchTodos = async () => {
    const { username } = this.state;

    if (username) {
      const todos = await request(`/${username}?delay=5000`);
      this.setState({
        ...this.state,
        todos,
      });
    }
  };

  fetchTodos();
}
