import {BrowserRouter, Route} from "react-router-dom";
import React, {Component} from "react";
import {
  requestUrl,
  requestUrlBusiness,
  requestUrlEntertainment,
  requestUrlHealth,
  requestUrlScience,
  requestUrlSport,
  requestUrlTechnology
} from "./api";
import NewsCard from "./NewsCard";
import Article from "./Article";

const Materialize = window.Materialize;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: undefined,
      newsBusiness: undefined,
      newsEntertainment: undefined,
      newsHealth: undefined,
      newsScience: undefined,
      newsSport: undefined,
      newsTechnology: undefined,
      article: undefined,
      wordCount: undefined,
      article_business: undefined,
      article_entertainment: undefined,
      article_health: undefined,
      article_science: undefined,
      article_sport: undefined,
      article_technology: undefined,
      behaviour_state: undefined
    };
  }

  componentDidMount() {
    const inactiveTab = {
      event: "inactive tab"
    };

    const activeTab = {
      event: "active tab"
    };

    window.addEventListener("scroll", this.onScroll, true);
    this.fetchNews();
    window.onblur = () => this.updateInput(inactiveTab);
    window.onfocus = () => this.updateInput(activeTab);
  }

  componentWillUnmount() {
    window.onblur();
    window.onfocus();
  }

  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <div className="App-content">
              <div className="row" style={{marginTop: 20}}>
                <div>{this.displayFeed()}</div>
              </div>
            </div>
          )}
        />

        <Route
          path="/business"
          exact
          render={() => (
            <div className="App-content">
              <div className="row" style={{marginTop: 20}}>
                <div>{this.displayFeedBusiness()}</div>
              </div>
            </div>
          )}
        />

        <Route
          path="/entertainment"
          exact
          render={() => (
            <div className="App-content">
              <div className="row" style={{marginTop: 20}}>
                <div>{this.displayFeedEntertainment()}</div>
              </div>
            </div>
          )}
        />

        <Route
          path="/health"
          exact
          render={() => (
            <div className="App-content">
              <div className="row" style={{marginTop: 20}}>
                <div>{this.displayFeedHealth()}</div>
              </div>
            </div>
          )}
        />

        <Route
          path="/science"
          exact
          render={() => (
            <div className="App-content">
              <div className="row" style={{marginTop: 20}}>
                <div>{this.displayFeedScience()}</div>
              </div>
            </div>
          )}
        />

        <Route
          path="/sport"
          exact
          render={() => (
            <div className="App-content">
              <div className="row" style={{marginTop: 20}}>
                <div>{this.displayFeedSport()}</div>
              </div>
            </div>
          )}
        />

        <Route
          path="/technology"
          exact
          render={() => (
            <div className="App-content">
              <div className="row" style={{marginTop: 20}}>
                <div>{this.displayFeedTechnology()}</div>
              </div>
            </div>
          )}
        />

        <Route
          path={"/article/:id"}
          exact
          render={props => {
            let id = props.location.pathname.replace("/article/", "");
            return this.displayArticle(id);
          }}
        />

        <Route
          path={"/business/article/:id"}
          exact
          render={props => {
            let id = props.location.pathname.replace("/business/article/", "");
            return this.displayArticleBusiness(id);
          }}
        />

        <Route
          path={"/entertainment/article/:id"}
          exact
          render={props => {
            let id = props.location.pathname.replace(
              "/entertainment/article/",
              ""
            );
            return this.displayArticleEntertainment(id);
          }}
        />

        <Route
          path={"/health/article/:id"}
          exact
          render={props => {
            let id = props.location.pathname.replace("/health/article/", "");
            return this.displayArticleHealth(id);
          }}
        />

        <Route
          path={"/science/article/:id"}
          exact
          render={props => {
            let id = props.location.pathname.replace("/science/article/", "");
            return this.displayArticleScience(id);
          }}
        />

        <Route
          path={"/sport/article/:id"}
          exact
          render={props => {
            let id = props.location.pathname.replace("/sport/article/", "");
            return this.displayArticleSport(id);
          }}
        />

        <Route
          path={"/technology/article/:id"}
          exact
          render={props => {
            let id = props.location.pathname.replace(
              "/technology/article/",
              ""
            );
            return this.displayArticleTechnology(id);
          }}
        />
      </div>
    );
  }

  getWordCount = str => {
    return str.split(" ").length;
  };

  getCurrentDateMili = () => {
    var newDate = new Date();
    var month = (newDate.getMonth() + 1).toString();
    var date = newDate.getDay().toString();
    var year = newDate.getFullYear().toString();
    var hour = newDate.getHours().toString();
    var minutes = newDate.getMinutes().toString();
    var seconds = newDate.getSeconds().toString();
    var milis = newDate.getMilliseconds().toString();
    var result =
      date +
      "/" +
      +month +
      "/" +
      year +
      "   " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds +
      ":" +
      milis;
    return result;
  };

  getCurrentDate = () => {
    var newDate = new Date();
    var month = (newDate.getMonth() + 1).toString();
    var year = newDate.getFullYear().toString();
    var date = newDate.getDay().toString();
    var hour = newDate.getHours().toString();
    var minutes = newDate.getMinutes().toString();
    var seconds = newDate.getSeconds().toString();
    var result =
      date +
      "/" +
      month +
      "/" +
      year +
      "   " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds +
      ":000";
    return result;
  };

  onScroll = () => {
    const eventObjectFeed = {
      event: "scroll",
      y: window.scrollY + document.documentElement.clientHeight,
      url: window.location.href,
      doc_height: document.body.scrollHeight,
      number_of_articles: Math.trunc(
        ((window.scrollY + document.documentElement.clientHeight) /
          document.body.scrollHeight) *
          10
      )
    };
    const eventObjectArticle = {
      event: "scroll",
      y: window.scrollY + document.documentElement.clientHeight,
      url: window.location.href,
      doc_height: document.body.scrollHeight,
      article_percentage_read:
        Math.trunc(
          ((window.scrollY + document.documentElement.clientHeight) /
            document.body.scrollHeight) *
            100
        ) + "%"
    };
    if (window.location.toString().includes("article")) {
      this.updateInputScroll(eventObjectArticle);
    } else this.updateInputScroll(eventObjectFeed);
  };

  updateInput(object) {
    var key = this.getCurrentDate();
    const value = JSON.stringify(object);
    localStorage.setItem(key, value);
  }

  updateInputScroll(object) {
    var key = this.getCurrentDateMili();
    const value = JSON.stringify(object);
    localStorage.setItem(key, value);
  }

  getArticle = url => {
    var JSSoup = require("jssoup").default;
    var articleContentURL = url;
    console.log(url);
    var paragraph = "";
    return fetch(articleContentURL)
      .then(resp => {
        return resp.text();
      })
      .then(html => {
        let soup = new JSSoup(html);
        let tag = soup.findAll("div", "story-body__inner");
        let content = new JSSoup(tag);
        let p = content.findAll("p");
        p.forEach(element => {
          paragraph = paragraph + element.text + "\n";
        });
        // console.log(paragraph);
        return paragraph;
      });

    // return;
  };

  fetchNews = () => {
    try {
      fetch(requestUrl.requestURL)
        .then(res => res.json())
        .then(res => {
          let array = [];
          let wordCountArray = [];
          for (let id = 0; id < 10; id++) {
            let url = res.articles[id].url;
            this.getArticle(url).then(article => {
              array.push(article);
              wordCountArray.push(this.getWordCount(article));
            });
          }
          this.setState({
            news: res,
            articles: array,
            wordCount: wordCountArray
          });
        });
      fetch(requestUrlBusiness.requestURL)
        .then(res => res.json())
        .then(res => {
          let array = [];
          for (let id = 0; id < 10; id++) {
            let url = res.articles[id].url;
            this.getArticle(url).then(article => array.push(article));
          }
          this.setState({
            newsBusiness: res,
            article_business: array
          });
        });
      fetch(requestUrlEntertainment.requestURL)
        .then(res => res.json())
        .then(res => {
          let array = [];
          for (let id = 0; id < 10; id++) {
            let url = res.articles[id].url;
            this.getArticle(url).then(article => array.push(article));
          }
          this.setState({
            newsEntertainment: res,
            article_entertainment: array
          });
        });
      fetch(requestUrlHealth.requestURL)
        .then(res => res.json())
        .then(res => {
          let array = [];
          for (let id = 0; id < 10; id++) {
            let url = res.articles[id].url;
            this.getArticle(url).then(article => array.push(article));
          }
          this.setState({
            newsHealth: res,
            article_health: array
          });
        });
      fetch(requestUrlScience.requestURL)
        .then(res => res.json())
        .then(res => {
          let array = [];
          for (let id = 0; id < 10; id++) {
            let url = res.articles[id].url;
            this.getArticle(url).then(article => array.push(article));
          }
          this.setState({
            newsScience: res,
            article_science: array
          });
        });
      fetch(requestUrlSport.requestURL)
        .then(res => res.json())
        .then(res => {
          let array = [];
          for (let id = 0; id < 10; id++) {
            let url = res.articles[id].url;
            this.getArticle(url).then(article => array.push(article));
          }
          this.setState({
            newsSport: res,
            article_sport: array
          });
        });
      fetch(requestUrlTechnology.requestURL)
        .then(res => res.json())
        .then(res => {
          let array = [];
          for (let id = 0; id < 10; id++) {
            let url = res.articles[id].url;
            this.getArticle(url).then(article => array.push(article));
          }
          this.setState({
            newsTechnology: res,
            article_technology: array
          });
        });
    } catch (error) {
      Materialize.toast(error, 8000, "error-toast");
      console.log("Failed fetching data: ", error);
    }
  };
  updateInput(object) {
    var key = this.getCurrentDate();
    const value = JSON.stringify(object);
    localStorage.setItem(key, value);
  }

  displayFeed = async => {
    const value = {
      event: "Home page loaded"
    };

    this.updateInput(value);
    const news = this.state.news;
    let counter = [];

    for (let index = 0; index < 10; index++) {
      counter[index] = index;
    }
    if (news) {
      //conditional rendering based on the current state for simulating the UI adaptions
      if (this.state.behaviour_state == 1) {
        return (
          <ul>
            {counter.map(counter => (
              <li key={news.articles[counter].title}>
                <NewsCard
                  url={"/article/"}
                  id={counter}
                  picture={news.articles[counter].urlToImage}
                  title={"# " + news.articles[counter].title}
                  description={news.articles[counter].description}
                />
                <br />
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <ul>
            {counter.map(counter => (
              <li key={news.articles[counter].title}>
                <NewsCard
                  url={"/article/"}
                  id={counter}
                  picture={news.articles[counter].urlToImage}
                  title={news.articles[counter].title}
                  description={news.articles[counter].description}
                />

                <br />
              </li>
            ))}
          </ul>
        );
      }
    }

    return null;
  };

  displayFeedBusiness = () => {
    const eventObject = {
      event: "Business Feed loaded"
    };
    this.updateInput(eventObject);
    const news = this.state.newsBusiness;
    let counter = [];
    for (let index = 0; index < 10; index++) {
      counter[index] = index;
    }
    if (news) {
      console.log(news);
      return (
        <ul>
          {counter.map(counter => (
            <li key={news.articles[counter].title}>
              <NewsCard
                url={"/business/article/"}
                id={counter}
                picture={news.articles[counter].urlToImage}
                title={news.articles[counter].title}
                description={news.articles[counter].description}
              />

              <br />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  displayFeedEntertainment = () => {
    const eventObject = {
      event: "Entertainment Feed loaded"
    };
    this.updateInput(eventObject);
    const news = this.state.newsEntertainment;
    let counter = [];
    for (let index = 0; index < 10; index++) {
      counter[index] = index;
    }
    if (news) {
      console.log(news);
      return (
        <ul>
          {counter.map(counter => (
            <li key={news.articles[counter].title}>
              <NewsCard
                url={"/entertainment/article/"}
                id={counter}
                picture={news.articles[counter].urlToImage}
                title={news.articles[counter].title}
                description={news.articles[counter].description}
              />

              <br />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  displayFeedHealth = () => {
    const eventObject = {
      event: "Health Feed loaded"
    };
    this.updateInput(eventObject);
    const news = this.state.newsHealth;
    let counter = [];
    for (let index = 0; index < 10; index++) {
      counter[index] = index;
    }
    if (news) {
      console.log(news);
      return (
        <ul>
          {counter.map(counter => (
            <li key={news.articles[counter].title}>
              <NewsCard
                url={"/health/article/"}
                id={counter}
                picture={news.articles[counter].urlToImage}
                title={news.articles[counter].title}
                description={news.articles[counter].description}
              />

              <br />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  displayFeedScience = () => {
    const eventObject = {
      event: "Science Feed loaded"
    };
    this.updateInput(eventObject);
    const news = this.state.newsScience;
    let counter = [];
    for (let index = 0; index < 10; index++) {
      counter[index] = index;
    }
    if (news) {
      console.log(news);
      return (
        <ul>
          {counter.map(counter => (
            <li key={news.articles[counter].title}>
              <NewsCard
                url={"/science/article/"}
                id={counter}
                picture={news.articles[counter].urlToImage}
                title={news.articles[counter].title}
                description={news.articles[counter].description}
              />

              <br />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  displayFeedSport = () => {
    const eventObject = {
      event: "Sport Feed loaded"
    };
    this.updateInput(eventObject);
    const news = this.state.newsSport;
    let counter = [];
    for (let index = 0; index < 10; index++) {
      counter[index] = index;
    }
    if (news) {
      console.log(news);
      return (
        <ul>
          {counter.map(counter => (
            <li key={news.articles[counter].title}>
              <NewsCard
                url={"/sport/article/"}
                id={counter}
                picture={news.articles[counter].urlToImage}
                title={news.articles[counter].title}
                description={news.articles[counter].description}
              />

              <br />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  displayFeedTechnology = () => {
    const eventObject = {
      event: "Technology Feed loaded"
    };
    this.updateInput(eventObject);
    const news = this.state.newsTechnology;
    let counter = [];
    for (let index = 0; index < 10; index++) {
      counter[index] = index;
    }
    if (news) {
      console.log(news);
      return (
        <ul>
          {counter.map(counter => (
            <li key={news.articles[counter].title}>
              <NewsCard
                url={"/technology/article/"}
                id={counter}
                picture={news.articles[counter].urlToImage}
                title={news.articles[counter].title}
                description={news.articles[counter].description}
              />

              <br />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  displayArticle = id => {
    const news = this.state.news;
    const eventObject = {
      event: "Article selected",
      properties: {
        page: "Top stories",
        id: id,
        title: news.articles[id].title,
        wordCount: this.state.wordCount[id]
      }
    };
    this.updateInput(eventObject);
    console.log(this.state);
    if (news) {
      return (
        <Article
          title={news.articles[id].title}
          picture={news.articles[id].urlToImage}
          content={this.state.articles[id]}
        />
      );
    }
    return null;
  };

  displayArticleBusiness = id => {
    const news = this.state.newsBusiness;
    console.log(this.state);
    const eventObject = {
      event: "Article selected",
      properties: {
        page: "Business Feed",
        id: id,
        title: news.articles[id].title
      }
    };
    this.updateInput(eventObject);
    if (news) {
      console.log(news);
      return (
        <Article
          title={news.articles[id].title}
          picture={news.articles[id].urlToImage}
          content={this.state.article_business[id]}
        />
      );
    }
    return null;
  };

  displayArticleEntertainment = id => {
    const news = this.state.newsEntertainment;
    const eventObject = {
      event: "Article selected",
      properties: {
        page: "Entertainment Feed",
        id: id,
        title: news.articles[id].title
      }
    };
    this.updateInput(eventObject);
    if (news) {
      console.log(news);
      return (
        <Article
          title={news.articles[id].title}
          picture={news.articles[id].urlToImage}
          content={this.state.article_entertainment[id]}
        />
      );
    }
    return null;
  };

  displayArticleHealth = id => {
    const news = this.state.newsHealth;
    const eventObject = {
      event: "Article selected",
      properties: {
        page: "Health Feed",
        id: id,
        title: news.articles[id].title
      }
    };
    this.updateInput(eventObject);
    if (news) {
      console.log(news);
      return (
        <Article
          title={news.articles[id].title}
          picture={news.articles[id].urlToImage}
          content={this.state.article_health[id]}
        />
      );
    }
    return null;
  };

  displayArticleScience = id => {
    const news = this.state.newsScience;
    const eventObject = {
      event: "Article selected",
      properties: {
        page: "Science Feed",
        id: id,
        title: news.articles[id].title
      }
    };
    this.updateInput(eventObject);
    if (news) {
      console.log(news);
      return (
        <Article
          title={news.articles[id].title}
          picture={news.articles[id].urlToImage}
          content={this.state.article_science[id]}
        />
      );
    }
    return null;
  };

  displayArticleSport = id => {
    const news = this.state.newsSport;
    const eventObject = {
      event: "Article selected",
      properties: {
        page: "Sport Feed",
        id: id,
        title: news.articles[id].title
      }
    };
    this.updateInput(eventObject);
    if (news) {
      console.log(news);
      return (
        <Article
          title={news.articles[id].title}
          picture={news.articles[id].urlToImage}
          content={this.state.article_sport[id]}
        />
      );
    }
    return null;
  };

  displayArticleTechnology = id => {
    const news = this.state.newsTechnology;
    const eventObject = {
      event: "Article selected",
      properties: {
        page: "Technology Feed",
        id: id,
        title: news.articles[id].title
      }
    };
    this.updateInput(eventObject);
    if (news) {
      console.log(news);
      return (
        <Article
          title={news.articles[id].title}
          picture={news.articles[id].urlToImage}
          content={this.state.article_technology[id]}
        />
      );
    }
    return null;
  };
}

export default Feed;
