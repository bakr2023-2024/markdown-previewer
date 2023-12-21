import React from "react";
import "./App.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "block",
    };
    this.updateTextEditor = this.updateTextEditor.bind(this);
    this.toggleExpandDiv = this.toggleExpandDiv.bind(this);
  }
  toggleExpandDiv(event) {
    event.target.children[0].classList.toggle("fa-minus");
    event.target.children[0].classList.toggle("fa-plus");
    this.setState((state) => ({
      display: state.display === "block" ? "none" : "block",
    }));
  }
  updateTextEditor(event) {
    this.props.updateText(event.target.value);
  }
  render() {
    return (
      <div id="edit" style={{ height: this.state.height }}>
        <nav className="navbar">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Editor</span>
            <button className="btn border-0" onClick={this.toggleExpandDiv}>
              <i
                className="fa-solid fa-minus"
                style={{ pointerEvents: "none" }}
              ></i>
            </button>
          </div>
        </nav>
        <div style={{ display: this.state.display }}>
          <textarea
          id="editor"
            value={this.props.text}
            onChange={this.updateTextEditor}
            rows={10}
          />
        </div>
      </div>
    );
  }
}
class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "block",
    };
    this.toggleExpandDiv = this.toggleExpandDiv.bind(this);
  }
  toggleExpandDiv(event) {
    event.target.children[0].classList.toggle("fa-minus");
    event.target.children[0].classList.toggle("fa-plus");

    this.setState((state) => ({
      display: state.display === "block" ? "none" : "block",
    }));
  }
  render() {
    return (
      <div id="previewer">
        <nav className="navbar">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Preview</span>
            <button className="btn border-0" onClick={this.toggleExpandDiv}>
              <i
                className="fa-solid fa-minus"
                style={{ pointerEvents: "none" }}
              ></i>
            </button>
          </div>
        </nav>
        <div
        id="preview"
          style={{ display: this.state.display }}
          dangerouslySetInnerHTML={{
            __html: this.props.cleanMarkdown(this.props.text),
          }}
        />
      </div>
    );
  }
}
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.updateText = this.updateText.bind(this);
  }
  componentDidMount() {
    this.setState(() => ({
      text: "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n",
    }));
  }
  updateText(text) {
    this.setState(() => ({
      text,
    }));
  }
  render() {
    return (
      <div
        className="container-fluid d-flex flex-column align-items-center gap-2"
        id="container"
      >
        <Editor updateText={this.updateText} text={this.state.text} />
        <Previewer
          text={this.state.text}
          cleanMarkdown={this.props.cleanMarkdown}
        />
      </div>
    );
  }
}
export default Container;
