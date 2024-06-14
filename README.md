# pdf-viewer-MERN

pdf viewer using MERN

Setup Instructions

1. Clone the Repository : https://github.com/sakunadew99/pdf-viewer-MERN

2. Install Dependencies:
   Navigate to the 'backend' directory and run:

   npm install

   Navigate to the 'frontend' directory and run:

   npm install

3. Environment Variables:

   - Create a '.env' file in the 'backend' directory and add the following environment variables:

     MONGODB_URI=your_mongodb_uri,
     NODE_ENV= production,
     PORT=5000,
     JWT_SECRET = your_JWT_SECRET_KEY

4. **Run the Application**:

   - To start the backend server, navigate to the 'backend' directory and run:

     nodemon server.js

   - To start the frontend application, navigate to the 'frontend' directory and run:

     npm start
