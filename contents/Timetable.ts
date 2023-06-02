const timetable = window.localstorage.getItem("assistent-timetable-data") || []
const lastUpdate = window.localstorage.getItem("assistent-timetable-data-last-update") || false
export class Timetable {

    static getAsync(teacherId: Number, groupName: String, subjectName: String) {
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
}
