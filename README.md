# WorkHive

### Collaborative workspace platform for managing teams, tasks, deadlines, and project activity.

WorkHive is a full-stack productivity and collaboration platform that enables teams to organize projects inside shared workspaces called hives. Users can create and join hives, assign tasks, track deadlines, manage personal todos, monitor activity, and analyze productivity metrics from a centralized dashboard.

Built with React, Flask, SQLite, and JWT authentication.

---

## Media

> Add media here

---

## Features

### Authentication

- Secure user registration and login
- JWT-based authentication
- User profiles

### Hive Management

- Create workspaces
- Join workspaces using room codes
- View members
- Leave or delete hives

### Team Tasks

- Create, edit, and delete tasks
- Assign tasks to team members
- Set priorities and due dates
- Track task completion

### Personal Tasks

- Manage personal todos
- Set priorities and deadlines
- Mark tasks as completed

### Productivity Tools

- Calendar view
- Notifications
- Activity logs
- Statistics dashboard

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Flask
- Flask SQLAlchemy
- Flask Migrate
- Flask JWT Extended

### Database

- SQLite

---

## Local Setup

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

flask db upgrade

python app.py
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
SECRET_KEY=your_secret_key

JWT_SECRET_KEY=your_jwt_secret_key

DATABASE_URL=sqlite:///workhive.db
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## Known Issues

- Real-time updates are not implemented.
- Notifications currently refresh on page load.
- Calendar does not yet support monthly views.

---

## Roadmap (V2)

WorkHive V2 expands the current workspace experience into a fully collaborative Kanban-based project management platform.

### Kanban Board

- Drag-and-drop task management.
- Four workflow stages:
  - To Do
  - In Progress
  - In Review
  - Completed

### Advanced Task Management

- Rich task descriptions.
- Multi-member task assignment.
- Need Help indicators.
- Comment threads.
- Subtask progress tracking.

### Subtasks

- Create subtasks inside tasks.
- Assign owners and collaborators.
- Independent priorities and due dates.
- Completion tracking.

### Collaboration & Permissions

- Owner and collaborator roles.
- Fine-grained permissions.
- Automatic member synchronization between tasks and subtasks.
- Ownership transfer handling.

### Smart Workflow Rules

- Prevent completing tasks with unfinished subtasks.
- Prevent duplicate assignments.
- Enforce valid subtask deadlines.
- Support mixed task and subtask statuses.

### User Experience

- Interactive drag-and-drop interface.
- Improved notifications.
- Enhanced calendar views.
- Real-time updates.

## License

MIT License
