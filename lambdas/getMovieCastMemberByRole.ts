import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = createDynamoDBDocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    console.log("Event: ", JSON.stringify(event));

    const { role, movieId } = event.pathParameters || {};

    if (!role || !movieId) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Missing required parameters: role or movieId" }),
      };
    }

    const queryCommandInput: QueryCommandInput = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: "movieId = :movieId AND crewRole = :crewRole",
      ExpressionAttributeValues: {
        ":movieId": parseInt(movieId),
        ":crewRole": role,
      },
    };

    const commandOutput = await ddbDocClient.send(new QueryCommand(queryCommandInput));

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ crewMembers: commandOutput.Items || [] }),
    };
  } catch (error) {
    console.error("Error: ", error);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

function createDynamoDBDocumentClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  return DynamoDBDocumentClient.from(ddbClient);
}
