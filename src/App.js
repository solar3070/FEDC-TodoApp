import { request } from "./api.js";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";

export default function App({ $target }) {
  this.state = {
    username: "jun",
    todos: [],
    isTodoLoading: false,
  };

  const header = new Header({
    $target,
    initialState: {
      isLoading: this.state.isTodoLoading,
      username: this.state.username,
    },
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
      await request(`/${this.state.username}?delay=3000`, {
        method: "POST",
        body: JSON.stringify(todo),
      });
      await fetchTodos();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    header.setState({
      isLoading: this.state.isTodoLoading,
      username: this.state.username,
    });

    todoList.setState({
      isLoading: this.state.isTodoLoading,
      todos: this.state.todos,
    });
  };

  const todoList = new TodoList({
    $target,
    initialState: {
      isLoading: this.state.isTodoLoading,
      todos: this.state.todos,
    },
    onToggle: async (id) => {
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);

      const nextTodos = [...this.state.todos];
      nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted;
      this.setState({
        ...this.state,
        todos: nextTodos,
      });

      await request(`/${this.state.username}/${id}/toggle`, {
        method: "PUT",
      });
      await fetchTodos();
    },
    onRemove: async (id) => {
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);

      const nextTodos = [...this.state.todos];
      nextTodos.splice(todoIndex, 1);
      this.setState({
        ...this.state,
        todos: nextTodos,
      });

      await request(`/${this.state.username}/${id}?`, {
        method: "DELETE",
      });
      await fetchTodos();
    },
  });

  const fetchTodos = async () => {
    const { username } = this.state;

    if (username) {
      this.setState({
        ...this.state,
        isTodoLoading: true,
      });
      const todos = await request(`/${username}`);
      this.setState({
        ...this.state,
        todos,
        isTodoLoading: false,
      });
    }
  };

  fetchTodos();
}
