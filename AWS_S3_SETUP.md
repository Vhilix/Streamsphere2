# AWS S3 Image Storage Implementation Guide

This guide shows you how to implement Amazon S3 for storing and serving images (posters, backdrops) in your Netflix MVP.

---

## 📋 Prerequisites

1. **AWS Account** - Sign up at https://aws.amazon.com/
2. **AWS CLI** (optional but recommended) - For uploading images
3. **Node.js AWS SDK** - Already included in the updated backend

---

## 🪣 Step 1: Create an S3 Bucket

### Option A: Using AWS Console (Recommended for Beginners)

1. **Log in to AWS Console**
   - Go to https://console.aws.amazon.com/
   - Navigate to **S3** service

2. **Create Bucket**
   - Click **"Create bucket"**
   - **Bucket name**: `netflix-mvp-images` (must be globally unique)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
   - **Block Public Access**: Uncheck "Block all public access" (we need public read access)
   - ⚠️ Acknowledge the warning about public access
   - Click **"Create bucket"**

3. **Configure Bucket Policy**
   - Click on your bucket name
   - Go to **"Permissions"** tab
   - Scroll to **"Bucket policy"**
   - Click **"Edit"** and paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::netflix-mvp-images/*"
    }
  ]
}
```

   - Replace `netflix-mvp-images` with your actual bucket name
   - Click **"Save changes"**

4. **Enable CORS** (for browser access)
   - Still in **"Permissions"** tab
   - Scroll to **"Cross-origin resource sharing (CORS)"**
   - Click **"Edit"** and paste:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

   - Click **"Save changes"**

### Option B: Using AWS CLI

```bash
# Create bucket
aws s3 mb s3://netflix-mvp-images --region us-east-1

# Set bucket policy
aws s3api put-bucket-policy --bucket netflix-mvp-images --policy file://bucket-policy.json

# Enable CORS
aws s3api put-bucket-cors --bucket netflix-mvp-images --cors-configuration file://cors.json
```

---

## 🔑 Step 2: Create IAM User for Backend Access

1. **Go to IAM Console**
   - Navigate to **IAM** service
   - Click **"Users"** → **"Create user"**

2. **Create User**
   - **User name**: `netflix-backend-s3`
   - Check **"Provide user access to the AWS Management Console"** (optional)
   - Click **"Next"**

3. **Set Permissions**
   - Select **"Attach policies directly"**
   - Search for and select **"AmazonS3FullAccess"** (or create custom policy below)
   - Click **"Next"** → **"Create user"**

4. **Create Access Keys**
   - Click on the newly created user
   - Go to **"Security credentials"** tab
   - Click **"Create access key"**
   - Select **"Application running outside AWS"**
   - Click **"Next"** → **"Create access key"**
   - **⚠️ IMPORTANT**: Save the **Access Key ID** and **Secret Access Key** - you won't see them again!

### Custom IAM Policy (More Secure)

Instead of `AmazonS3FullAccess`, use this minimal policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::netflix-mvp-images",
        "arn:aws:s3:::netflix-mvp-images/*"
      ]
    }
  ]
}
```

---

## 📁 Step 3: Organize Your S3 Bucket

Create this folder structure in your bucket:

```
netflix-mvp-images/
├── posters/
│   ├── tt1000.jpg
│   ├── tt1001.jpg
│   └── ...
├── backdrops/
│   ├── tt1000.jpg
│   ├── tt1001.jpg
│   └── ...
└── profiles/
    ├── user_123.jpg
    └── ...
```

---

## 🖼️ Step 4: Upload Sample Images

### Option A: AWS Console

1. Click on your bucket
2. Click **"Upload"**
3. Click **"Add files"** or drag and drop
4. Select your images
5. Click **"Upload"**

### Option B: AWS CLI

```bash
# Upload a single file
aws s3 cp poster.jpg s3://netflix-mvp-images/posters/tt1000.jpg

# Upload entire folder
aws s3 sync ./posters s3://netflix-mvp-images/posters/

# Make files public (if not using bucket policy)
aws s3 cp poster.jpg s3://netflix-mvp-images/posters/tt1000.jpg --acl public-read
```

### Option C: Using Node.js Script (Included in Backend)

See `Backend/scripts/upload-to-s3.js` for automated uploads.

---

## ⚙️ Step 5: Configure Backend

1. **Update `.env` file** in `Backend/`:

```env
# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id-here
AWS_SECRET_ACCESS_KEY=your-secret-access-key-here
AWS_S3_BUCKET=netflix-mvp-images

# S3 Base URL (automatically constructed, or use CloudFront)
S3_BASE_URL=https://netflix-mvp-images.s3.us-east-1.amazonaws.com
```

2. **Install AWS SDK** (if not already installed):

```bash
cd Backend
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

3. **Restart Backend**:

```bash
npm run dev
```

---

## 🔗 Step 6: Update Image URLs

The backend will automatically generate S3 URLs for images:

**Before:**
```
https://via.placeholder.com/300x450
```

**After:**
```
https://netflix-mvp-images.s3.us-east-1.amazonaws.com/posters/tt1000.jpg
```

---

## 🚀 Step 7: (Optional) Use CloudFront CDN

For better performance and custom domain:

1. **Create CloudFront Distribution**
   - Go to **CloudFront** in AWS Console
   - Click **"Create distribution"**
   - **Origin domain**: Select your S3 bucket
   - **Origin access**: Public
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - Click **"Create distribution"**

2. **Get CloudFront URL**
   - Copy the **Distribution domain name** (e.g., `d1234567890.cloudfront.net`)

3. **Update Backend `.env`**:

```env
S3_BASE_URL=https://d1234567890.cloudfront.net
# or with custom domain:
S3_BASE_URL=https://images.yournetflix.com
```

---

## 📊 Cost Estimation

### S3 Pricing (us-east-1)
- **Storage**: $0.023 per GB/month
- **GET requests**: $0.0004 per 1,000 requests
- **Data transfer out**: First 100 GB/month free, then $0.09/GB

### Example for 1,000 titles:
- **Storage**: 1,000 posters (500 KB each) + 1,000 backdrops (1 MB each) = ~1.5 GB
- **Monthly cost**: ~$0.03 for storage + minimal for requests
- **Total**: < $1/month for small MVP

### CloudFront Pricing:
- **Data transfer**: First 1 TB/month free
- **Requests**: First 10M requests free
- **Total**: Free for MVP usage

---

## 🔒 Security Best Practices

1. **Never commit AWS credentials to Git**
   - `.env` is already in `.gitignore`
   - Use environment variables in production

2. **Use IAM Roles in Production**
   - If hosting on EC2/ECS, use IAM roles instead of access keys
   - No need to store credentials

3. **Enable Versioning**
   - Protects against accidental deletions
   - S3 Console → Bucket → Properties → Versioning

4. **Enable Server-Side Encryption**
   - S3 Console → Bucket → Properties → Default encryption
   - Choose **SSE-S3** (free)

5. **Set Lifecycle Policies**
   - Automatically delete old versions
   - Move to cheaper storage classes

---

## 🧪 Testing

### Test S3 Upload Endpoint

```bash
# Using curl (Windows PowerShell)
$headers = @{
    "Authorization" = "Bearer your-jwt-token"
    "Content-Type" = "multipart/form-data"
}

Invoke-RestMethod -Uri "http://localhost:5000/upload/poster" `
    -Method Post `
    -Headers $headers `
    -InFile "poster.jpg"
```

### Test Image URL

Open in browser:
```
https://netflix-mvp-images.s3.us-east-1.amazonaws.com/posters/tt1000.jpg
```

---

## 🐛 Troubleshooting

### Images not loading?

1. **Check bucket policy** - Ensure public read access
2. **Check CORS** - Required for browser access
3. **Check URL** - Verify bucket name and region
4. **Check file exists** - Use AWS Console to verify upload

### 403 Forbidden?

- Bucket policy not set correctly
- File not uploaded
- Wrong bucket name in URL

### CORS errors?

- CORS configuration not set
- Wrong origin in CORS config
- Browser cache (try incognito mode)

---

## 📝 Next Steps

1. **Upload your images** to S3
2. **Update backend** with AWS credentials
3. **Test image loading** in frontend
4. **Set up CloudFront** for better performance
5. **Implement image upload** from admin panel (future)

---

## 🔗 Useful Links

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [S3 Pricing Calculator](https://calculator.aws/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)

---

**Your images will now be served from AWS S3 with high availability and performance!** 🎉
