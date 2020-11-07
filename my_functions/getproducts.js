const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;

const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SandBoxBearer;

if(process.env.Environment.toLowerCase() === "development") {
    defaultClient.basePath = process.env.SandBoxURL;
}

exports.handler = async function() {
    const api = new SquareConnect.CatalogApi();

    try {
        const result = await api.listCatalog({types: "ITEM,IMAGE"});
        return {
            statusCode: 200,
            body: JSON.stringify({result})
        }
    } catch(err) {
        console.log(err)
        return {
            statusCode: 502,
            body: JSON.stringify({error: err})
        }
    }
}