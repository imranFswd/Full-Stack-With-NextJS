

import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}


const connection: ConnectionObject = {}


async function dbConnect(): Promise<void> {

    if (connection.isConnected) {

        console.log(`---------------------------------------------------------------- \n- Already database is conneted !!! \n----------------------------------------------------------------`);
        

        return
    }

    
    try {

        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        // console.log(`---------------------------------------------------------------- \n- DB: \n----------------------------------------------------------------\n- ${db} \n----------------------------------------------------------------`);

        // console.log(`---------------------------------------------------------------- \n- db.connections: \n----------------------------------------------------------------\n- ${db.connections} \n----------------------------------------------------------------`);
        

        connection.isConnected = db.connections[0].readyState


        console.log(`---------------------------------------------------------------- \n- MongoDB connected successfully !!! \n----------------------------------------------------------------`);
        
        
    } catch (error) {
        
        console.log(`---------------------------------------------------------------- \n- MongoDB connetion failed !!! \n----------------------------------------------------------------\n- ${error} \n----------------------------------------------------------------`);


        process.exit(1)
    }
}


export default dbConnect

