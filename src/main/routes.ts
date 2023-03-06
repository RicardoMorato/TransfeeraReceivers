import { Router, Request, Response } from "express";
import {
  makeCreateReceiverController,
  makeListAllReceiversController,
  makeListReceiversByFieldController,
} from "@/main/factories";
import { adaptRoute } from "@/main/adapters";

const router = Router();

router.get("/health", (req: Request, response: Response) =>
  response.json({
    status: "Up",
    requestIp: req.ip,
  })
);

router.post("/receivers", adaptRoute(makeCreateReceiverController()));
router.get("/receivers", adaptRoute(makeListAllReceiversController()));
router.get(
  "/receivers/search",
  adaptRoute(makeListReceiversByFieldController())
);

export { router };
