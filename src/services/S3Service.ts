import AWS, { S3, AWSError } from 'aws-sdk';

const region = 'eu-central-1'

class S3Service {
  #s3: S3 | null = null;
  #bucketName: string | null = null
  constructor() {
    AWS.config.update({ region });
  }

  async #validateCredentials(): Promise<boolean> {
    if (!this.#bucketName || !this.#s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

    try {
      // Test the credentials by making a simple API request to AWS
      const params: S3.ListObjectsV2Request = {
        Bucket: this.#bucketName,
        MaxKeys: 1, // Fetch only one object
      };

      await this.#s3.listObjectsV2(params).promise();

      return true; // Credentials are valid
    } catch (error) {
      console.log(error)
      console.error('Error occurred while validating AWS credentials:', error as AWSError);
      return false; // Credentials are invalid
    }
  }

  async configureS3(accessKeyId: string, secretAccessKey: string, bucketName: string): Promise<void> {
    AWS.config.update({
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
    this.#s3 = new AWS.S3({ region });
    this.#bucketName = bucketName;
    await this.#validateCredentials();
  }

  async listObjects(prefix?: string): Promise<S3.Object[]> {
    if (!this.#bucketName || !this.#s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

    const params: S3.ListObjectsV2Request = {
      Bucket: this.#bucketName,
      Prefix: prefix,
    };

    try {
      const response = await this.#s3.listObjectsV2(params).promise();
      console.log(response)
      return response?.Contents || [];
    } catch (error) {
      console.error('Error occurred while listing objects:', error as AWSError);
      return [];
    }
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
console.log(s3Service)
export { s3Service }
