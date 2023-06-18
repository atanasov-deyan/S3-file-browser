import AWS, { S3, AWSError } from 'aws-sdk';

const region = 'eu-central-1'

class S3Service {
  private s3: S3 | null = null;
  private bucketName: string | null = null
  constructor() {
    AWS.config.update({ region });
  }

  public async validateCredentials(): Promise<boolean> {
    if (!this.bucketName || !this.s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

    try {
      // Test the credentials by making a simple API request to AWS
      const params: S3.ListObjectsV2Request = {
        Bucket: this.bucketName,
        MaxKeys: 1, // Fetch only one object
      };

      await this.s3.listObjectsV2(params).promise();

      return true; // Credentials are valid
    } catch (error) {
      console.log(error)
      console.error('Error occurred while validating AWS credentials:', error as AWSError);
      return false; // Credentials are invalid
    }
  }

  public async configureS3(accessKeyId: string, secretAccessKey: string, bucketName: string): void {
    AWS.config.update({
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
    this.s3 = new AWS.S3({ region });
    this.bucketName = bucketName;
    await this.validateCredentials();
  }

  public async listObjects(prefix?: string): Promise<S3.Object[]> {
    if (!this.bucketName || !this.s3) {
      throw new Error('S3 service not configured. Please call configureS3 method first.');
    }

    const params: S3.ListObjectsV2Request = {
      Bucket: this.bucketName,
      Prefix: prefix,
    };

    try {
      const response = await this.s3.listObjectsV2(params).promise();
      console.log(response)
      return response?.Contents || [];
    } catch (error) {
      console.error('Error occurred while listing objects:', error as AWSError);
      return [];
    }
  }
}

const s3Service = new S3Service();
export { s3Service }
