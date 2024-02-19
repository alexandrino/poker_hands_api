import { Router } from "express";
import { pokerController } from "../controllers/poker";
import { healthController } from "../controllers/health";

const router: Router = Router();

router.post("/hand", pokerController.hand);
router.get("/health", healthController.check);

export { router };
