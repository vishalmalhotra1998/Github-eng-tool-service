export const notFoundRoute = (req, res, next) => {
  console.log('::::::::Inside Not FoundRoute::::::');
  next({ message: 'Not Found', code: 500 });
};
