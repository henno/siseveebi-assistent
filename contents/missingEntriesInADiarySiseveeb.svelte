<script context="module" lang="ts">
    import type {
        PlasmoCSConfig,
        PlasmoGetInlineAnchor,
        PlasmoMountShadowHost
    } from "plasmo"

    export const config: PlasmoCSConfig = {
        matches: ["https://siseveeb.voco.ee/kutseope/oppetoo/paevik/taitmine*"]
    }

    console.log(1)
    export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
        document.querySelector("#daybook_done_info_panel_all > div.panel-body")

    export const mountShadowHost: PlasmoMountShadowHost = ({anchor, shadowHost}) => {
        anchor!.element!.insertBefore(shadowHost!, anchor!.element!.firstChild)
    }
</script>

<script>
    console.log(2)
    let count = 0
    let increment = () => count++
</script>

<div>
    <span style="color: red;">{count}</span>
    <button on:click={increment}>A lie is a very poor way to say hello</button>
</div>
