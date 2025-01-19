import {generateKey, generateToken, verifyToken} from  "authenticator";

import {Router} from 'express';


const router:Router = Router();

router.post('/signup', (req, res)=>{
    const phoneNumber = req.body.phoneNumber;
    const totp = generateToken(phoneNumber + "SIGNUP");
    //send totp to phoneNumber

    res.json({
        id: "1"
    })
});

router.post("/signup/verify", (req, res)=>{
    const phoneNumber = req.body.phoneNumber;
    if(!verifyToken(phoneNumber + "SIGNUP", req.body.otp)){
        res.json({
            message: "Invalid OTP"
        })
        return;
    }
    res.json({
        
    })
});

export default router;