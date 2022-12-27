export const makeImagePath = (img, width) =>
  `https://image.tmdb.org/t/p/${width || "w500"}${img}`;
