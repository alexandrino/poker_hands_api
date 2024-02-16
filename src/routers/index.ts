import { Router } from "express";
import { pokerController } from "../controllers/poker";

const router: Router = Router();

router.post("/", pokerController.hand);

export { router };
