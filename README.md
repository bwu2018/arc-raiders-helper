# arc-raiders-helper

A full-stack web application that displays real-time game conditions for Arc Raiders maps. The application fetches event schedules and displays current and upcoming conditions for each map.

The data comes from [https://metaforge.app/arc-raiders](https://metaforge.app/arc-raiders)
The command `python manage.py get_events_schedule` gets data from API and fills database.

Django API: `/api/conditions_by_map/` and `api/conditions/`

(Switched from AWS to Render free plan)
~~Frontend: [https://main.d2bz6x45i06kud.amplifyapp.com](https://main.d2bz6x45i06kud.amplifyapp.com)~~

Frontend: [https://arc-raiders-helper-frontend.onrender.com/](https://arc-raiders-helper-frontend.onrender.com/)

The Render free plan has to spin up after inactivity, so there may be a minute of downtime.
To check exactly when this is, you can visit the backend server and see if it is running: [https://arc-raiders-helper-8rvn.onrender.com/api/](https://arc-raiders-helper-8rvn.onrender.com/api/).

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS3** - Styling
- **AWS Amplify** - Hosting and deployment

### Backend

- **Django 6.0** - Python web framework
- **Django REST Framework 3.16** - REST API toolkit
- **Gunicorn** - WSGI HTTP server
- **SQLite** - Database (stored in `/tmp` for Docker compatibility)
- **Docker** - Containerization
- **Docker Compose** - Container orchestration

### Infrastructure & DevOps

- **AWS EC2** - Backend hosting (Ubuntu 24.04)
- **AWS API Gateway** - HTTPS proxy for backend API
- **GitHub Actions** - CI/CD automation
- **Cron** - Scheduled database updates

### Development Tools

- **Ruff** - Python linter and formatter
- **ESLint** - JavaScript/TypeScript linter
- **Prettier** - Code formatter
- **Git** - Version control

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           User Browser                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS Amplify (Frontend)                      │
│                  https://main.d2bz6x45i06kud...                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS API Gateway (Proxy)                       │
│              https://xnc7fo4imk.execute-api...                  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EC2 Instance                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Docker Container (Backend)                   │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │         Gunicorn + Django REST API                 │  │   │
│  │  │              Port 8000                             │  │   │
│  │  └───────────────────┬────────────────────────────────┘  │   │
│  │                      │                                    │   │
│  │                      ▼                                    │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │         SQLite Database (/tmp/db.sqlite3)          │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │      Cron Job (Daily Database Updates - 2 AM UTC)        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                             ▲
                             │ Git Push
                             │
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Actions                            │
│              (Automated Deployment Pipeline)                     │
└─────────────────────────────────────────────────────────────────┘
```
