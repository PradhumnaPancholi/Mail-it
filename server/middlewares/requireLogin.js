module.exports = (req, res, next) => {
  //check if user is logged in//
  if(!req.user){
    //if not return error//
    return res.status(401).send("You must log in!!!");
  }
  //else proceed forward//
  next()
}
