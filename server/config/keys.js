if(process.env.NODE_ENV === 'production'){
  //we are in production env//
  module.exports = require('./prod');
}else{
  //we are in development env//
  module.exports = require('./dev');
}
