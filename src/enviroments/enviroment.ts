export const enviroment = {
  apiUrl: "http://localhost:3000",
  mapper: {
    priceFrom: "price:gte",
    priceTo: "price:lte",
    ratingFrom: "rating.rate:gte",
    ratingTo: "rating.rate:lte",
    inStock: "stock:gte",
    hasReviews: "rating.count:gte",
  },
  mapperReverse: {
    "price:lte": "priceTo",
    "price:gte": "priceFrom",
    "rating.rate:gte": "ratingFrom",
    "rating.rate:lte": "ratingTo",
    "stock:gte": "inStock",
    "rating.count:gte": "hasReviews",
  },
  mapperPredefinedValue: {
    inStock: "1",
    hasReviews: "1",
  },
};
