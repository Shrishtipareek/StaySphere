const form = document.querySelector(".planner-form");

if (form) {
    form.addEventListener("submit", () => {
        document.getElementById("loadingScreen").style.display = "flex";
    });
}