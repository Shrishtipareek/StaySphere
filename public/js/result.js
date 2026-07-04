// Hide success toast after 4 seconds
const toast = document.getElementById("successToast");

if (toast) {

    setTimeout(() => {

        toast.style.display = "none";

    }, 4000);

}

// Share Trip
const shareBtn = document.getElementById("shareTrip");

if (shareBtn) {

    shareBtn.addEventListener("click", async () => {

        if (navigator.share) {

            await navigator.share({

                title: "My StaySphere AI Trip",

                text: "Check out my AI generated itinerary!",

                url: window.location.href

            });

        } else {

            navigator.clipboard.writeText(window.location.href);

            alert("Trip link copied to clipboard!");

        }

    });

}

// PDF (placeholder)
const pdfBtn = document.getElementById("downloadPDF");

if (pdfBtn) {

    pdfBtn.addEventListener("click", () => {

        alert("PDF feature coming soon!");

    });

}

// Save (placeholder)
const saveBtn = document.getElementById("saveTrip");

if (saveBtn) {

    saveBtn.addEventListener("click", () => {

        alert("Trip saved successfully!");

    });

}