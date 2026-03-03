# RateMyCommute
Full-stack commute rating app with a Flask backend and React frontend.

## Setup
1. Clone this repo.
2. Create and activate a virtual environment.
3. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

4. Create your local env file from the template:

```bash
cp .env.example .env
```

5. Add your TomTom API key to `backend/.env`:

```env
TOMTOM_API_KEY=your_tomtom_api_key_here
```

6. Run the backend API:

```bash
python run.py
```

7. In a new terminal, run the frontend:

```bash
cd frontend
npm install
npm start
```

## Get a TomTom API Key
1. Go to the [TomTom Developer Portal](https://developer.tomtom.com/).
2. Sign in or create an account.
3. Create a new application/project.
4. Generate an API key and copy it.
5. Paste it into `backend/.env` as `TOMTOM_API_KEY=...`.

Do not commit your real `.env` file.

## Features
- Real-time travel time and delay calculations
- Traffic congestion and incident retrieval
- Commute rating algorithm
- Flask REST API backend
- React frontend interface
- Modular service-based architecture

## Tech Stack
- Frontend: React, JavaScript
- Backend: Python, Flask
- APIs: TomTom Routing/Traffic, 511NY/NJ
- Tools: Git, GitHub, virtual environments, Axios, requests

## Example API Request
`POST /api/commute`

```json
{
  "origin": "40.755,-73.986",
  "destination": "40.730,-73.999"
}
```

## Example Response

```json
{
  "travel_time": 1340,
  "delay": 210,
  "incident_count": 3,
  "rating": 72
}
```

