
//dateformat 형태 (string 을 받아서 YYYYMMDD 형태로 변경)
export const dateFormat = (date) => {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join("");
    }

//dateformat(YYYYMMDD to YYYY-MM-DD)
export const dateBarFormat = (date) => {

    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    return date.length > 0 ? year + "-" + month + "-" + day : "";

}