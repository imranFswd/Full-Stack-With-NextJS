

import { Messages } from "@/models/UserModel"


export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<Messages>
}

