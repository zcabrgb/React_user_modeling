import React, { Component } from "react";
import "./NewsCard.css";
import { NavLink } from "react-router-dom";

const NewsCard = props => {
  return (
    <div className="card horizontal" style={{ margin: "auto" }}>
      <div className="card-image news-img-container">
        <img
          alt="Picture not available"
          className="news-img"
          src={props.picture}
        />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <div className="news-data">
            <NavLink to={`${props.url}${props.id}`}>
              <p>
                <i className="material-icons">info</i>
                <span>{props.title}</span>
              </p>
            </NavLink>
          </div>
          <div className="news-data">
            <span>{props.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
