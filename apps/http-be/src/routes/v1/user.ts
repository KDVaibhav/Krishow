import {client} from "@repo/db/client";
import {sign} from "jsonwebtoken"
import config from "../../config";
import {Router} from 'express';
import { sendMessage } from "../../utils/twilio";
import { getToken, verifyToken } from "../../utils/totp";


const router:Router = Router();

router.post('/signup', async (req, res)=>{
    const number = req.body.number;
    const totp = getToken(number, "AUTH");
    //send totp to phoneNumber

    const user = await client.user.upsert({
        where: {
            number
        },
        create:{
            number,
            name: ""
        },
        update:{

        }
    })
    if(config.NODE_ENV === "production"){
        //send otp to user
        try{
            await sendMessage(`Your otp for Signup into Krishow is ${totp}`, number)
        }catch(e){
            console.log(e);
            throw new Error("Couldn't send otp");
        }
            
    }
    res.json({
        id: user.id,
        message: "OTP sent successfully"
    })
});

router.post("/signup/verify", async (req, res)=>{
    const number = req.body.number;
    const name = req.body.name;
    if(!verifyToken(number, "AUTH", req.body.otp)){
        res.json({
            message: "Invalid OTP"
        })
        return;
    }
    const user = await client.user.update({
        where:{
            number,
        },
        data:{
            name,
            verified: true
        }
    })

    const token = sign({
        userId: user.id
    }, config.JWT_PASSWORD)

    res.json({
        token
    })
});

router.post("/signin", async(req, res)=>{
    const number = req.body.number;
    const totp = getToken(number, "AUTH");
    //send totp to phoneNumber
    try {

        const user = await client.user.findFirstOrThrow({
            where: {
                number
            }
        });

        if (process.env.NODE_ENV === "production") {
            try {
                await sendMessage(`Your otp for logging into Krishow is ${totp}`, number)
            } catch (e) {
                res.status(500).json({
                    message: "Could not send otp"
                })
                return
            }
        }

        res.json({
            id: user.id,
            message: "Otp sent successfully"
        })
    } catch (e) {
        res.status(411).json({
            message: "User invalid"
        })
    }
})

router.post("/signin/verify", async (req, res)=>{
    const number = req.body.number;
    if(!verifyToken(number, "AUTH", req.body.otp)){
        res.json({
            message: "Invalid OTP"
        })
        return;
    }
    const user = await client.user.findFirstOrThrow({
        where:{
            number,
        },
    })

    const token = sign({
        userId: user.id
    }, config.JWT_PASSWORD)
    
    res.json({
        token
    })
});

export default router;