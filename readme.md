
# Frontend - ReactJS Setup Instructions

## Prerequisites
Before starting the ReactJS application, make sure you have the following installed:
- Node.js (version 16.x)
- npm (Node package manager)

### 1. Install Node.js (version 16)
Download and install Node.js (version 16.x) from the official website: https://nodejs.org/
Make sure to install the LTS version.

### 2. Verify Installation
After installation, verify Node.js and npm versions by running the following commands in your terminal:

```bash
node -v
npm -v
```

### 3. Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/yourusername/trainFoodUI.git
```

Replace `yourusername` with your GitHub username.

### 4. Navigate to the Project Directory
After cloning the repository, navigate to the frontend project directory:

```bash
cd trainFoodUI
```

### 5. Install Dependencies
In the project directory, install the necessary dependencies using npm:

```bash
npm install
```

This will install all the required packages listed in the `package.json` file.

### 6. Start the Development Server
To start the ReactJS development server, run the following command:

```bash
npm start
```

The development server should now be running at `http://localhost:3000/`.

### 7. Build the Project for Production (Optional)
If you want to build the project for production, use the following command:

```bash
npm run build
```

This will create an optimized build of your project in the `build/` directory.

## Troubleshooting
- If you encounter issues related to Node version compatibility, use a version manager like `nvm` (Node Version Manager) to ensure you are using the correct Node version (16.x).

## Conclusion
You have successfully set up and run the ReactJS frontend for the Train Food Ordering System.
