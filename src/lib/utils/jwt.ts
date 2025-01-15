import jwt, {Secret} from "jsonwebtoken";
import {JwtPayload} from "@/types";


const SECRET: Secret = process.env.JWT_SECRET

export const signToken = (payload: JwtPayload, expiresIn = '1h'):string => {
    return jwt.sign(payload, SECRET, {expiresIn});
}

export const verifyToken = (token: string): JwtPayload | string => {
    try {
        return jwt.verify(token, SECRET) as JwtPayload;
    } catch(error) {
        return "Token Verification failed";
    }
};


export const decodeToken = (token: string): JwtPayload | string => {
    try {
        return jwt.decode(token) as JwtPayload;
    } catch(error) {
        return "Decode failed";
    }
};