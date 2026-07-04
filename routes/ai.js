const express = require("express");
const router = express.Router();

const aiController = require("../controllers/aicontroller");

router.get("/planner", aiController.renderPlanner);
router.post("/planner", aiController.generateTrip);

module.exports = router;