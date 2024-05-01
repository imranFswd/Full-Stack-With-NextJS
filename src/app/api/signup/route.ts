

import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/email/sendVerificationEmail";


export async function POST(request: Request) {

    await dbConnect()


    try {

        const { username, email, password } = await request.json()


        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })


        if (existingUserVerifiedByUsername) {

            return Response.json({
                success: false,
                message: "Username is already taken !!!"
            },{
                status: 400
            })
            
        }


        const existingUserByEmail = await UserModel.findOne({ email })


        const verifyOtpCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString()


        if (existingUserByEmail) {
            
            if (existingUserByEmail.isVerified) {
                
                return Response.json({
                    success:false,
                    message: "User already exist with this email !!!"
                }, {
                    status: 400
                })


            } else {

                const hashedPassword = await bcrypt.hash(password, 10)

                
                existingUserByEmail.password = hashedPassword;
                
                existingUserByEmail.verifyOtpCode = verifyOtpCode;

                existingUserByEmail.verifyOtpCodeExpiry = new Date(
                    Date.now() + 3600000
                )


                await existingUserByEmail.save()

                
            }


        } else {

            const hashedPassword = await bcrypt.hash(password, 10)


            const expiryDate = new Date()

            expiryDate.setHours(expiryDate.getHours() + 1)


            const newUser = await new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyOtpCode,
                verifyOtpCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })


            await newUser.save()
            
        }


        /*
         * verification email send
         */

        const emailResponse = await sendVerificationEmail(
            username,
            email,
            verifyOtpCode
        )


        console.log(`---------------------------------------------------------------- \n- emailResponse: \n---------------------------------------------------------------- \n- ${emailResponse} \n----------------------------------------------------------------`);


        if (!emailResponse.success) {
            
            return Response.json({
                success:false,
                message: emailResponse.message
            }, {
                status: 500
            })

        }


        return Response.json({
            success:true,
            message: "User registered successFully !!! Please verify your email"
        }, {
            status: 201
        })

        
    } catch (error) {
        
        console.error(`---------------------------------------------------------------- \n- Error registering user !!! \n---------------------------------------------------------------- \n- ${error} \n----------------------------------------------------------------`);


        return Response.json({
            success: false,
            message: "Error registering user !!!"
        },{
            status: 500
        })

    }

}

