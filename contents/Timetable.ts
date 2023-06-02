import {DOM} from "~contents/DOM";

const timetable = window.localStorage.getItem("assistent-timetable-data") || []
const lastUpdate = window.localStorage.getItem("assistent-timetable-data-last-update") || false

interface TimetableData {
    [key: string]: string;
}

interface TimetableDataElement {
    grupp: string;
    aine: string;
}

export class Timetable {

    static getAsync(teacherId: Promise<number>, groupName: String, subjectName: String) {
        return {
            "28243": {
                "VSo21": {
                    "dokumenteerib testi tulemused lähtudes dokumenteerimise standarditest": {
                        "2023-06-01": [
                            {
                                "tund": "4",
                                "algus": "11:55",
                                "lopp": "14:00",
                                "aine": "dokumenteerib testi tulemused lähtudes dokumenteerimise standarditest",
                                "grupp": "VSo21",
                                "opetaja": "Henno Täht",
                                "ruum": "Kopli A - A418 (Arvutiklass)"
                            },
                            {
                                "tund": "5",
                                "algus": "14:10",
                                "lopp": "15:40",
                                "aine": "dokumenteerib testi tulemused lähtudes dokumenteerimise standarditest",
                                "grupp": "VSo21",
                                "opetaja": "Henno Täht",
                                "ruum": "Kopli A - A418 (Arvutiklass)"
                            }
                        ]
                    }
                },
                "icon": "/common/destiny_content/icons/1e4b8d2b2b2b2b2b2b2b2b2b2b2b2b2.jpg",
                "tierType": 5
            }
        }
    }

    static getPreviousMondayFromDate(date) {
        date = Date.parse(date);
        // Validate date
        //if (Object.prototype.toString.call(date) !== '[object Date]') {
        //    throw new Error("Invalid date");
        //}
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }

    static getMondays(lastUpdate) {

        let firstMonday;
        const mondays = [];

        // Get today's date
        const today = new Date();

        // If last update is not set, get the start year from the page and calculate the first monday of the school year
        if (!lastUpdate) {

            // Get start year from a span element with class label-info (in 2022/2023 format):
            const startYear: string = (document.getElementsByClassName("label-info")[0] as HTMLElement).innerText;

            // Get the last monday of August in the start year
            firstMonday = this.getPreviousMondayFromDate(new Date(parseInt(startYear), 7, 31));

        } else {

            // Get monday before the last update
            firstMonday = this.getPreviousMondayFromDate(lastUpdate);
        }

        // Create array of mondays from the last update to today
        for (let d = new Date(firstMonday); d <= today; d.setDate(d.getDate() + 7)) {

            // Convert date to ISO string and push to mondays array, considering timezone offset
            mondays.push(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split("T")[0]);
        }
        return mondays;
    }

    static async fetchTimetableForWeekAsync(date) {
        // Get teacher ID from DOM
        const teacherId = await DOM.getTeacherId();
        const response = await fetch("https://siseveeb.voco.ee/veebilehe_andmed/tunniplaan?opetaja=" + teacherId + "&nadal=" + date, {
            method: "GET",
        });
        if (!response.ok) throw new Error("Failed to fetch timetable from server");
        const data = await response.json();
        if (!data["tunnid"]) throw new Error("Error fetching timetable from server: " + data);
        return this.restructureTimetableData(data["tunnid"]);
    }

    static restructureTimetableData(data: TimetableDataElement[]): TimetableData {
        if (!Array.isArray(data)) {
            return
        }
        debugger;
        return data.reduce((result: TimetableData, currentElement: TimetableDataElement) => {
            const { grupp, aine } = currentElement;
            if (!result[grupp]) {
                result[grupp] = {} as string;
            }
            if (!result[grupp][aine]) {
                result[grupp][aine] = [];
            }
            result[grupp][aine].push(currentElement);
            return result;
        }, {});
    }

    static getTimetableAsync() {

        let timetable = [];
        const mondayOfWeekToSyncFrom = localStorage.getItem("sv-assistant-timetable-monday-of-week-to-sync-from");

        if (mondayOfWeekToSyncFrom) {
            const timetableData = localStorage.getItem("sv-assistant-timetable");
            timetable = timetableData ? JSON.parse(timetableData) : [];
        }

        const mondays = this.getMondays(mondayOfWeekToSyncFrom);

        for (const monday of mondays) {
            const timetableOfaWeek = this.fetchTimetableForWeekAsync(monday);
            timetable = timetable.concat(timetableOfaWeek);
        }

        localStorage.setItem("sv-assistant-timetable", JSON.stringify(timetable));
        localStorage.setItem("sv-assistant-timetable-last-update", new Date().toISOString());

        return timetable;
    }
    /*
    async getExistingTimetable(existingLessons) {
        const groupName = await DOM.getGroupName();
        // Iterate over the timetable data for given group and given subject and find the lessons that are not yet in the diary
        for (const [subject, lessons] of Object.entries(existingLessons[groupName])) {
            console.log(`Processing subject ${subject}...`);

            // Iterate over the lessons for the current subject
            for (const lesson of lessons) {
                console.log(`Processing lesson ${lesson.day}...`);

                // Check if the lesson is already in the diary
                if (existingLessons.some(existingLesson => existingLesson.day === lesson.day && existingLesson.type === lesson.type)) {
                    console.log("Lesson already exists, skipping...");
                    continue;
                }

                // Add the lesson to the diary
                console.log("Adding lesson...");
                addLessonToSubject(subject, [lesson.day, lesson.amount, lesson.type]);
            }
        }
    }*/
    static nextWeekToSynchronize() {
        const lastUpdate = localStorage.getItem("sv-assistant-timetable-last-update");
        const mondays = this.getMondays(lastUpdate);
        const lastSynchronizedWeek = localStorage.getItem("sv-assistant-timetable-last-synchronized-week");
        if (!lastSynchronizedWeek) {
            return mondays[0];
        }
        const lastSynchronizedWeekIndex = mondays.indexOf(lastSynchronizedWeek);
        if (lastSynchronizedWeekIndex === -1) {
            return mondays[0];
        }
        return mondays[lastSynchronizedWeekIndex + 1];
    }

    static async getMissingEntriesAsync() {
        const timetable = this.getTimetableAsync();
        console.log(timetable);
        const lastSynchronizedWeek = localStorage.getItem("sv-assistant-timetable-last-synchronized-week");
        const nextWeek = this.nextWeekToSynchronize();
        const missingEntries = timetable.filter(lesson => lesson.day >= lastSynchronizedWeek && lesson.day <= nextWeek);
        localStorage.setItem("sv-assistant-timetable-last-synchronized-week", nextWeek);
        return missingEntries;
    }
}
