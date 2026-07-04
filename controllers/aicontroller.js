const TripPlan = require("../models/TripPlan");
const geminiService = require("../services/geminiService");
// We'll use this later when saving to MongoDB
// const TripPlan = require("../models/TripPlan");

/**
 * Render AI Planner Page
 */
module.exports.renderPlanner = (req, res) => {
    res.render("ai/planner");
};

/**
 * Generate AI Itinerary
 */
module.exports.generateTrip = async (req, res) => {

    console.log("generateTrip called");

    try {

        const itinerary = await geminiService.generateItinerary(req.body);

        console.log("Rendering result page");

        res.render("ai/result", {
            itinerary
        });

    } catch (err) {

        console.log(err);

        console.log("Redirecting");

        req.flash("error", err.message);

        return res.redirect("/ai/planner");
    }

};

