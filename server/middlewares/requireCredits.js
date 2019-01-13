module.exports = (req, res, next) => {
  //check if user have any credits//
  if(req.user.credits < 1){
    //if not, throw error//
    return res.status(403).send("You don't have enough credits");
  }

  next();
}
