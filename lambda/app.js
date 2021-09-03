const aws = require('aws-sdk');

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {

    const flowName = event.flowName || process.env.flowName;
    console.log("Starting AppFlow: "+flowName);
    try {
       const appflow = new aws.Appflow({ region: "us-east-1"});
       const ret = await appflow.startFlow({flowName: flowName}).promise();

       console.log(ret)
        response = {
            'statusCode': 200,
            'body': ret
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
