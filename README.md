# Check-In App (Attendance Tracking System)

A web-based application designed to track and manage member attendance in real time.
[Verdancy](https://ckmpeter.github.io/VCS_App/#/checkin)

## Tech Stack

Frontend: React.js

Backend / Database: Firebase

Data Integration: Sheet.best (API for Google Sheets)

Form Input: Google Forms

## System Flow

Data Collection
Members submit their attendance via Google Form

Data Storage
Responses are automatically recorded in Google Sheets

API Layer
Sheet.best converts the Google Sheet into a REST API

Web Application
The React web app fetches and displays attendance data

## Key Features

Real-time attendance tracking

Easy form-based check-in

Centralized data management via Google Sheets

Live data display on web dashboard

Scalable with Firebase integration

## Prerequisites

- Make sure you have installed:

- Node.js (v16 or higher recommended)

- npm (comes with Node.js)

- A code editor like Visual Studio Code

- A Google account (for Google Forms & Sheets)

- A Firebase project (if using authentication / realtime features)

## Installation
Clone the project and install dependencies:
``` bash
git clone <your-repo-url>
cd your-project-folder
npm install
```
- Running in Development
    - Start the development server:
    ``` bash
    npm run start
    ```
    App runs at: http://localhost:3000

    Auto-reloads when you make changes

- Production Build

    - To create an optimized production build:
    ``` bash
        npm run build
    ```
