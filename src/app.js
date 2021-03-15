const fetch = require('node-fetch');

async function GetEventDetails(action, settings) {
    const host = (settings.HOST || '').trim();
    const keyId = (settings.KEY_ID || '').trim();
    const secret = (settings.SECRET || '').trim();
    const eventID = (action.params.EVENT_ID || '').trim();
    if (!host || !keyId || !secret || !eventID){ // check if all required parameters were provided
        throw "not all required parameters and settings were provided";
    }

    const token = await getToken(host, keyId, secret);
    
    const url = `https://${host}.lacework.net/api/v1/external/events/GetEventDetails?EVENT_ID=${eventID}`;
    const fetchParams = { 'headers': { 'Authorization': `Bearer ${token}` } };

    return await fetchJson(url, fetchParams);
}

///// Helpers

async function getToken(host, keyId, secret) {
    const url = `${host}/api/v1/access/tokens`;
    const fetchParams = {
        method: 'post',
        body: JSON.stringify({
            keyId: keyId,
            expiryTime: 3600
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-LW-UAKS': secret
        }
    }
    const body = await fetchJson(url, fetchParams);
    
    return body.data[0].token;
}

async function fetchJson(url, fetchParams){
    const response = await fetch(url, fetchParams);
    return response.json();
}

///// Exports

module.exports = { GetEventDetails }