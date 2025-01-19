import axios from 'axios';
import {describe, expect, it, test} from 'vitest'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'

const PHONE_NUMBER_1 = 'testuser1';
const NAME_1 = 'testuser2';
const PASSWORD_1 = '123random1';
const PASSWORD_2 = '123random2';

describe("Signup endpoints", ()=>{
    it('Double signup doesnt work', async () => {
        const response1 = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            number: PHONE_NUMBER_1,
        })
        
        const response2 = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            name: NAME_1,
            otp: "000000"
        })
        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).not.toBeNull();
        
        expect(async()=>{
            await axios.post('$(BACKEND_URL)/api/v1/signup', {
                number: PHONE_NUMBER_1,
            });
        }).toThrow();
    });


    it('Double Signup doesnt work', async()=>{

    })

})