#!/usr/bin/env node

/**
 * Script to upload sample images to S3
 * 
 * Usage:
 *   node scripts/upload-to-s3.js
 * 
 * Prerequisites:
 *   1. Set AWS credentials in .env file
 *   2. Create S3 bucket
 *   3. Place images in ./sample-images/ folder
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'netflix-mvp-images';

async function uploadFile(filePath, s3Key) {
    try {
        const fileContent = readFileSync(filePath);
        const contentType = filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')
            ? 'image/jpeg'
            : filePath.endsWith('.png')
                ? 'image/png'
                : 'application/octet-stream';

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: s3Key,
            Body: fileContent,
            ContentType: contentType,
            ACL: 'public-read',
        });

        await s3Client.send(command);
        console.log(`✅ Uploaded: ${s3Key}`);
    } catch (error) {
        console.error(`❌ Failed to upload ${s3Key}:`, error.message);
    }
}

async function uploadSampleImages() {
    console.log('📤 Starting S3 upload...\n');

    const sampleImagesDir = join(process.cwd(), 'sample-images');

    try {
        // Upload posters
        const postersDir = join(sampleImagesDir, 'posters');
        const posters = readdirSync(postersDir);

        console.log(`Uploading ${posters.length} posters...`);
        for (const poster of posters) {
            await uploadFile(
                join(postersDir, poster),
                `posters/${poster}`
            );
        }

        // Upload backdrops
        const backdropsDir = join(sampleImagesDir, 'backdrops');
        const backdrops = readdirSync(backdropsDir);

        console.log(`\nUploading ${backdrops.length} backdrops...`);
        for (const backdrop of backdrops) {
            await uploadFile(
                join(backdropsDir, backdrop),
                `backdrops/${backdrop}`
            );
        }

        console.log('\n✅ All images uploaded successfully!');
        console.log(`\n🔗 S3 Base URL: https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n💡 Make sure:');
        console.log('   1. AWS credentials are set in .env');
        console.log('   2. S3 bucket exists');
        console.log('   3. sample-images/posters/ and sample-images/backdrops/ folders exist');
    }
}

uploadSampleImages();
