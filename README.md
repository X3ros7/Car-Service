# How to run this project
To run this project, you need:
- Docker
- Node and npm
## Set up a .env file 
Create a .env file and insert database settings (like in .env.example file).
It should look like this:
```
# .env file
DATABASE_HOST=localhost 
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=practice
```
## Install dependencies
```bash
npm install
```
## Run docker compose for database
```bash
docker compose up
```
## Run NestJS app 
```bash
npm run start:dev
```
The app will run on http://localhost:3000/api
pgAdmin4 will run on http://localhost:8080