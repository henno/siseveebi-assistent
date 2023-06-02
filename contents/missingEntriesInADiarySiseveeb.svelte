<script context="module" lang="ts">
    import type {
        PlasmoCSConfig,
        PlasmoGetInlineAnchor,
        PlasmoMountShadowHost,
        PlasmoGetStyle
    } from "plasmo"
    import {Timetable} from "~contents/Timetable";
    import {Diary} from "~contents/Diary";

    export const getStyle: PlasmoGetStyle = () => {
        const style = document.createElement("style")
        style.textContent = `
    dt {
        font-weight: bold;
        line-height: 1.5;
        box-sizing: border-box;
        display: block;
        font-size: 13px;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        color: #333;
        background-color: #fff;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
  `
        return style
    }


    export const config: PlasmoCSConfig = {
        matches: ["https://siseveeb.voco.ee/kutseope/oppetoo/paevik/taitmine*"]
    }

    console.log(1)
    export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
        document.querySelector("#daybook_done_info_panel_all > div.panel-body")


    export const mountShadowHost: PlasmoMountShadowHost = ({
                                                               shadowHost,
                                                               anchor,
                                                               observer
                                                           }) => {
        anchor.element.appendChild(shadowHost)
        observer.disconnect() // OPTIONAL DEMO: stop the observer as needed
    }

    export let foo = 'bar'

    const timetableData = Timetable.getAsync(teacherId, groupName, subjectName)
    const givenLessonData = Diary.getExistingLessonsAsync(document.getElementById("given_lesson_table"))


</script>

<script>
    export let anchor;
    let missingEntries = [
        {day: "2021-09-01", hours: 2, type: "S"},
    ]

    console.log(foo)

    import { onMount } from 'svelte';

    // Get the id from a page string using regex to get the id of the user
    function getId(fetchId) {
        // example data: $(document).ready(function(){page_data.previously_logged_user_id=28243;
        // match the id between the = and the ;
        return fetchId.match(/page_data.previously_logged_user_id=(.*?);/)[1]
    }

    onMount(async () => {
        const fetchId = await fetch("https://siseveeb.voco.ee/toidu_menuu").then(res => res.text())
        // Do something with the fetched data
        const idMatch = getId(fetchId)
        console.log(idMatch)
        localStorage.setItem("id", idMatch);
        // Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'local')
        // chrome.storage.local.get(['id'], (result) => {

        console.log('3')

        // Define a function to send a message to the background script
        function sendMessageToBackground(message) {
            chrome.runtime.sendMessage(message, (response) => {
                // Handle the response from the background script if needed
                console.log('Response from background:', response);
            });
        }

        // Example usage of sending a message to the background script
        const message = {
            data: fetchId,
        };
        sendMessageToBackground(message);
    });
</script>

<div>
    <h1>Päevikust puuduvad tunnid:</h1>
    <table class="table table-bordered">
        <thead>
        <tr>
            <th>Kuupäev</th>
            <th>Tunnid</th>
            <th>Tüüp</th>
        </tr>
        </thead>
        <tbody>
        {#each missingEntries as missingEntry, i}
            <tr>
                <td>{missingEntry.day}</td>
                <td>{missingEntry.hours}</td>
                <td>{missingEntry.type}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
