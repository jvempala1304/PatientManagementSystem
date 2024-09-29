# Patient Management System

This is a Patient Management System built with React for the frontend and Node.js with MongoDB for the backend. The system allows for efficient appointment scheduling, patient record management, and prescription handling.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/your-repo/patient-management-system.git
   ```

2. Navigate to the project directory:

   ```
   cd patient-management-system
   ```

3. Install dependencies for both the frontend and backend.

   For the frontend (UI):

   ```
   cd UI
   npm install
   ```

   For the backend (API):

   ```
   cd API
   npm install
   ```

4. Create a `.env` file in the `API` directory and add the following environment variables:
   ```
   MONGODB_API_KEY=your_mongodb_api_key
   API_PORT=your_preferred_port
   ```

### Running the Project

1. Start the backend server:

   ```
   cd API
   npm start
   ```

2. Start the frontend server:

   ```
   cd UI
   npm start
   ```

3. Open your browser and go to `http://localhost:3000` to interact with the application.

## Features

- Appointment scheduling
- Patient record management
- Prescription handling
- User-friendly dashboard

## License

This project is licensed under the MIT License.
