
    const fetch = require('node-fetch');
    const SquareConnect = require('square-connect');
    const defaultClient = SquareConnect.ApiClient.instance;

    const oauth2 = defaultClient.authentications['oauth2'];
    oauth2.accessToken = process.env.SandBoxBearer;

    if(process.env.Environment.toLowerCase() === "development") {
        defaultClient.basePath = "https://connect.squareupsandbox.com";
    }

    exports.handler = async function(event, context) {

        const body = JSON.parse(event.body);
        const api = new SquareConnect.PaymentsApi();
        const request_body = {
            source_id: body.nonce,
            location_id: body.locationID,
            amount_money: {
                amount: 100,
                currency: "GBP"
            },
            note: "1 x chocco cup cake extraordinaire",
            idempotency_key: body.idempotency_key
        };

        try {
            const response = await api.createPayment(request_body);
            return {
                statusCode: 200,
                body: JSON.stringify(response)
            }
        } catch(_error) {
            return {
                statusCode: 500,
                body: _error.response.text
            }
        }

        // do not submit payment form until nonce is returned
        // get nonce
    }