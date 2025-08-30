import { Router, Request, Response } from "express";
import { Webhook } from "svix";
import prisma from "../prisma";

export const webhookRouter = Router();

webhookRouter.post("/", async (req: Request, res: Response) => {
  const signingSecret = process.env.SIGNING_SECRET;
  if (!signingSecret) {
    res.json({
      msg: "error occured"
    })
    return;
  };

  const webhook = new Webhook(signingSecret);

  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.json({
      msg: "error occured"
    });
    return;
  }

  const body = JSON.stringify(req.body);
  try {
    const event: any = webhook.verify(body, {
      //@ts-ignore
      "svix-id": svix_id,
      //@ts-ignore
      "svix-timestamp": svix_timestamp,
      //@ts-ignore
      "svix-signature": svix_signature
    });
    if (event.type == "user.created") {
      await prisma.user.create({
        data: {
          id: event.data.id,
          name: event.data.username ? event.data.username : event.data.first_name + event.data.last_name,
          email: event.data.email_addresses[0].email_address,
          password: event.data.first_name + "dummy_password" + event.data.last_name
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      msg: "error occured"
    });
  }

  console.log(req.body);
  res.json({
    msg: "asdf"
  });
});
