/* =========================================
   FITTRACK - STEPS JAVASCRIPT
========================================= */


/* =========================================
   DEFAULT STEPS
========================================= */

let steps = 7250;

const STEP_GOAL = 10000;


/* =========================================
   LOAD SAVED STEPS
========================================= */

const savedSteps =
    localStorage.getItem("todaySteps");


if (savedSteps !== null) {

    steps = Number(savedSteps);

}


/* =========================================
   UPDATE PAGE
========================================= */

function updateStepsPage() {

    const stepsValue =
        document.getElementById(
            "stepsValue"
        );


    const stepsProgress =
        document.getElementById(
            "stepsProgress"
        );


    const progressPercent =
        document.getElementById(
            "progressPercent"
        );


    /* Current Steps */

    if (stepsValue) {

        stepsValue.textContent =
            steps.toLocaleString();

    }


    /* Calculate Progress */

    let progress =
        (steps / STEP_GOAL) * 100;


    if (progress > 100) {

        progress = 100;

    }


    /* Progress Bar */

    if (stepsProgress) {

        stepsProgress.style.width =
            progress + "%";

    }


    /* Progress Percentage */

    if (progressPercent) {

        progressPercent.textContent =
            progress.toFixed(1) + "%";

    }

}


/* =========================================
   ADD STEPS
========================================= */

function addSteps(amount) {

    amount =
        Number(amount);


    if (
        !amount ||
        amount <= 0
    ) {

        showMessage(
            "Please enter a valid number of steps."
        );

        return;

    }


    steps += amount;


    /* Save */

    localStorage.setItem(
        "todaySteps",
        steps
    );


    /* Update */

    updateStepsPage();


    showMessage(
        "+" +
        amount.toLocaleString() +
        " steps added successfully! 👟"
    );

}


/* =========================================
   CUSTOM STEPS
========================================= */

function addCustomSteps() {

    const input =
        document.getElementById(
            "customSteps"
        );


    const amount =
        Number(input.value);


    if (
        !amount ||
        amount <= 0
    ) {

        showMessage(
            "Please enter valid steps."
        );

        return;

    }


    addSteps(amount);


    input.value = "";

}


/* =========================================
   SHOW MESSAGE
========================================= */

function showMessage(message) {

    const messageElement =
        document.getElementById(
            "message"
        );


    if (!messageElement) {

        return;

    }


    messageElement.textContent =
        message;


    clearTimeout(
        window.stepsMessageTimer
    );


    window.stepsMessageTimer =
        setTimeout(
            function() {

                messageElement.textContent =
                    "";

            },
            2500
        );

}


/* =========================================
   RESET STEPS
========================================= */

function resetSteps() {

    const confirmReset =
        confirm(
            "Reset today's steps to 7,250?"
        );


    if (!confirmReset) {

        return;

    }


    steps = 7250;


    localStorage.setItem(
        "todaySteps",
        steps
    );


    updateStepsPage();


    showMessage(
        "Today's steps have been reset. 🔄"
    );

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateStepsPage();

    }
);