---
Title: Building a Personal Blog Platform with Next.js, Django, and AWS
Created: 29 February 2023
Tags: 
   - nextjs
   - django
   - aws
   - markdown
   - fullstack
   - static-generation
   - rest-api
   - s3
   - rds
Description: This project demonstrates how to build a modern personal blog using Next.js for static and dynamic rendering, Django for content management APIs, and AWS for scalable storage and deployment. It focuses on Markdown-based content, RESTful communication, and real-world cloud architecture.
Image: digital_journal_img.png
---

***
# Blog Platform – Next.js, Django & AWS

## Overview
This project is a **modern multi-user blogging platform** enabling users to publish, comment on, and like posts. It combines a **Next.js** frontend for SEO-friendly pages, a **Django** backend for powerful content management, and **AWS** services for scalable hosting.

***

## Tech Stack
- **Frontend:** Next.js 14 (Static + Server-Side Rendering)
- **Backend:** Django 5 + Django REST Framework
- **Database:** AWS RDS (PostgreSQL)
- **Storage:** AWS S3 (static and media files)
- **Authentication:** JWT  
- **Deployment:** Next.js via AWS Amplify, Django via Elastic Beanstalk

***

## Architecture
```
+----------------------------------+
| Next.js Frontend (AWS Amplify)   |
| - Blog listing, detail, comments |
+--------------------+-------------+
                     |
                     v
+----------------------------------+
| Django REST API (Elastic Beanstalk)
| - REST endpoints for posts/users |
+--------------------+-------------+
                     |
                     v
+----------------------------------+
| PostgreSQL (AWS RDS)             |
| AWS S3 (for images/files)        |
+----------------------------------+
```

***

## Core Features
- User registration & login (JWT authentication)
- Admin dashboard for managing posts and comments
- SEO-optimized blog pages (SSG + SSR)
- Support for post markdown rendering
- Async image uploads via AWS S3

***

## Backend Setup (Django)
```bash
django-admin startproject blog_backend
cd blog_backend
pip install django djangorestframework django-cors-headers boto3 markdown
python manage.py migrate
python manage.py runserver
```

In `settings.py`:
- Add `rest_framework` and `corsheaders`
- Configure `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and S3 bucket
- Allow CORS from Amplify-generated URL

***

## Frontend Setup (Next.js)
```bash
npx create-next-app blog-frontend
cd blog-frontend
npm install axios markdown-it
```

In `.env.local`:
```
NEXT_PUBLIC_API_URL=https://backend.myblogapp.com
```

Example API call:
```javascript
const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/`);
```

***

## Deployment Steps
1. **Django**
   - Prepare requirements.txt
   - Use `eb init` and `eb deploy` to create an Elastic Beanstalk environment.
2. **Next.js**
   - Deploy with AWS Amplify.
   - Connect to GitHub for CI/CD auto-deploys.
3. **Storage**
   - Configure AWS S3 for image uploads.
4. **Database**
   - Provision an RDS PostgreSQL instance.
   - Update Django settings accordingly.

***

## Scalability Options
- Introduce caching via AWS ElastiCache (Redis)
- Use AWS CloudFront for global content distribution
- Add SNS/SES for notification emails

***

## License
MIT License

***