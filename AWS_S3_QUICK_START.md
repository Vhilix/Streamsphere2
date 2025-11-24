# AWS S3 Quick Reference

## 🚀 Quick Start (5 Minutes)

### 1. Create S3 Bucket
```bash
# Using AWS Console
1. Go to https://console.aws.amazon.com/s3/
2. Click "Create bucket"
3. Name: netflix-mvp-images (must be unique)
4. Region: us-east-1
5. Uncheck "Block all public access"
6. Click "Create bucket"
```

### 2. Set Bucket Policy
```bash
# In S3 Console → Your Bucket → Permissions → Bucket Policy
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicRead",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::netflix-mvp-images/*"
  }]
}
```

### 3. Create IAM User
```bash
# IAM Console → Users → Create user
1. Name: netflix-backend-s3
2. Attach policy: AmazonS3FullAccess
3. Create access key → Application outside AWS
4. Save Access Key ID and Secret Access Key
```

### 4. Configure Backend
```bash
# Edit Backend/.env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here
AWS_S3_BUCKET=netflix-mvp-images
```

### 5. Install Dependencies & Restart
```bash
cd Backend
npm install
npm run dev
```

---

## 📁 Folder Structure in S3

```
netflix-mvp-images/
├── posters/
│   ├── tt1000.jpg
│   ├── tt1001.jpg
│   └── ...
└── backdrops/
    ├── tt1000.jpg
    ├── tt1001.jpg
    └── ...
```

---

## 🖼️ Upload Images

### Option 1: AWS Console
1. Open your bucket
2. Click "Upload"
3. Drag and drop images
4. Click "Upload"

### Option 2: AWS CLI
```bash
# Upload single file
aws s3 cp poster.jpg s3://netflix-mvp-images/posters/tt1000.jpg

# Upload folder
aws s3 sync ./posters s3://netflix-mvp-images/posters/
```

### Option 3: Using Script
```bash
# 1. Create sample-images folder
mkdir -p Backend/sample-images/posters
mkdir -p Backend/sample-images/backdrops

# 2. Add your images to these folders

# 3. Run upload script
cd Backend
node scripts/upload-to-s3.js
```

---

## 🔗 Image URLs

Once uploaded, images are accessible at:

```
https://netflix-mvp-images.s3.us-east-1.amazonaws.com/posters/tt1000.jpg
https://netflix-mvp-images.s3.us-east-1.amazonaws.com/backdrops/tt1000.jpg
```

The backend automatically generates these URLs when AWS is configured.

---

## ✅ Verify Setup

### Test 1: Check Backend Config
```bash
# Backend should log on startup:
# "S3 configured: true" or "S3 configured: false"
```

### Test 2: Check Image URL
```bash
# Open in browser:
https://your-bucket.s3.us-east-1.amazonaws.com/posters/tt1000.jpg

# Should show the image (not 404 or 403)
```

### Test 3: Check Frontend
```bash
# Open http://localhost:3000
# Inspect image URLs in browser DevTools
# Should see S3 URLs instead of placeholder URLs
```

---

## 💰 Cost Estimate

For 1,000 titles with posters and backdrops:
- **Storage**: ~1.5 GB = $0.03/month
- **Requests**: ~10,000/month = $0.004
- **Transfer**: First 100 GB free
- **Total**: < $0.05/month

---

## 🐛 Troubleshooting

### Images not loading?
```bash
# Check 1: Bucket policy allows public read
# Check 2: CORS is configured
# Check 3: File actually exists in S3
# Check 4: URL is correct (bucket name, region)
```

### 403 Forbidden?
```bash
# Fix: Update bucket policy to allow public read
# Or: Make individual files public
```

### Backend not using S3?
```bash
# Check: AWS credentials in .env
# Check: npm install completed
# Check: Backend restarted after .env changes
```

---

## 📝 Environment Variables

```env
# Required for S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=netflix-mvp-images

# Optional - auto-generated if not provided
S3_BASE_URL=https://netflix-mvp-images.s3.us-east-1.amazonaws.com
```

---

## 🎯 Next Steps

1. ✅ Create S3 bucket
2. ✅ Set bucket policy
3. ✅ Create IAM user
4. ✅ Add credentials to .env
5. ✅ Run `npm install`
6. ✅ Upload images
7. ✅ Restart backend
8. ✅ Test in frontend

---

## 📚 Full Documentation

See `AWS_S3_SETUP.md` for complete setup guide with screenshots and advanced options.
