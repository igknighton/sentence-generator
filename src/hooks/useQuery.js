import React from 'react';
import AWS from "aws-sdk";

const {REACT_APP_REGION, REACT_APP_SECRET, REACT_APP_ACCESS_KEY} = process.env;

AWS.config.update({
    accessKeyId:REACT_APP_ACCESS_KEY,
    secretAccessKey:REACT_APP_SECRET,
    region:REACT_APP_REGION
});


const dynamoDB = new AWS.DynamoDB({apiVersion:'2012-08-10'});

const useQuery = () => {
    const TableName = 'Sentences';
    const query = async (word,limit= 0)=> {
        try {
            let params = {
                TableName,
                ExpressionAttributeValues: {
                    ":word": {
                        S: word
                    }
                },
                KeyConditionExpression: "wordFamily = :word"
            };
            if (limit > 0) params = {...params,Limit: limit}
            return await dynamoDB.query(params).promise();
        } catch (e) {
            console.error("Error: ",e);
        }

    }

    return {query}
};

export default useQuery;
