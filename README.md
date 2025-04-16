# Kukan

**Kukan** is a real-time IoT dashboard that visualizes environmental sensor data such as temperature, humidity, pressure, and gas levels. Sensor data is collected via Python and sent to a Node.js backend using gRPC, then broadcast to the frontend (built with Vue.js) using WebSocket for live updates.

## Features

- Supports multiple sensors (e.g., BME680)
- WebSocket-based data communication (Python → Node.js)
- WebSocket real-time updates to frontend
- Line charts and responsive UI with Vue.js
- Data persistence using SQLite or PostgreSQL
- Docker-based development and deployment setup

## Architecture

[ Sensor (Python) ] --WebSocket--> [ Node.js Server ] --WebSocket--> [ Vue.js Frontend ] | [ SQLite / PostgreSQL ]


## Project Structure

kukan/
├── backend/ # Node.js (gRPC + WebSocket)
├── frontend/ # Vue project root 
├── nginx/ # nginx configuration
├── docker-compose.yml # Docker configuration 
└── README.md # This file

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/kukan.git
cd kukan
docker-compose up --build
```

## RoadMap
- Multi-room sensor network support
- Comfort level detection and alert system
- Improved UI/UX design

## License
MIT License

