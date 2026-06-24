### WorkHive

WorkHive is a full-stack collaborative task management platform built with React, Flask, SQLite, and JWT Authentication. It combines personal task management with team collaboration through workspace-based project organization, drag-and-drop task assignment, subtasks, activity tracking, and notifications. 

*The following are subject to change, and this is nothing but a basic rough sketch of the project*

## Features

### Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing
- Role-Based Access Control
- Secure API Endpoints

### Personal Task Management

- Create Tasks
- View Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Set Task Priority
- Set Deadlines
- Search Tasks

### Collaborative Workspaces

- Create Workspace Rooms
- Join Rooms using Room Codes
- Invite Team Members
- Workspace Roles (Owner, Admin, Member)
- Multi-user Task Assignment
- Drag-and-Drop Task Management

### Subtasks

- Create Subtasks
- Assign Subtasks to Team Members
- Multiple Assignees per Subtask
- Progress Tracking
- Completion Status Management

### Collaboration Features

- Task Comments
- Activity Timeline
- User Mentions (@username)
- Help Requests
- Resolution Notes
- Completion Reports

### Notifications

- Task Assignment Notifications
- Task Completion Notifications
- Help Request Notifications
- Mention Notifications
- Comment Notifications
- Workspace Notifications

### Analytics & Insights

- Workspace Dashboard
- Task Completion Statistics
- User Productivity Metrics
- Open Help Requests
- Overdue Tasks Tracking

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Bootstrap / Tailwind CSS
- Drag-and-Drop Library

### Backend

- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS

### Database

- SQLite

### Deployment

- Frontend: Vercel
- Backend: Render

---

## Project Structure

```text
tasksphere/

├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── context/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── app.py
│   ├── config.py
│   └── requirements.txt
│
├── README.md
└── API_DOCUMENTATION.md
````

---

## Database Design

### Core Entities

* User
* Room
* RoomMember
* Task
* TaskAssignment
* SubTask
* SubTaskAssignment
* Comment
* ActivityLog
* Notification
* HelpRequest
* CompletionReport

---

## Workflow

### Personal Task Flow

```text
Register
    ↓
Login
    ↓
Create Task
    ↓
Update Progress
    ↓
Complete Task
```

### Collaborative Task Flow

```text
Create Workspace
    ↓
Invite Members
    ↓
Create Task
    ↓
Assign Team Members
    ↓
Create Subtasks
    ↓
Collaborate
    ↓
Request Help (Optional)
    ↓
Complete Task
    ↓
Submit Completion Report
```

---

## API Endpoints

### Authentication

```http
POST /register
POST /login
```

### Tasks

```http
GET    /tasks
POST   /tasks
PUT    /tasks/{id}
DELETE /tasks/{id}
```

### Rooms

```http
POST /rooms
GET  /rooms
POST /rooms/join
```

### Subtasks

```http
POST   /subtasks
PUT    /subtasks/{id}
DELETE /subtasks/{id}
```

### Notifications

```http
GET /notifications
PUT /notifications/{id}/read
```

---

## Optional Enhancements Implemented

* Task Priorities
* User Profiles
* Notifications
* Pagination
* Workspace Analytics
* Activity Tracking
* Multi-user Task Ownership
* Drag-and-Drop Assignment
* Help Request System

---

## Future Improvements

* Real-Time Collaboration (WebSockets)
* Email Notifications
* File Attachments
* Calendar View
* Mobile Application
* AI-Powered Task Suggestions

---

## Author

**Ganesh Macherla**

Built as a full-stack collaborative task management platform to explore modern project management workflows, team collaboration, and scalable web application architecture.

```
```
