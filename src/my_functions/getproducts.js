exports.handler = async function() {
    const result = await fetch(process.env.SandBoxURL, {
        headers: {
            'Square-Version': '2020-09-23',
            'Authorization': process.env.SandBoxBearer, 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'X-Requested-with',
            'mode': 'cors'
        },
    })

    return {
        statusCode: result.status,
        body: JSON.stringify(result.object)
    }
}