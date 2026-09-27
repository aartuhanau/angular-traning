export const enviroment = {
  apiUrl: "http://localhost:3000",
  mapper: {
    priceFrom: "price_gte",
    priceTo: "price_lte",
    ratingFrom: "rating.rate_gte",
    ratingTo: "rating.rate_lte",
    inStock: "stock_gte",
    hasReviews: "rating.count_gte",
  },
  mapperReverse: {
    price_lte: "priceTo",
    price_gte: "priceFrom",
    "rating.rate_gte": "ratingFrom",
    "rating.rate_lte": "ratingTo",
    stock_gte: "inStock",
    "rating.count_gte": "hasReviews",
  },
  mapperPredefinedValue: {
    inStock: "1",
    hasReviews: "1",
  },
};
