# Zoom Clone — Real-Time Video, Audio, & Chat Platform

A production-grade, real-time communications application featuring WebRTC video/audio streaming, instant group chat, user presence tracking, and client-side meeting recording. This project is built as a modular monorepo utilizing **NestJS** on the backend and **Vite + React** on the frontend.

---

##  Quick Start

Follow these steps to set up and run the project locally on your machine.

### 📋 Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (Version `>= 18.x`)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for PostgreSQL)
* [npm](https://www.npmjs.com/) (Version `>= 10.x`)

---

### 1. Setup & Dependencies

Clone this repository to your local machine:
```bash
git clone https://github.com/Ahmed-175/zoom-clone.git
cd zoom-clone
```

Run the interactive setup script. This script automatically installs project-wide dependencies, copies the `.env.example` configurations to `.env` files for both frontend and backend modules, and pre-generates the Prisma Client:
```bash
npm run setup
```

---

###  2. Environment Variables Configuration

The project is preconfigured with default local development environments. If you need to make changes, refer to the following structure:

#### Backend Config (`apps/backend/.env`)
```env
PORT=8000
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/realtime_db"
JWT_SECRET=your-secret-jwt
```

#### Frontend Config (`apps/frontend/.env`)
```env
VITE_URL_BACKEND="http://localhost:8000/api/v1"
VITE_URL_SOCKET="http://localhost:8000"
```

---

### 3. Start Database & Run Migrations

Start the local PostgreSQL database using Docker Compose:
```bash
docker compose up -d
```

Apply database migrations using Prisma:
```bash
npm run db:push
```

---

### 4. Run Locally

Start both the backend and frontend servers concurrently in development mode using Turborepo:
```bash
npm run dev
```

* **Frontend Dashboard**: Access at [http://localhost:5173](http://localhost:5173)
* **Backend Server API**: Running at [http://localhost:8000](http://localhost:8000)

---

## Technologies Used

### Backend Stack
* **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
* **Socket.io Gateway**: Powers WebSockets namespaces for WebRTC signaling, chat messages, and presence tracking.
* **Prisma ORM**: Modern database client mapping schema definitions to PostgreSQL tables.
* **Passport.js & JWT**: Secure email/password authentication & request authorization.

### Frontend Stack
* **React 19 + TypeScript**: Interactive stateful UI with type safety.
* **Vite**: Rapid hot-module replacement and bundle optimization.
* **Tailwind CSS v4**: Utility-first CSS styling for modern visuals.
* **WebRTC APIs**: Native browser media capture, local streams management, and Peer-to-Peer channels.
* **Socket.io Client**: Real-time event subscription and bi-directional signaling.

### Storage & Connections
* **Database**: PostgreSQL (relational storage for users, meetings, and chat history).
* **Caching & Ephemeral Layer**: Designed for Redis integration to scale WebSocket rooms and track active users in real-time. (Currently runs on highly optimized in-memory Map structures for local development).

---

##  Main Workflow

Our system is structured around three core real-time operations: creating a meeting, joining a meeting, and interacting inside the active room.

![Home Dashboard](./docs/assets/main-workflow.png)

### 1. Create a Meeting
1. When authenticated, the user clicks the **"Create Meeting"** button on the home dashboard.
2. The frontend triggers a `GET` request to `/meetings/create`.
3. The NestJS backend generates a secure `roomId` (UUID), registers the room in the database using Prisma, and returns the ID.
4. The client redirects to the unique URL path: `/meeting/:roomId`.

### 2. Join a Meeting
1. To join an active meeting, a participant navigates to `/meeting/:roomId` (either by entering the code in the "Join Meeting" menu or using a shared link).
2. The frontend connects to the Socket.io server and emits the `join-meeting` event with the `meetingId`.
3. The NestJS gateway executes `socket.join(meetingId)` to bind the client to a Socket.io room.
4. Existing participants in the room are notified via the `user-joined` event, and the server returns a list of active sockets to the new participant.

### 3. Interact with the Meeting
* **WebRTC Signaling**: Sockets use the WebSocket gateway to exchange SDP offers, answers, and ICE candidates between clients. Once the peer-to-peer connection is negotiated, video and audio streams flow directly between browsers.
* **Media Controls**: Participants can dynamically toggle their microphone and camera.
* **Live Chat**: Users send and receive instant text messages within the room, which are broadcast via WebSockets and saved to the database.
* **Client-Side Recording**: Local audio and video streams can be recorded directly in the browser via the MediaRecorder API and downloaded upon completion.

---

##  Screenshots

Here is a visual overview of the user experience when running the project locally:

###  Home Dashboard
Features a glassmorphic card design displaying the local clock and interactive grid controls to initiate meetings, join existing rooms, review recordings, or check active users.

![Home Dashboard](./docs/assets/dashboard.png)

###  Active Meeting Room
A dark-themed conferencing environment featuring side-by-side active video streams, individual volume configurations, and floating glassmorphic toggle bars for media devices.

![Active Meeting Room](./docs/assets/meeting_room.png)

---

##  Contribution Guidelines

We follow standard monorepo guidelines to keep development clear and structured.

### Workspace Structure
```
 Zoom-Clone/
├── apps/
│   ├── backend/         # NestJS application (API, DB, WebSockets Gateways)
│   │   ├── prisma/      # Schema and SQL migrations database configuration
│   │   └── src/         # NestJS modules (auth, presence, meetings, chat)
│   └── frontend/        # Vite + React Client application
│       ├── src/api/     # Rest clients and endpoint routes definitions
│       ├── src/hooks/   # Custom hooks (WebRTC, Media stream handling)
│       └── src/pages/   # Page routers (Login, Dashboard, Meeting Space)
├── docs/                # Architecture diagrams, mockups, and PRD docs
├── scripts/             # Setup and automation helper scripts
├── package.json         # Workspace execution controls and root commands
└── turbo.json           # Turborepo task pipeline configs
```
