---
Title: Task Manager App using Next.js, Django, and AWS
Created:  25 January 2023
Tags: 
  - nextjs
  - django
  - aws
  - task-management
  - jwt-auth
  - rest-api
  - postgresql
  - s3
  - fullstack
Description: This project showcases a full-stack task management application built with Next.js, Django REST Framework, and AWS. It focuses on secure user authentication, CRUD-based task workflows, file attachments, and scalable cloud deployment using modern AWS services.
Image: job_app_img.png
---

***
# Task Manager App – Next.js, Django & AWS

## Overview
This project implements a **full-stack task management app** where users can create, edit, and track their to-do items. The **frontend** is built with Next.js, the **backend API** is powered by Django REST Framework, and **AWS** handles hosting and media storage.

***

## Tech Stack
- **Frontend:** Next.js 14 (React-based, SSR-enabled)
- **Backend:** Django 5 with Django REST Framework
- **Database:** PostgreSQL (RDS)
- **Storage:** AWS S3 for file uploads
- **Deployment:**
  - Next.js → AWS Amplify
  - Django API → AWS Elastic Beanstalk
  - Database → RDS PostgreSQL

***

## Architecture
```
+-------------------+
| Next.js Frontend  |
| (AWS Amplify)     |
+---------+---------+
          |
          v
+-------------------+
| Django REST API   |
| (Elastic Beanstalk|
| & Gunicorn)       |
+---------+---------+
          |
          v
+-------------------+
| RDS PostgreSQL DB |
+-------------------+
          |
          v
+-------------------+
| AWS S3 (Media)    |
+-------------------+
```

***

## Features
- User authentication (JWT-based)
- CRUD operations for tasks
- File attachments for each task
- Responsive UI built with Tailwind CSS
- API documented on Swagger UI

***

## Setup Instructions

### 1. Backend (Django)
```bash
# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install django djangorestframework psycopg2 boto3 django-cors-headers

# Create project
django-admin startproject backend && cd backend

# Run migrations
python manage.py migrate
python manage.py runserver
```

Update `settings.py` to configure:
- `CORS_ALLOWED_ORIGINS` for Next.js domain
- AWS S3 storage credentials
- Database URL pointing to RDS

***

### 2. Frontend (Next.js)
```bash
npx create-next-app task-manager
cd task-manager
npm install axios tailwindcss @headlessui/react
```

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.mytaskapp.com
```

Run locally:
```bash
npm run dev
```

***

### 3. AWS Deployment
- Deploy backend with **Elastic Beanstalk** (`eb init`, `eb create`)
- Push frontend using **AWS Amplify**
- Set environment variables in Amplify and Beanstalk dashboards
- Use **AWS S3** to store media (configured in Django settings)

***

## Possible Extensions
- Add team collaboration boards
- Integrate AWS Lambda for background tasks
- Use CloudFront CDN for faster asset delivery

***

### License
MIT License

***
