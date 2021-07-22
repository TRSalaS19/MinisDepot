// url doesn't exist:
const notFound = (req, res, next) => {
  // returns an Error message with the url it hit and get the error
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// statusCode error handler
const errorHandler = (err,req,res,next) => {
  // gets the status code from the req if it is 200 the response will be a 500 or just sends back the code it got.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  // res.status we are adding the statusCode above to res.status
  res.status(statusCode)
  // sends back err message with stack only if it is not in production 
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export { notFound, errorHandler}