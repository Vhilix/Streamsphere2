import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '../config';

// Initialize S3 client
let s3Client: S3Client | null = null;

if (config.aws.accessKeyId && config.aws.secretAccessKey) {
    s3Client = new S3Client({
        region: config.aws.region,
        credentials: {
            accessKeyId: config.aws.accessKeyId,
            secretAccessKey: config.aws.secretAccessKey,
        },
    });
}

/**
 * Upload a file to S3
 * @param file - File buffer
 * @param key - S3 object key (path)
 * @param contentType - MIME type
 * @returns Public URL of the uploaded file
 */
export const uploadToS3 = async (
    file: Buffer,
    key: string,
    contentType: string
): Promise<string> => {
    if (!s3Client) {
        throw new Error('S3 client not initialized. Check AWS credentials.');
    }

    const command = new PutObjectCommand({
        Bucket: config.aws.s3Bucket,
        Key: key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read', // Make file publicly accessible
    });

    await s3Client.send(command);

    // Return public URL
    return `${config.aws.s3BaseUrl}/${key}`;
};

/**
 * Delete a file from S3
 * @param key - S3 object key (path)
 */
export const deleteFromS3 = async (key: string): Promise<void> => {
    if (!s3Client) {
        throw new Error('S3 client not initialized. Check AWS credentials.');
    }

    const command = new DeleteObjectCommand({
        Bucket: config.aws.s3Bucket,
        Key: key,
    });

    await s3Client.send(command);
};

/**
 * Generate a presigned URL for temporary access
 * @param key - S3 object key (path)
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Presigned URL
 */
export const getPresignedUrl = async (
    key: string,
    expiresIn: number = 3600
): Promise<string> => {
    if (!s3Client) {
        throw new Error('S3 client not initialized. Check AWS credentials.');
    }

    const command = new PutObjectCommand({
        Bucket: config.aws.s3Bucket,
        Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
};

/**
 * Get S3 URL for a given key
 * @param key - S3 object key (path)
 * @returns Public URL
 */
export const getS3Url = (key: string): string => {
    return `${config.aws.s3BaseUrl}/${key}`;
};

/**
 * Generate poster URL for a title
 * @param titleId - Title ID
 * @returns S3 URL for poster
 */
export const getPosterUrl = (titleId: string): string => {
    return getS3Url(`posters/${titleId}.jpg`);
};

/**
 * Generate backdrop URL for a title
 * @param titleId - Title ID
 * @returns S3 URL for backdrop
 */
export const getBackdropUrl = (titleId: string): string => {
    return getS3Url(`backdrops/${titleId}.jpg`);
};

/**
 * Generate profile picture URL for a user
 * @param userId - User ID
 * @returns S3 URL for profile picture
 */
export const getProfilePictureUrl = (userId: string): string => {
    return getS3Url(`profiles/${userId}.jpg`);
};

/**
 * Check if S3 is configured
 */
export const isS3Configured = (): boolean => {
    return s3Client !== null;
};
