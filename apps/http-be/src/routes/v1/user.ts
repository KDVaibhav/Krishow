import {generateKey, generateToken, verifyToken} from  "authenticator";
import {client} from "@repo/db/client";
import {sign} from "jsonwebtoken"
import { JWT_PASSWORD } from "../../config.js";
import {Router} from 'express';
import { sendMessage } from "../../utils/twilio.js";


const router:Router = Router();

router.post('/signup', async (req, res)=>{
    const number = req.body.phoneNumber;
    const totp = generateToken(number + "SIGNUP");
    //send totp to phoneNumber

    const userId = await client.user.upsert({
        where: {
            number
        },
        create:{
            number,
        },
        update:{

        }
    })
    if(process.env.NODE_ENV === "production"){
        //send otp to user
        try{
            await sendMessage(`Your otp for logging into Krishow is ${totp}`, number)
        }catch(e){
            console.log(e);
            throw new Error("Error sending otp");
        }
            
    }
    res.json({
        id: "1"
    })
});

router.post("/signup/verify", async (req, res)=>{
    const number = req.body.number;
    const name = req.body.name;
    if(!verifyToken(number + "SIGNUP", req.body.otp)){
        res.json({
            message: "Invalid OTP"
        })
        return;
    }
    const userId = await client.user.update({
        where:{
            number,
        },
        data:{
            name,
            verified: true
        }
    })

    const token = sign({
        userId
    }, JWT_PASSWORD)
    res.json({
        token
    })
});

export default router;