import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const getUser = async (username) => {
  const params = {
    TableName: 'UserTable',
    Key: { username },
  };
  
  try {
    const result = await dynamoDb.get(params).promise();
    return result.Item || null; // Return null if no item is found
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
};

export const saveUser = async (email, username) => {
  const params = {
    TableName: 'UserTable',
    Item: { email, username },
  };
  
  try {
    await dynamoDb.put(params).promise();
    return { success: true };
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Error saving user");
  }
};
