import jwt from 'jsonwebtoken';

export const generateToken=(user)=>{

    let token = jwt.sign(
        {_id:user._id, name:user.name, status:user.status},
        process.env.JWT_SECURING,
        {expiresIn: "10m"}
        );

        return token;
}