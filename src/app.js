const request = require('request');

async function GetEventDetails(action, settings) {
    let response = await createToken(action, settings)
    const token = response.body.data[0].token;
    const eventID = action.params.EVENT_ID;
    const url = `${settings.HOST}/api/v1/external/events/GetEventDetails?EVENT_ID=${eventID}`;
    const method = "GET";
    let options = {
        method: method,
        url: url
    } 
    //return await genericRestAPI(options, token);
    return await genericRestAPI(options, token);
}

function createToken(action, settings) {
    const URL = `${settings.HOST}/api/v1/access/tokens`
    let mheaders = {
        "Content-Type": "application/json",
        "X-LW-UAKS": `${settings.SECRET}`
    }
    let mbody = {
        "keyId": `${settings.KEY_ID}`,
        "expiryTime": 3600
    }
    const requestOptions = {
        url: URL,
        method: "POST",
        body: mbody,
        json: true,
        headers: mheaders
    };
    return new Promise((resolve, reject) => {
        request(requestOptions, function (err, response, body) {
            if (err) {
                return reject(err);
            }
            resolve(response);
        });
    })
}


//////////// HELPERS ////////////

async function genericRestAPI(options, token) {
    Object.assign (options,{
        'json':true,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    });
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) {
                return reject(err);
            }
            resolve(response.body);
        });
    });
}


module.exports = {
    GetEventDetails
}