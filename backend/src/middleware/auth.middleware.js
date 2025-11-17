import jwt from "jsonwebtoken";
import {db} from "../libs/db.js"

// export const authMiddleware = async (req , res , next)=>{

//     if (req.headers["x-bypass-auth"] === "true") {
//     req.user = { id: "dev-user", role: "ADMIN" };
//     return next();
//   }
//     try {
//         const token = req.cookies.jwt;

//         if(!token){
//             return res.status(401).json({
//                 message:"Unauthorized - No token provided"
//             })
//         }

//         let decoded;

//         try {
//             decoded = jwt.verify(token , process.env.JWT_SECRET);
//         } catch (error) {
//             return res.status(401).json({
//                 message:"Unauthorized - Invalid token"
//             })
//         }

//         const user = await db.user.findUnique({
//             where:{
//                 id:decoded.id
//             },
//             select:{
//                 id:true,
//                 image:true,
//                 name:true,
//                 email:true,
//                 role:true
//             }
//         });


//         if(!user){
//             return res.status(404).json({message:"User not found"});
//         }

//         req.user = user;
//         next();

//     } catch (error) {
//         console.error("Error authenticating user:", error);
//         res.status(500).json({message:"Error authenticating user"});
//     }
// }



// export const checkAdmin = async(req,res,next)=>{
//     try {
//         const userId =  req.user.id;
//         const user = await db.user.findUnique({
//             where:{
//                 id : userId
//             },
//             select:{
//                 role:true
//             }
//         })

//         if(!user || user.role !== "ADMIN"){
//             return res.status(403).json({
//                 message:"Acess denied - Admins only"
//             })

//             next();
//         }
//     } catch (error) {
//         console.error("Error checking admin role",error);
//         res.status(500).json({message:"Error checcking admin role"});

       
//     }
// }




export const authMiddleware = async (req, res, next) => {
  try {
    // accept token from cookie OR Authorization header OR x-access-token
    const token =
      (req.cookies && req.cookies.jwt) ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
      req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, image: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: "Error authenticating user" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    // ensure req.user exists
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - No user" });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied - Admins only" });
    }

    return next();
  } catch (error) {
    console.error("Error checking admin role:", error);
    return res.status(500).json({ message: "Error checking admin role" });
  }
};
