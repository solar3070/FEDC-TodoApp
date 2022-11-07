export default function TodoList({ $target, initialState }) {
  const $todo = document.createElement("div");

  $target.appendChild($todo);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todo.innerHTML = `
      <ul>${this.state
        .map(
          ({ content, isCompleted }) => `
        <li>${content}</li>
      `
        )
        .join("")}</ul>
    `;
  };

  this.render();
}
