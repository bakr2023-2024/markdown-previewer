/* global marked */
/* global DOMPurify */
import ReactDOM from "react-dom";
import Container from "./App.js";
const cleanMarkdown = input=>DOMPurify.sanitize(marked.parse(input))

ReactDOM.render(
  <Container cleanMarkdown={cleanMarkdown} />,
  document.getElementById("hookContainer")
);
