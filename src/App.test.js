import Article from "./components/Article";
import Feed from "./components/Feed";
import NewsCard from "./components/NewsCard";

var React = require("react");
const createComponent = require("react-unit");

describe("Article component", () => {
  var component = createComponent(
    <Article picture={"picture"} title={"title"} content={"content"} />
  );

  it("correct article title", () => {
    var input = component.findByQuery("h1")[0];

    expect(input.text).toBe("title");
  });

  it("correct article picture source", () => {
    var input = component.findByQuery("img")[0];

    expect(input.props.src).toBe("picture");
  });

  it("correct behaviour when pic src is missing", () => {
    var input = component.findByQuery("img")[0];

    expect(input.props.alt).toBe("Picture not available");
  });

  it("correct article content", () => {
    var input = component.findByQuery("p")[0];

    expect(input.text).toBe("content");
  });
});

describe("News Card component", () => {
  var component = createComponent.shallow(
    <NewsCard
      picture={"picture"}
      title={"title"}
      description={"description"}
      url={"url"}
      id={"0"}
    />
  );

  it("correct description", () => {
    var input = component.findByQuery("span")[0];

    expect(input.text).toBe("description");
  });

  it("correct picture source", () => {
    var input = component.findByQuery("img")[0];

    expect(input.props.src).toBe("picture");
  });

  it("correct behaviour when pic src is missing", () => {
    var input = component.findByQuery("img")[0];

    expect(input.props.alt).toBe("Picture not available");
  });
});
