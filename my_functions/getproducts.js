const fetch = require('node-fetch');

exports.handler = async function() {
    const headers = {
            'Square-Version': '2020-09-23',
            'Authorization': process.env.SandBoxBearer, 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'mode': 'cors'
    }
    try {
        const result = await fetch(`${process.env.SandBoxURL}/catalog/list?types=ITEM`, {
            headers: headers
        })

        const formattedResult = await result.json();
        return {
            statusCode: 200,
            body: JSON.stringify({result: formattedResult})
        }
    } catch(err) {
        return {
            statusCode: 502,
            body: JSON.stringify({error: err})
        }
    }
}