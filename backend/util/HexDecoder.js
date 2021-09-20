const fs = require('fs');
const parse = require('csv-parse')
const moment = require('moment')

const csvToJson = async (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) {
                reject(error)
            } else {
                parse(data, { columns: true }, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows.map(item => {
                            return hexToData(item)
                        }))
                    }
                })
            }
        })
    })
}

const hexToData = (data) => {
    return {
        ...data,
        temperature: parseInt(data.hexPayload.slice(0, 2), 16) - 128,
        bigEndianMessage: data.hexPayload.slice(2),
        time: new Date(data.time),
        date: moment(new Date(data.time)).format('MM/DD/YYYY')
    }
}

const isHexaNumber = (s) => {
    const regExp = /^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/;
    return typeof s === "string" && regExp.test(s);
};


module.exports = {
    csvToJson, hexToData, isHexaNumber
}