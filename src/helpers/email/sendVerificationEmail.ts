

import { resend } from "@/lib/email/resend"
import VerificationEmail from "../../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse"


export async function sendVerificationEmail (
    username: string,
    email: string,
    verifyOtpCode: string
): Promise<ApiResponse> {

    try {

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subjcet: "imranFswd || Verification Code",
            react: VerificationEmail({
                username,
                otp: verifyOtpCode
            })
        })

        return {
            success: true,
            message: "Verification email send successfully !!!"
        }

        
    } catch (emailError) {
        
        console.error(`---------------------------------------------------------------- \n- Error sending verification email !!! \n---------------------------------------------------------------- \n- ${emailError} \n----------------------------------------------------------------`);


        return {
            success: false,
            message: "Failed to send verification email !!!"
        }

    }
}


