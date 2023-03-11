import React from 'react';

import AWS from "aws-sdk";

const {REACT_APP_REGION, REACT_APP_SECRET, REACT_APP_ACCESS_KEY} = process.env;

AWS.config.update({
    accessKeyId:REACT_APP_ACCESS_KEY,
    secretAccessKey:REACT_APP_SECRET,
    region:REACT_APP_REGION
});

const dynamoDB = new AWS.DynamoDB({apiVersion:'2012-08-10'});

const useScan = () => {

    const getAllKeys = async () => {
        const params = {
            ProjectionExpression: "wordFamily",
            TableName: "Words"
        };
        const {Items} = await dynamoDB.scan(params).promise();
        const keys = Items.map(item => {
            return item.wordFamily['S'];
        })
        return [...new Set(keys)].sort();
    }

    return {getAllKeys}
};

export default useScan;
