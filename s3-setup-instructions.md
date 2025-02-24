# S3 Static Website Hosting Setup Instructions

## Files to Upload
From your `dist/public` directory:
- `index.html`
- `assets/index-DLREqmrU.css`
- `assets/video-section-CxjvTpjU.js`
- `assets/index-DiwDl5sK.js`

Additional assets:
- `IMG_9553.png`
- `PGCvid.MP4`
- `58FCBF88-9EB2-41C8-BF3B-1AC8D8234DE9.png`
- `AEB8F1CD-B10C-469E-95B4-91BED78A7F93.png`

## S3 Bucket Setup Steps
1. Sign in to AWS Console
2. Create a new S3 bucket:
   - Choose a unique bucket name
   - Select your preferred region
   - Uncheck "Block all public access"
   - Enable "Static website hosting"
   - Set index.html as both Index and Error document

3. Apply the bucket policy (replace YOUR-BUCKET-NAME):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

4. Upload files:
   - Maintain the same directory structure as in dist/public
   - Ensure all files are set to public-read
   - Keep the same file names

5. Access your website:
   - Find your bucket's website endpoint in the "Static website hosting" section
   - Format: http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com
