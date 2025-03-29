import moment from "moment";

export const formatBirth = (date) => {
    return moment(date).format('ll');
};

export const formatSchedule = (date) => {
    return moment(date).utc().format('lll');
};

export const formatDateTimeLocal = (date) => {
    return moment.utc(date).format("YYYY-MM-DDTHH:mm");
};
