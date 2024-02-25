import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";
import jwt from "jsonwebtoken"

class JwtService{
    public static generateJwtToken(user:User){
        const payload:JWTUser={
            id:user?.id,
            email:user?.email
        }

        const JWTSecret="$123ad45kai";
        const token =jwt.sign(payload,JWTSecret);

        return token;
    }
};

export default JwtService