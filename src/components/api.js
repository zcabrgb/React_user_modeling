const NEWS_API_KEY = "&apiKey=30c2775b2837417abf5ed1f3fdc8a736";
let url = "https://newsapi.org/v2/top-headlines";
let urlCategory = url + "?country=gb";

export const requestUrl = {
  requestURL: url + "?sources=bbc-news" + NEWS_API_KEY
};

export const requestUrlBusiness = {
  requestURL: urlCategory + "&category=business" + NEWS_API_KEY
};

export const requestUrlEntertainment = {
  requestURL: urlCategory + "&category=entertainment" + NEWS_API_KEY
};

export const requestUrlSport = {
  requestURL: urlCategory + "&category=sports" + NEWS_API_KEY
};

export const requestUrlTechnology = {
  requestURL: urlCategory + "&category=technology" + NEWS_API_KEY
};

export const requestUrlScience = {
  requestURL: urlCategory + "&category=science" + NEWS_API_KEY
};

export const requestUrlHealth = {
  requestURL: urlCategory + "&category=health" + NEWS_API_KEY
};
