import { NextApiRequest, NextApiResponse } from "next";
import UserController from "./userController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  console.log("Here");
  const { action } = req.query

  switch (method) {
    case "GET":

      switch (action) {
        case "all":
          const users = UserController.getUsers(req,res);
          res.status(200).json({
            data: users,
          });
          break;
        default:
          res.status(400).json({ error: "Invalid action parameter" });
      }
      break;
    case "POST":
      
      switch(action) {
        case "signup":
          const signUpResponse = UserController.signUpUser(req,res)
          res.json({ signUpResponse })
      }
    
      
    default:
      res.status(405).end(); // Method Not Allowed
  }
};
// import type { NextApiRequest, NextApiResponse } from 'next'
 
// type ResponseData = {
//   message: string
// }
 
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }