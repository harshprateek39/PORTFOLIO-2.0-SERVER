 export const sessionAuthChecker = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      // If session doesn't exist or user is not authenticated, return 401 Unauthorized
      res.status(401).json({ message: 'Unauthorized' ,success:false});
    }
  };
  
  