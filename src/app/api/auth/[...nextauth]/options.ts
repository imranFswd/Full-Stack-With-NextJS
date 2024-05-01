

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/models/UserModel";
import dbConnect from "@/lib/db/dbConnect";
import bcrypt from "bcryptjs"


export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials: any): Promise<any> {
                

                await dbConnect()


                try {

                    const user = await UserModel.findOne({
                        $or: [
                            {
                                username: credentials.identifier
                            },
                            {
                                email: credentials.identifier
                            }
                        ]
                    })


                    if (!user) {

                        throw new Error("No user found with this email !!!")
                    }
                    
                    
                    if (!user.isVerified) {
                        
                        throw new Error("Please verify your account before login !!!")
                    }


                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )


                    if (isPasswordCorrect) {

                        return user

                    } else {

                        throw new Error("Incorrect password !!!")
                    }

                    
                } catch (error: any) {
                    
                    throw new Error(error)
                }
            },
        })
    ],
    pages: {
        signIn: "/signin"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {

        async session({ session, token }) {

            if (token) {
                session.user.username = token.username;
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }


            return session
        },

        async jwt({ token, user }) {

            if (user) {

                token.username = user.username;
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }


            return token
        }
    }

}

