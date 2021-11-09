import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAuthentication } from "./middlewares/ensureAuthenticatetion";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import "dotenv/config";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle)
router.post("/messages", ensureAuthentication, new CreateMessageController().handle)
router.get("/profile", ensureAuthentication, new ProfileUserController().handle)
router.get("/messages/last3", new GetLast3MessagesController().handle)

router.get("/github", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})
router.get("/signin/callback", (req, res) => {
    const { code } = req.query;
    res.json({ code })
})

export { router }