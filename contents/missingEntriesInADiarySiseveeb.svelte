<script context="module" lang="ts">
    import type {
        PlasmoCSConfig,
        PlasmoGetInlineAnchor,
        PlasmoMountShadowHost,
        PlasmoGetStyle
    } from "plasmo"
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



</script>

<script>
    console.log(2)
    let missingEntries = [
        {day: "2021-09-01", hours: 2, type: "S"},
    ]

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
