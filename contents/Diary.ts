export class Diary {
    /**
     * Get the existing lessons from the diary page
     * @returns {*[{day: string, amount: number, type: string}]}
     */
    static getExistingLessonsAsync(givenLessonTable) {

        // get the table
        console.log("Retrieved table:", givenLessonTable);

        // get the rows from the table body
        const rows = givenLessonTable.getElementsByTagName('tbody')[0].rows;
        console.log("Retrieved rows:", rows);

        const jsonArray = []; // array to store each row data

        for (let i = 0; i < rows.length; i++) {
            console.log("Processing row", i + 1);

            const jsonRow = {}; // object to store each cell data

            // get the cells from the current row
            const cells = rows[i].cells;
            console.log("Retrieved cells:", cells);

            // convert date format from DD.MM.YYYY to YYYY-MM-DD
            const [day, month, year] = cells[0].innerText.split(".");
            console.log("Split date components:", day, month, year);
            const formattedDate = `${year}-${month}-${day}`;
            console.log("Formatted date:", formattedDate);

            // get type from row class name, the last character represents the type
            const type = rows[i].className.slice(-1);
            console.log("Type:", type);

            // populate jsonRow with data
            jsonRow["day"] = formattedDate;
            jsonRow["amount"] = parseInt(cells[2].innerText, 10);
            jsonRow["type"] = type;
            console.log("Row data:", jsonRow);

            // push the row data to jsonArray
            jsonArray.push(jsonRow);
        }

        console.log("Converted JSON array:", jsonArray);
        return jsonArray;
    }
}
