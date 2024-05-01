

import NextAuth, { DefaultSession } from "next-auth";


declare module "next-auth" {

    interface User {
        username?: string;
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
    }


    interface Session {

        user: {
            username?: string;
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
        } & DefaultSession["user"]
    }
}


declare module "next-auth/jwt" {

    interface JWT {
        username?: string;
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
    }
}

