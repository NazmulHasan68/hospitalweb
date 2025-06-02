import express from "express";
import {
  createTravelHelp,
  getAllTravelHelps,
  getTravelHelpById,
  updateTravelHelp,
  deleteTravelHelp,
  searchTravelHelps
} from "../../controllers/travel/medical_travel_controller.js";

const router = express.Router();

router.post("/", createTravelHelp);
router.get("/", getAllTravelHelps);
router.get("/search", searchTravelHelps);
router.get("/:id", getTravelHelpById);
router.patch("/:id", updateTravelHelp);
router.delete("/:id", deleteTravelHelp);

export default router;
