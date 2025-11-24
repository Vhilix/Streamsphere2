export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-me',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
        refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
    cdn: {
        baseUrl: process.env.CDN_BASE_URL || 'https://cdn.example.com',
    },
    aws: {
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        s3Bucket: process.env.AWS_S3_BUCKET || 'netflix-mvp-images',
        s3BaseUrl: process.env.S3_BASE_URL || '',
    },
};

// Construct S3 base URL if not provided
if (!config.aws.s3BaseUrl && config.aws.s3Bucket) {
    config.aws.s3BaseUrl = `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com`;
}
