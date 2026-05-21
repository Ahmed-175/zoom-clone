# Product Requirements Document (PRD)

## Real-Time Communication Platform (Zoom-like System)

---

## 1. Product Overview

This project is a real-time communication platform designed to enable users to connect through video, audio, and text in structured meeting rooms. The system supports real-time presence, meetings, chat, screen sharing, and recording capabilities.

The goal is to build a scalable, modular system that demonstrates strong understanding of real-time architecture, backend design, and modern web technologies.

---

## 2. Objectives

* Provide real-time video and audio communication between users.
* Enable creation and management of meeting rooms.
* Support live chat within meetings.
* Maintain real-time user presence (online/offline status).
* Allow screen sharing during meetings.
* Support meeting recording (client-side MVP).
* Implement authentication with email/password and Google OAuth.
* Build a scalable backend architecture suitable for production-like systems.

---

## 3. Target Users

* Developers learning real-time systems
* Teams requiring lightweight meeting functionality
* Educational or internal collaboration environments

---

## 4. Core Features

### 4.1 Authentication System

Users must be able to authenticate using:

* Email and password registration and login
* Google OAuth 2.0 authentication

The system issues JWT access tokens for session management. Optional refresh token mechanism can be added for extended sessions.

---

### 4.2 User Management

The system maintains a user database containing:

* User profile information
* Authentication credentials
* Social login identifiers

Users can view a list of other registered users.

---

### 4.3 Presence System

The platform tracks real-time user availability:

* Online and offline status updates
* Live updates when users connect or disconnect
* Ranking or prioritization of frequently interacted users

Presence data is handled in real-time using WebSockets and Redis.

---

### 4.4 Meetings System

Users can create and join meetings using unique room identifiers.

Meeting capabilities include:

* Create meeting rooms
* Join via invitation link or room ID
* Maintain active participant list
* Support both one-to-one and group meetings

---

### 4.5 Real-Time Video and Audio Communication

The system supports peer-to-peer communication using WebRTC:

* Audio and video streaming between participants
* Dynamic connection handling for multiple users
* Media stream negotiation using signaling server

Signaling is handled through WebSockets.

---

### 4.6 Screen Sharing

Users can share their screen during an active meeting:

* Capture screen using browser APIs
* Replace or add media stream dynamically
* Stop screen sharing and revert to camera stream

---

### 4.7 Real-Time Chat

Each meeting includes a chat system:

* Real-time message exchange
* Messages broadcast to all participants in the room
* Storage of chat history in the database
* Retrieval of previous messages when joining a meeting

---

### 4.8 Recording System (MVP)

The system supports client-side recording:

* Record audio and video streams locally using MediaRecorder API
* Allow users to download recorded sessions

Server-side recording is not included in the initial scope.

---

### 4.9 Invitation System

Users can invite others to meetings using:

* Shareable meeting links
* Direct room identifiers

Optional future enhancements include email-based invitations.

---

## 5. System Architecture

### Backend

The backend is built using a modular NestJS architecture with the following modules:

* Authentication Module
* User Management Module
* Presence Module
* Meetings Module
* Chat Module
* WebRTC Signaling Gateway

Real-time communication is handled using Socket.io.

---

### Frontend

The frontend is built using React (Vite) and includes:

* Authentication pages
* Dashboard for users and presence
* Meeting room interface
* WebRTC media handling layer
* Socket client integration

---

### Real-Time Communication Layer

The system uses WebSockets for:

* Signaling between peers (WebRTC offer/answer/ICE)
* Chat messaging
* Presence updates
* Room management events

---

## 6. Data Storage

### PostgreSQL

Used for persistent data:

* Users
* Meetings
* Chat messages
* Interaction history

### Redis

Used for real-time and ephemeral data:

* Online user tracking
* Active room participants
* Pub/Sub messaging for scaling WebSockets
* Caching frequently accessed relationships

---

## 7. Core Technologies

Backend:

* NestJS
* Socket.io
* Passport.js
* JWT
* Prisma ORM
* PostgreSQL
* Redis

Frontend:

* React (Vite)
* WebRTC APIs
* Socket.io Client

Infrastructure:

* Docker
* GitHub Actions (CI/CD)

---

## 8. Non-Functional Requirements

* Low-latency real-time communication
* Modular and scalable backend architecture
* Separation of concerns between signaling and media streaming
* Support for horizontal scaling using Redis
* Maintainable and extensible codebase

---

## 9. Deployment Strategy

The system is containerized using Docker:

* Backend service container
* Frontend service container
* Redis container
* PostgreSQL container

CI/CD pipeline is responsible for:

* Building the application
* Running tests
* Creating Docker images
* Deploying to target environment

---

## 10. Future Enhancements

* Server-side media recording using SFU (e.g., mediasoup)
* Push notifications system
* Mobile application support
* Advanced user analytics
* Calendar integration for scheduling meetings
* AI-based meeting summaries and transcription

---

## 11. Product Goal

The goal of this project is to demonstrate a deep understanding of:

* Real-time system design
* WebRTC architecture
* Scalable backend systems
* Event-driven communication
* Modern full-stack development practices

The final system is intended to simulate production-level architecture rather than serve as a simple prototype.
