import React from "react";

const Article = props => {
  return (
    <div className="App-content">
      <h1>{props.title}</h1>
      <img alt="Picture not available" src={props.picture} />
      <p>{props.content}</p>
    </div>
  );
};

export default Article;
