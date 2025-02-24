# S3 Bucket Setup and Upload Instructions

## Step 1: Create S3 Bucket
1. Go to AWS Console > S3
2. Click "Create bucket"
3. Choose a bucket name (e.g., "pure-game-classic")
4. Select your region
5. Uncheck "Block all public access"
6. Acknowledge that the bucket will be public
7. Keep other settings default
8. Click "Create bucket"

## Step 2: Enable Static Website Hosting
1. Click on your new bucket
2. Go to "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Select "Enable"
6. Enter "index.html" for both Index and Error document
7. Click "Save changes"

## Step 3: Upload Files (Maintain This Exact Structure)
1. In your bucket, create a folder named "assets"
2. Upload files to the root level:
   - index.html
   - IMG_9553.png
   - PGCvid.MP4
   - 58FCBF88-9EB2-41C8-BF3B-1AC8D8234DE9.png
   - AEB8F1CD-B10C-469E-95B4-91BED78A7F93.png

3. Navigate to the assets folder and upload:
   - index-DLREqmrU.css
   - index-DiwDl5sK.js
   - video-section-CxjvTpjU.js

Important: For each file you upload:
1. Keep "ACL" enabled
2. Select "Grant public-read access"
3. Keep other settings default
4. Click "Upload"

## Step 4: Apply Bucket Policy
1. Go to the "Permissions" tab
2. Find "Bucket policy"
3. Click "Edit"
4. Paste this policy (replace YOUR-BUCKET-NAME):
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
5. Click "Save changes"

Your website will be available at:
http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com