const mongoose = require("mongoose");

const tripPlanSchema = new mongoose.Schema({

    destination: {
        type: String,
        required: true,
    },

    duration: {
        type: String,
        required: true,
    },

    estimatedBudget: {
        type: String,
    },

    summary: {
        type: String,
    },

    days: [
        {
            day: Number,

            title: String,

            activities: [String],
        },
    ],

    packingList: [String],

    restaurants: [String],

    hiddenGems: [String],

    travelTips: [String],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("TripPlan", tripPlanSchema);