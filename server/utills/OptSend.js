import 'dotenv/config';
import fetch from 'node-fetch';

export const sendOtp = async (phone, otp) => {

    const numberWithCountryCode = `88${phone}` 

    const url = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.BULKSMSBD_API_KEY}&senderid=${process.env.BULKSMSBD_SENDER_ID}&number=${numberWithCountryCode}&message=Welcome to Grow Care Health. Your verification code is: ${otp}&type=text`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to send SMS. Status: ${response.status}`);
        }
        
        const responseText = await response.text();

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (error) {
            throw new Error("Received an invalid response from BulkSMSBD");
        }

        if (data.response_code !== 202) {
            throw new Error(`OTP sending failed: ${data.error_message || 'Unknown error'}`);
        }

        return data;
    } catch (error) {
        console.error("Error sending SMS:", error.message);
        throw error;
    }
};
