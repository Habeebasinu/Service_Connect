import jwt from 'jsonwebtoken'

const Verifytoken = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    console.log("authHeader:", auth);

    if (!auth) {
      return res.status(401).json({ message: "Token missing" });
    }

   
    const token = auth.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = {
  id: decoded.userId,
  role: decoded.usertype
};


    console.log("decoded:", decoded);
    next();
  } catch (error) {
    console.log("verification failed:", error.message);
    return res.status(401).json({ message: "verification failed" });
  }
};

export default Verifytoken;
