import { Users } from "../../../models/userModel";
import dotenv from 'dotenv';
import * as argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";
import { gfs } from "../../../database/mongoConfig";
dotenv.config();

const UserService = {

    async loginUser(userData): Promise<any> {
      const user: any = await Users.findOne({email: userData.email})
      if (user) {
        const passwordVerified = await argon2.verify(user.password,userData.password)
        if (passwordVerified) {
          return {
            status: 200,
            message: "Login Successfull",
          };
        }
        else{
          return {
            status: 401,
            message: "Wrong Password! Please try again."
          }
        }
      }
      else {
        return {
          status: 400,
          message: "No User exists with this email."
        }
      }
    },
    async getUsers(): Promise<any> {
        try {
            const image = await gfs.files.findOne({_id: 1})
            const users = await Users.find({});
            console.log(users)
            return users
          } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
          }
        },
    async signUpUser(userData): Promise<any> {
        try { 
            const user: any = await Users.findOne({email: userData.email})
            if (user) {
              return {
                status: 400,
                message: "User Already exists with this email"
              }
            }
            else {
              const hashedPassword = await argon2.hash(userData.password)
              const newUser: any = new Users({username: userData.username, email: userData.email, password: hashedPassword});
              await newUser.save();
              return {
                status: 200,
                message: "Signup Successfull. Redirect to Login Page"
              };
            }
        } catch (error) {
          console.log(error);
        }
      },
    // async editUser(req: Request, res: Response): Promise<void> {
    //   try {
    //     await Users.findOneAndUpdate({email:req.body.email},{name:req.body.name});
    //     res.status(200).send("User updated"); 
    //   } catch (e) {
    //     console.error(e);
    //     res.status(500).send({ error: 'Internal Server Error'});
    //   }
    // },
    // async deleteUser(req: Request, res: Response): Promise<void> {
    //   try {
    //     await Users.findOneAndDelete({email:req.body.email});
    //     res.status(200);
    //     } catch (e) {
    //     console.log(e);
    //     res.status(500).send({ error: 'Internal Server Error !' });
    //   }
    // },
    // async deleteUsers(req: Request, res: Response): Promise<void> {
    //   await Users.deleteMany({})
    //   res.send("Users Deleted")
    // }
}

export default UserService;