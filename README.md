# Browser Math
A simple webpage to practice basic math skills in. I am building this for my students, which is why all the content is in Finnish.

You can find the site running [here](https://matikkapelit.onrender.com).

## Current math games
- Basic multiplication tables
- Building expressions with basic operations from the given numbers and a result.

## How to run

### Set up MongoDB
1. Create an account at [MongoDB](https://www.mongodb.com/).
2. Follow the instructions on how to set up the database in MongoDB. In the end, you should have a connection string of this form:
   ```
   mongodb+srv://{{USER}}:{{PASSWORD}}@{{CLUSTER}}.8puucew.mongodb.net/?appName={{CLUSTER}}
   ```
3. Use the connection string in your ```.env``` file. You will need two variables: DEV_MONGODB_URI (database for testing) and MONGODB_URI (database for production).

### Running the server with the front-end in the 'dist' directory.

1. Clone the repository:
   ```
   git clone https://github.com/Jarimus/browser-math
   ```
2. Install dependencies in the backend directory:
   ```
   npm install
   ```
3. Start up the server:
   Use either ```npm run dev``` or ```npm run start``` depending on which database (test or production) you want to use.

### Running the front-end:

1. Install dependencies in the 'frontend' directory:
   ```
   npm install
   ```
2. Start up the front-end:
   ```
   npm run dev
3. If you want to access the database, remember to start the backend with ```npm run dev```.

### Patching the front-end the backend uses

1. Run ```npm run build:ui``` in the 'backend' directory. It will build and copy the dist directory from the frontend to the backend directory.
