What is RateMyCommute?
RateMyCommute is a full stack React + Flask app that calculates real time commute conditions using the TomTom Routing/Traffic API. The app converts user entered addresses (or a live location) into coordinates, retrieves routing data, and computes a simple rating on a 0 - 100 scale based on metrics like delays, incidents, and overall traffic. The app also displays these metrics individually.

Tech Stack:
  Frontend: React, Axios
  Backend: Flask, Python
  APIs: TomTom 

Setup:

Backend:
In terminal, run:
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

Then, create an .env file in backend:
add your TomTom API key inside. A key can be created for free here: https://www.tomtom.com/products/routing-apis/

Then, run the backend:
python run.py


Frontend:
in terminal, run:
cd frontend
npm install
npm start

Make sure to run the app on http://localhost:3000 to allow for location access.
