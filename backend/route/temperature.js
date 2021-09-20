const express = require("express");
const path = require('path');
const router = express.Router();
const { csvToJson, hexToData, isHexaNumber } = require('../util/HexDecoder')
const { getTimeIntervals, generateChartData } = require('../util/genarateChartUtils')

const FILE_PATH = path.join(__dirname, '../assets/dataset.csv');
let temperatureDetails = [];
(async () => {
    temperatureDetails = await csvToJson(FILE_PATH)
})();

/**
 * @getAllDetails
 * Note => Paginated Data would take some time to do from backend and the front end 
 */
router.get("/", async (req, res) => {
    res.status(200).send({
        success: true,
        data: temperatureDetails,
        details: "Data Retrived successfully",
    });
});

/**
 * @AddDate
 * body : hexPayload
 */
router.post("/", async (req, res) => {
    const { hexPayload } = req.body
    if (!isHexaNumber(hexPayload) || hexPayload.length != 10) {
        return res.send({
            success: false,
            details: "Invalid Data",
        })
    }

    let newHex = hexToData({
        time: new Date(),
        hexPayload: hexPayload
    })
    temperatureDetails.push(newHex)

    res.status(200).send({
        success: true,
        value: newHex,
        details: "Data Retrived successfully",
    });
});


/**
 * @GetChartByTimeIntervel
 * params : timeIntervel
 */
router.get("/chart/:timeIntervel", async (req, res) => {

    const { timeIntervel } = req.params
    const timeIntervalArray = getTimeIntervals(temperatureDetails[1].time, temperatureDetails[temperatureDetails.length - 1].time, timeIntervel)
    let chatData = generateChartData(temperatureDetails, timeIntervalArray)

    res.status(200).send({
        success: true,
        data: {
            data: Object.values(chatData),
            labels: Object.keys(chatData)
        },
        details: "Chart Data Retrived successfully",
    });
});
module.exports = router;