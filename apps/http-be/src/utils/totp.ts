import { generateToken } from "authenticator";
import config from "../config";
import {verifyToken as verifyTokenLib} from "authenticator"

type TokenType = "AUTH" | "ADMIN_AUTH";

export function getToken(number: string, type: TokenType){
    return generateToken(number + type + config.TOTP_SECRET);
}


export function verifyToken(number:string, type: TokenType, otp: string){
    return verifyTokenLib(number + type + config.TOTP_SECRET , otp )
}