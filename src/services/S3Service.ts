import AWS, { S3, AWSError } from 'aws-sdk';
import { ListObjectsV2Output } from 'aws-sdk/clients/s3';
import { AWSCredentials } from '../definitions/AWSCredentials';

class S3Service {
  #s3: S3 | null = null;
  #bucketName: string | null = null;
  #region = 'eu-central-1';
  constructor() {
    AWS.config.update({
      region: this.#region,
      maxRetries: 1,
    });
  }
  async #validateCredentials(): Promise<void> {
    if (!this.#bucketName || !this.#s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

      // Test the credentials by making a simple API request to AWS
    const params: S3.ListObjectsV2Request = {
      Bucket: this.#bucketName,
      MaxKeys: 1, // Fetch only one object

    };
      const res = await this.#s3.listObjectsV2(params).promise();
      console.log(res);

  }

  async configureS3(credentials: AWSCredentials): Promise<void> {
    const { accessKeyId, secretAccessKey, bucketName } = credentials;

    AWS.config.update({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    this.#s3 = new AWS.S3({ region: this.#region });
    this.#bucketName = bucketName;
    await this.#validateCredentials();
  }

  async listObjects(prefix?: string): Promise<ListObjectsV2Output | AWSError> {
    if (!this.#bucketName || !this.#s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

    const params: S3.ListObjectsV2Request = {
      Bucket: this.#bucketName,
      Prefix: prefix,
    };

    return await this.#s3.listObjectsV2(params).promise();

  }

  async createObject(key: string, content: string): Promise<void> {
    // todo: move to a validator?
    if (!this.#bucketName || !this.#s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

    const params: S3.PutObjectRequest = {
      Bucket: this.#bucketName,
      Key: key,
      Body: content,
    };

    try {
      await this.#s3.putObject(params).promise();
      console.log('Object created successfully');
    } catch (error) {
      console.error('Error occurred while creating object:', error);
    }
  }

  async deleteObject(key: string): Promise<void> {
    if (!this.#bucketName || !this.#s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

    const params: S3.DeleteObjectRequest = {
      Bucket: this.#bucketName,
      Key: key,
    };

    try {
      await this.#s3.deleteObject(params).promise();
      console.log('Object deleted successfully');
    } catch (error) {
      console.error('Error occurred while deleting object:', error);
    }
  }
}

const s3Service = new S3Service();

export { s3Service };
