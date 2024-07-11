import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    emailToken: { type: String, default: null },
    emailResetPassword: { type: String, default: null },
    passwordResetTokenExpires: { type: Date, default: null }, // Field for token expiration
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);