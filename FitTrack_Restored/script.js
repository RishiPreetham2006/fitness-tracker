/* =========================================
   FITTRACK JAVASCRIPT
========================================= */


/* =========================================
   LOGIN / PAGE SECURITY
========================================= */

function checkUserLogin() {

    const loggedIn =
        localStorage.getItem("loggedIn");

    const userRole =
        localStorage.getItem("userRole");

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();


    /* USER PAGE SECURITY */

    if (currentPage === "user.html") {

        if (
            loggedIn !== "true" ||
            userRole !== "user"
        ) {

            window.location.href =
                "login.html";

            return false;
        }
    }


    /* ADMIN PAGE SECURITY */

    if (currentPage === "admin.html") {

        if (
            loggedIn !== "true" ||
            userRole !== "admin"
        ) {

            window.location.href =
                "login.html";

            return false;
        }
    }

    return true;
}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    window.location.href =
        "login.html";
}


/* =========================================
   GET LOGGED-IN USER
========================================= */

function getLoggedInUser() {

    return {
        email:
            localStorage.getItem("userEmail"),

        role:
            localStorage.getItem("userRole"),

        loggedIn:
            localStorage.getItem("loggedIn")
    };
}


/* =========================================
   DEFAULT FITNESS DATA
========================================= */

let steps = 7250;

let calories = 1850;

let water = 5;

let sleep = 7.5;


/* =========================================
   LOAD SAVED DATA
========================================= */

const savedSteps =
    localStorage.getItem("todaySteps");

const savedWater =
    localStorage.getItem("todayWater");

const savedCalories =
    localStorage.getItem("todayCalories");

const savedSleep =
    localStorage.getItem("todaySleep");


if (savedSteps !== null) {

    steps =
        Number(savedSteps);

}


if (savedWater !== null) {

    water =
        Number(savedWater);

}


if (savedCalories !== null) {

    calories =
        Number(savedCalories);

}


if (savedSleep !== null) {

    sleep =
        Number(savedSleep);

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    const stepsValue =
        document.getElementById(
            "stepsValue"
        );

    const caloriesValue =
        document.getElementById(
            "caloriesValue"
        );

    const waterValue =
        document.getElementById(
            "waterValue"
        );

    const sleepValue =
        document.getElementById(
            "sleepValue"
        );


    /* Steps */

    if (stepsValue) {

        stepsValue.textContent =
            steps.toLocaleString();

    }


    /* Calories */

    if (caloriesValue) {

        caloriesValue.textContent =
            calories.toLocaleString();

    }


    /* Water */

    if (waterValue) {

        waterValue.textContent =
            water;

    }


    /* Sleep */

    if (sleepValue) {

        sleepValue.textContent =
            sleep + " hrs";

    }


    /* =====================================
       STEPS PROGRESS
    ===================================== */

    const stepsProgress =
        document.getElementById(
            "stepsProgress"
        );

    if (stepsProgress) {

        let progress =
            (steps / 10000) * 100;

        if (progress > 100) {

            progress = 100;

        }

        stepsProgress.style.width =
            progress + "%";

    }


    /* =====================================
       CALORIES PROGRESS
    ===================================== */

    const calorieProgress =
        document.getElementById(
            "calorieProgress"
        );

    if (calorieProgress) {

        let progress =
            (calories / 2500) * 100;

        if (progress > 100) {

            progress = 100;

        }

        calorieProgress.style.width =
            progress + "%";

    }


    /* =====================================
       WATER PROGRESS
    ===================================== */

    const waterProgress =
        document.getElementById(
            "waterProgress"
        );

    if (waterProgress) {

        let progress =
            (water / 8) * 100;

        if (progress > 100) {

            progress = 100;

        }

        waterProgress.style.width =
            progress + "%";

    }


    /* =====================================
       SLEEP PROGRESS
    ===================================== */

    const sleepProgress =
        document.getElementById(
            "sleepProgress"
        );

    if (sleepProgress) {

        let progress =
            (sleep / 8) * 100;

        if (progress > 100) {

            progress = 100;

        }

        sleepProgress.style.width =
            progress + "%";

    }

}


/* =========================================
   ADD STEPS
========================================= */

function addSteps() {

    steps += 500;

    localStorage.setItem(
        "todaySteps",
        steps
    );

    updateDashboard();

}


/* =========================================
   ADD WATER
========================================= */

function addWater() {

    if (water < 8) {

        water += 1;

    }

    localStorage.setItem(
        "todayWater",
        water
    );

    updateDashboard();

}


/* =========================================
   ADD CALORIES
========================================= */

function addCalories() {

    calories += 100;

    localStorage.setItem(
        "todayCalories",
        calories
    );

    updateDashboard();

}


/* =========================================
   ADD SLEEP
========================================= */

function addSleep() {

    if (sleep < 8) {

        sleep += 0.5;

    }

    localStorage.setItem(
        "todaySleep",
        sleep
    );

    updateDashboard();

}


/* =========================================
   ADD WORKOUT
========================================= */

function addWorkout(
    workoutName,
    workoutCalories
) {

    calories +=
        Number(workoutCalories);


    localStorage.setItem(
        "todayCalories",
        calories
    );


    /* SAVE WORKOUT HISTORY */

    let workoutHistory =
        JSON.parse(
            localStorage.getItem(
                "workoutHistory"
            )
        ) || [];


    workoutHistory.push({

        name:
            workoutName,

        calories:
            Number(workoutCalories),

        date:
            new Date().toLocaleDateString()

    });


    localStorage.setItem(
        "workoutHistory",
        JSON.stringify(
            workoutHistory
        )
    );


    updateDashboard();

    loadWorkoutHistory();


    alert(
        workoutName +
        " workout added successfully! 💪"
    );

}


/* =========================================
   RESET DATA
========================================= */

function resetData() {

    steps = 7250;

    calories = 1850;

    water = 5;

    sleep = 7.5;


    localStorage.removeItem(
        "todaySteps"
    );

    localStorage.removeItem(
        "todayWater"
    );

    localStorage.removeItem(
        "todayCalories"
    );

    localStorage.removeItem(
        "todaySleep"
    );

    localStorage.removeItem(
        "workoutHistory"
    );


    updateDashboard();

    loadWorkoutHistory();

    if (typeof window.recordDailySnapshot === "function") {
        window.recordDailySnapshot();
    }

    alert(
        "Today's data has been reset! 🔄"
    );

}


/* =========================================
   BMI CALCULATOR
========================================= */

function calculateBMI() {

    const height =
        parseFloat(
            document.getElementById(
                "height"
            ).value
        );


    const weight =
        parseFloat(
            document.getElementById(
                "weight"
            ).value
        );


    if (
        !height ||
        !weight ||
        height <= 0 ||
        weight <= 0
    ) {

        document.getElementById(
            "bmiMessage"
        ).textContent =
            "Please enter valid height and weight.";

        return;

    }


    const heightInMeters =
        height / 100;


    const bmi =
        weight /
        (
            heightInMeters *
            heightInMeters
        );


    const bmiNumber =
        document.getElementById(
            "bmiNumber"
        );


    const bmiMessage =
        document.getElementById(
            "bmiMessage"
        );


    if (bmiNumber) {

        bmiNumber.textContent =
            bmi.toFixed(1);

    }


    let message = "";


    if (bmi < 18.5) {

        message =
            "Underweight";

    }

    else if (bmi < 25) {

        message =
            "Normal weight";

    }

    else if (bmi < 30) {

        message =
            "Overweight";

    }

    else {

        message =
            "Obesity";

    }


    if (bmiMessage) {

        bmiMessage.textContent =
            message;

    }

}


/* =========================================
   SCROLL TO SECTION
========================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.scrollIntoView({

            behavior: "smooth"

        });

    }

}


/* =========================================
   LOAD WORKOUT HISTORY
========================================= */

function loadWorkoutHistory() {

    const workoutList =
        document.getElementById(
            "workoutList"
        );


    if (!workoutList) {

        return;

    }


    const workoutHistory =
        JSON.parse(
            localStorage.getItem(
                "workoutHistory"
            )
        ) || [];


    workoutList.innerHTML = "";


    if (
        workoutHistory.length === 0
    ) {

        workoutList.innerHTML =
            "<li>No workouts completed yet.</li>";

        return;

    }


    workoutHistory.forEach(
        function(workout) {

            const newWorkout =
                document.createElement(
                    "li"
                );


            newWorkout.innerHTML =
                workout.name +
                "<span>" +
                workout.calories +
                " kcal</span>";


            workoutList.appendChild(
                newWorkout
            );

        }
    );

}


/* =========================================
   DISPLAY USER EMAIL
========================================= */

function displayUserInformation() {

    const userName = localStorage.getItem("userName") || "Fitness Member";
    const nameElements = document.querySelectorAll("#userName, .user-name");
    nameElements.forEach(function(element) { element.textContent = userName; });

    const userEmail =
        localStorage.getItem(
            "userEmail"
        );


    const emailElements =
        document.querySelectorAll(
            "#userEmailDisplay, .user-email"
        );


    emailElements.forEach(
        function(element) {

            if (userEmail) {

                element.textContent =
                    userEmail;

            }

        }
    );

}


/* =========================================
   DISPLAY ADMIN INFORMATION
========================================= */

function displayAdminInformation() {

    const userEmail =
        localStorage.getItem(
            "userEmail"
        );


    const adminEmail =
        document.getElementById(
            "adminEmail"
        );


    if (
        adminEmail &&
        userEmail
    ) {

        adminEmail.textContent =
            userEmail;

    }

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* Check User/Admin security */

        checkUserLogin();


        /* Update fitness dashboard */

        updateDashboard();


        /* Load workouts */

        loadWorkoutHistory();


        /* Display user information */

        displayUserInformation();


        /* Display admin information */

        displayAdminInformation();

    }
);