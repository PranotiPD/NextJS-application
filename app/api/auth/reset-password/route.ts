import User from "@/models/User";
import connect from "@/utils/db";
import { NextRequest } from "next/server";
import { v4 as uuidv4} from "uuid";
import { sendResetPasswordEmail } from "@/lib/mail";

export const POST = async (request : NextRequest) => {
    await connect();

    //get mail
    const { email } = await request.json();

    //find user
    const user = await User.findOne({email})

    //if valid user
    if(user){
        //generate unique token for password reset
        const passwordResetToken = uuidv4();
        console.log("before email reset password saved to db");
        //send password reset email with token
        user.emailResetPassword = passwordResetToken;
        await user.save();
        console.log("email reset password saved to db");
        //send password reset email with token
        await sendResetPasswordEmail(email, passwordResetToken);

        return new Response(JSON.stringify({message : "Password reset link has been sent to you email"}), {
            status : 200,
            headers : {
                "Content-Type" : "application/json"
            },
        })
    } else {
        //send generic message
        return new Response(JSON.stringify({ message: 'If the email is associated with an account, a password reset link will be sent.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}