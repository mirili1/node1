import jwt from 'jsonwebtoken';

export const simpleAuth=(req,res,next)=>{
    let token=req.headers["token"];
    if(!token){
       return res.status(403).send("Missing token, please sign in again");
    }
    try{
          req.user= jwt.verify(token,process.env.JWT_SECURING);
          next();
    }
    catch{
        res.status(401);
        throw new Error("this token isn't authorized");
    }
}
export const adminAuth=(req,res,next)=>{
    let token=req.headers["token"];
    if(!token){
        res.status(403).send("Missing token, please sign in again");  
    }
    try{
          let user= jwt.verify(token,process.env.JWT_SECURING);
          if(user.status=="ADMIN"){
          req.user=user;
          next();
        }
        else{
            return res.status(403).send("You are not authorized");
        }
    }
    catch{
        res.status(401);
        throw new Error("this token isn't authorized");
    }
}