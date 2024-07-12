import User from "@/models/User";
import connect from "@/utils/db";
import { randomBytes } from "crypto";
import { NextRequest } from "next/server"
import bcrypt from 'bcryptjs';
import { sendNewPasswordEmail } from "@/lib/mail";

export const GET = async (request : NextRequest) => {
    console.log("I am inside get request");
    const token = request.nextUrl.pathname.split('/').pop();
    await connect();

    //find user by emailResetPassword token and check 
    // if token has not expired

    const user = await User.findOne({
        emailResetPassword : token,
        $or : [
            { passwordResetTokenExpires : { $gt : new Date()}},
            { passwordResetTokenExpires : null},
        ]
    })
  
    if(user){
        // if user found generate new secure password
        const newPassword = generateNewPassword();

        //hash password before saving to db
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.emailResetPassword = null;
        user.passwordResetTokenExpires = undefined;
        await user.save();

        //send new password to user's email
        await sendNewPasswordEmail(user.email, newPassword);

        //return a response indication new password has been sent
        return new Response("Your new Password has been sent", {
            status : 200
        });
    } else {
        return new Response("Password reset token is invalid or has expired", {
            status : 400
        })
    }
}

function generateNewPassword(){
    return randomBytes(12).toString('hex');
}