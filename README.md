ANGULAR SETUP WITH JSON SERVER

1. Create db.json file in root folder with your data structure
2. Run: json-server --watch db.json --port 3000
3. Open new terminal, run: ng serve
4. Open http://localhost:4200

Both servers must run simultaneously. Use separate terminals. 
JSON Server provides REST API at http://localhost:3000. 
Configure environment.ts API URL to match.
