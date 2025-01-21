import axios from 'axios';
import {describe, expect, it, test} from 'vitest'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

const PHONE_NUMBER_1 = "+91987654301";
const NAME_1 = 'testuser1';

describe("Signup endpoints", ()=>{
    it('Double Signup doesnt work', async () => {
        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
            number: PHONE_NUMBER_1,
        })
        
        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`,{
            number: PHONE_NUMBER_1,
            name: NAME_1,
            otp: "000000"
        })
        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).not.toBeNull();
        
        await expect(async()=>{
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                number: PHONE_NUMBER_1,
            });
        }).rejects.toThrowError();
    });
})


describe("Signin endpoints", ()=>{
    it('Signin works', async () => {
        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
            number: PHONE_NUMBER_1,
        })
        
        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signin/verify`,{
            number: PHONE_NUMBER_1,
            otp: "000000"
        })
        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).not.toBeNull();
        expect(response2.data.token).not.toBeNull();
    });

    it('Signin doesnt work for user who doesnt exists in db', async () => {
        await expect(async()=>{
            await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                number: PHONE_NUMBER_1+"123",
            });
        }).rejects.toThrowError();
    });
})