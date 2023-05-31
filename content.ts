import type {PlasmoCSConfig} from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://siseveeb.voco.ee/kutseope/oppetoo/paevik*"],
    all_frames: true
}
console.log('1')

window.addEventListener("load", async () => {
    let timetable = localStorage.getItem("timetable")
    console.log(timetable)
    console.log('2')
})
// Define a function to send a message to the background script
function sendMessageToBackground(message: any) {
    chrome.runtime.sendMessage(message, (response) => {
        // Handle the response from the background script if needed
        console.log('Response from background:', response);
    });
}

// Example usage of sending a message to the background script
const message = {
    data: '28243',
};

sendMessageToBackground(message);
