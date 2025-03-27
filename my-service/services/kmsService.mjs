import AWS from 'aws-sdk';

const kms = new AWS.KMS();

export async function encrypt(plaintext) {
  const params = {
    KeyId: '3a69fc4a-5133-4465-ad32-37b445f15a00',
    Plaintext: plaintext,
  };
  const data = await kms.encrypt(params).promise();
  return data.CiphertextBlob.toString('base64');
}
