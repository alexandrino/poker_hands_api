import { Router } from "express";
import { pokerController } from "../controllers/poker";

const router: Router = Router();

router.get("/", pokerController.home);

export { router };
