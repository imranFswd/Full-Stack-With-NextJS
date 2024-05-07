

import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/models/UserModel";


export async function POST( request: Request ) {

    await dbConnect()


    try {

        const { username, otpCode } = await request.json()


        const decodedUsername = decodeURIComponent(username)

        const user = UserModel.findOne({
            username: decodedUsername
        })


        if (!user) {
            
            return Response.json({
                success: false,
                message: "User not found !!!"
            }, {
                status: 500
            })
        }


        const isVerifyOtpCodeValid = (
            user.verifyOtpCode === otpCode
        )


        const isVerifyOtpCodeNotExpired = (
            new Date( user.verifyOtpCodeExpiry ) > new Date()
        )


        if ( isVerifyOtpCodeValid && isVerifyOtpCodeNotExpired ) {

            user.isVerified = true


            await user.save()


            return Response.json({
                success: true,
                message: "User verified successfully !!!"
            }, {
                status: 200
            })


        } else if (!isVerifyOtpCodeNotExpired) {

            return Response.json({
                success: false,
                message: "Verification code has expired !!! Please signup again to get a new OTP code."
            }, {
                status: 400
            })


        } else {

            return Response.json({
                success: false,
                message: "Incorrect verification code !!!"
            }, {
                status: 400
            })
        }

        
    } catch (error) {
        
        console.error(`---------------------------------------------------------------- \n- Error verifying user !!! \n----------------------------------------------------------------\n- ${error} \n----------------------------------------------------------------`);


        return Response.json({
            success: false,
            message: "Error verifying user !!!"
        }, {
            status: 500
        })
    }
}

