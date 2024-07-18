// import jwt from "jsonwebtoken";

// const KEY = "jwtsecretkey"; // Make sure this key is the same as the one used in token generation

// const authMiddleware = (req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   }

//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     console.log("No authorization header set");
//     return res.status(401).json({ error: "No authorization header set" });
//   }

//   const authSegments = authHeader.split(" ");
//   if (authSegments.length !== 2 || authSegments[0] !== "Bearer") {
//     console.log("Invalid authorization header format");
//     return res.status(401).json({ error: "Invalid authorization header format" });
//   }

//   const authToken = authSegments[1];
//   console.log(`token received: ${authToken}`);
//   try {
//     const validatedToken = jwt.verify(authToken, KEY);
//     req.token = validatedToken;

//     if (!validatedToken.isAdmin) {
//       console.log("User is not admin");
//       return res.status(403).json({ error: "User is not admin" });
//     }

//     next();
//   } catch (error) {
//     console.log("Token validation error:", error);
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";

const KEY = "jwtsecretkey";

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header set" });
  }

  const authSegments = authHeader.split(" ");
  if (authSegments.length !== 2 || authSegments[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid authorization header format" });
  }

  const authToken = authSegments[1];
  try {
    const validatedToken = jwt.verify(authToken, KEY);
    req.token = validatedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.token && req.token.isAdmin) {
    return next();
  } else {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
};

export default authMiddleware;
