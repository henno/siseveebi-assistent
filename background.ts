export {}
console.log(
    "Live now; make now always the most precious time. Now will never come again."
)

// Define an event listener to handle incoming messages from content scripts or other extension components
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${month}-${day}-${year}`;
    console.log(currentDate); // "17-6-2022"

    // Handle incoming messages and perform appropriate actions
    const timetable = await fetch("https://siseveeb.voco.ee/veebilehe_andmed/tunniplaan?opetaja="+ message +"&nadal=" + currentDate).then(res => res.text())
    console.log(timetable)
    // Example usage of chrome.storage to store and retrieve data
    chrome.storage.local.set({ "timetable": timetable }, () => {
        console.log('Data stored successfully');
    });
    console.log('2')
    // Return a response to the content script or other extension component
    sendResponse("Message received!")

});
