import moment from "moment";

export const formatBirth = (date) => {
    return moment(date).format('ll')
}

export const formatSchedule = (date) => {
    return moment(date).format('lll')
}