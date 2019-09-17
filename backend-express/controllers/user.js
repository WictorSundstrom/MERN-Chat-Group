// Returns user back to front-end
const getUsername = async (req, res, next) => {
    
    return res.status(200).send(req.user)
}

module.exports = {
    getUsername: getUsername
  };