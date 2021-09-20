const moment = require('moment')

const getTimeIntervals = (startString, endString, timeInterval) => {
    const start = moment(startString, 'YYYY-MM-DD hh:mm a');
    const end = moment(endString, 'YYYY-MM-DD hh:mm a');

    start.minutes(Math.floor(start.minutes() / 60) * 60);
    const result = [];
    const current = moment(start);

    while (current <= end) {
        result.push(current.format('YYYY-MM-DD HH:mm'));
        current.add(timeInterval * 60, 'minutes');
    }

    return result;
}

const generateChartData = (temperatureDetails, timeIntervalArray) => {
    let chartObj = {}
    let firstIndex = 0
    let secondIndex = 1
    let temperatureDetailsIndex = 0
    for (let index = 0; index < timeIntervalArray.length; index++) {
        while (temperatureDetails[temperatureDetailsIndex].time >= new Date(timeIntervalArray[firstIndex]) && temperatureDetails[temperatureDetailsIndex].time < new Date(timeIntervalArray[secondIndex])) {
            if (chartObj.hasOwnProperty(timeIntervalArray[firstIndex])) {
                chartObj[timeIntervalArray[firstIndex]] = chartObj[timeIntervalArray[firstIndex]] + 1
            } else {
                chartObj[timeIntervalArray[firstIndex]] = 1
            }
            temperatureDetailsIndex++
        }
        firstIndex++
        secondIndex++
    }
    return chartObj
}

module.exports = {
    getTimeIntervals,
    generateChartData
}