import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addEvent, deleteEvent, getAllEvents, updateEvent } from "../controller/event.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/events", getAllEvents);
router.put('/events/:eventId', updateEvent);
router.post("/events", addEvent);
router.delete("/events/:eventId", deleteEvent);

export default router;
