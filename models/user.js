import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Please provide an username"],
    match: [
      /^(?=.{1,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: { 
    type: String 
},
});

//check if user model already exists, if not create one. this route gets called repeatedly so checking is required
const User = models.User || model("User", userSchema); 

export default User;
