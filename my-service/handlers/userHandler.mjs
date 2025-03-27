import { getUser, saveUser } from '../services/dynamoService.mjs';
import { encrypt } from '../services/kmsService.mjs';

// Handler to retrieve a user by username
const _getUser = async (event) => {
  const username = event.pathParameters.username;
  
  try {
    const user = await getUser(username);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving user', error }),
    };
  }
};

export { _getUser as getUser };

// Handler to create a new user
export async function createUser(event) {
  const { email, username } = JSON.parse(event.body);
  
  try {
    const encryptedEmail = await encrypt(email);
    await saveUser(encryptedEmail, username);
    
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User created' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating user', error }),
    };
  }
}
