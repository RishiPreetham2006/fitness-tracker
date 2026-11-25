/* FitTrack daily activity history helper.
   Keeps one snapshot per calendar day in localStorage. */
(function () {
    "use strict";
    const HISTORY_KEY = "weeklyHistory";
    const metricKeys = new Set(["todaySteps", "todayWater", "todayCalories", "todaySleep", "workoutHistory"]);

    function readNumber(key, fallback) {
        const value = Number(localStorage.getItem(key));
        return Number.isFinite(value) && localStorage.getItem(key) !== null ? value : fallback;
    }

    function recordDailySnapshot() {
        try {
            const today = new Date();
            const dateKey = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0")
            ].join("-");
            const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
            const workouts = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
            const entry = {
                date: dateKey,
                day: today.toLocaleDateString(undefined, { weekday: "short" }),
                steps: readNumber("todaySteps", 7250),
                calories: readNumber("todayCalories", 1850),
                water: readNumber("todayWater", 5),
                sleep: readNumber("todaySleep", 7.5),
                workouts: workouts.filter(item => item.date === today.toLocaleDateString()).length
            };
            const index = history.findIndex(item => item.date === dateKey);
            if (index >= 0) history[index] = entry;
            else history.push(entry);
            history.sort((a, b) => a.date.localeCompare(b.date));
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-7)));
        } catch (error) {
            console.warn("FitTrack could not update weekly history:", error);
        }
    }

    window.recordDailySnapshot = recordDailySnapshot;

    // Record once when a page opens.
    document.addEventListener("DOMContentLoaded", recordDailySnapshot);

    // Keep snapshots in sync when any existing page saves activity.
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
        originalSetItem.call(this, key, value);
        if (metricKeys.has(String(key)) && !window.__fitTrackSnapshotBusy) {
            window.__fitTrackSnapshotBusy = true;
            try { recordDailySnapshot(); }
            finally { window.__fitTrackSnapshotBusy = false; }
        }
    };
})();