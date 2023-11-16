import { NextApiRequest, NextApiResponse } from "next";
import UserService from "./userService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { action } = req.query

  switch (method) {
    case "GET":

      switch (action) {
        case "all":
          const users = await UserService.getUsers();
          res.status(200).json({
            data: users,
          });
          break;
        default:
          res.status(400).json({ error: "Invalid action parameter" });
          break
      }
      break

    case "POST":
      switch(action) {
        case "signup":
          const signUpResponse = await UserService.signUpUser(req.body)
          res.json({ signUpResponse })
          break
        
        case "login":
          const logInResponse = await UserService.loginUser(req.body)
          res.json({ logInResponse })
          break
      }
      break
    default:
      res.status(405).end();
      break
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