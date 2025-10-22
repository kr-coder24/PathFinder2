\#PathFinder.



Pathfinder is an open-source Google Maps overlay that routes drivers, cyclists and pedestrians along \*\*smoother\*\* and \*\*safer\*\* roads and paths, thinking of adding disaster and accident detection, explicitly.



Users crowd-source photos and information about roads which is translated by an AI pipeline based on reputation based systems and translates them into following indices:



* \*\*Road Quality Index (RQI)\*\* - surface smoothness, potholes, lane markings etc.
* \*\*Pedestrian Safety Index (PSI)\*\* - safer atmosphere, clear visibility, no danger for getting robbed etc.



Install Dependencies :
1. Run : npm install

How to run:
run the backend in the backend using: python -m uvicorn main:app --reload
running front end (android emulator only):
1.npx expo prebuild
2.npx expo run:android (android emulator must be running in the background)




