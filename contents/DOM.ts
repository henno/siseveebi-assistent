export class DOM {
    // Get the id from a page string using regex to get the id of the user
    static async getTeacherId() {
        const foodMenuHtml = await fetch("https://siseveeb.voco.ee/toidu_menuu").then(res => res.text())
        // example data: $(document).ready(function(){page_data.previously_logged_user_id=28243;
        // match the id between the = and ;
        return parseInt(foodMenuHtml.match(/page_data.previously_logged_user_id=(.*?);/)[1])
    }

    static async getGroupName() {
        // Get group name from #main_container > div > div.col-xs-12.col-sm-9.col-md-10.col-lg-10.fluid-print > div > div.row > div.col-lg-12 > h4 > span:nth-child(1)
        const groupDiv: HTMLElement =  document.querySelector('#main_container > div > div.col-xs-12.col-sm-9.col-md-10.col-lg-10.fluid-print > div > div.row > div.col-lg-12 > h4 > span:nth-child(1)');
        return groupDiv.innerText;
    }

    static async getSubjectName() {
        // Get subject name from #main_container > div > div.col-xs-12.col-sm-9.col-md-10.col-lg-10.fluid-print > div > div.row > div.col-lg-12 > h4 > strong
           const subjectDiv: HTMLElement = document.querySelector('#main_container > div > div.col-xs-12.col-sm-9.col-md-10.col-lg-10.fluid-print > div > div.row > div.col-lg-12 > h4 > strong');
           return subjectDiv.innerText;
    }
}
