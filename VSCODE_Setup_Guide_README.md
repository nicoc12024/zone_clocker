
# Zone Clocker Application Setup Guide for VS Code

This guide outlines the steps to set up the Zone Clocker application for development in Visual Studio Code (VS Code), including running a local MySQL database, API, and client.

## Prerequisites

- Visual Studio Code (VS Code) with integrated terminal.
- Node.js and npm installed.
- MySQL Server installed and running.
- Git for cloning the repository.

## Setup Steps

### Step 1: Clone the Repository

Use the VS Code terminal to clone the repository:

```bash
git clone https://github.com/nicoc12024/zone_clocker.git 
```

### Step 2: Open the Project

Navigate to the cloned directory and open it in VS Code.

### Step 3: Database Setup

Assuming you have the `db.sql` file in your project directory, set up the MySQL database:

```sql
CREATE DATABASE zone_clocker;
USE zone_clocker;
SOURCE path/to/your/db.sql;
```

Adjust the file path to where you have your `db.sql`.

### Step 4: Install Dependencies

Navigate to the API and client directories and run:

```bash
npm install
```

This installs required dependencies.

### Step 5: Configure Environment

Set up the necessary `.env` files in both the API and client directories with the required environment variables.
SECRET_KEY=your_secret_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=zone_clocker

### Step 6: Run the API

In the API directory, start the server:

```bash
npm run start
```

### Step 7: Run the Client

In a new terminal tab, navigate to the client directory and start the client:

```bash
npm run dev
```

## Verification

Ensure the API and client are running correctly:

- API should be accessible on `http://localhost:8800`
- Client should be available on `http://localhost:3000`

## Troubleshooting

- Check VS Code console for errors.
- Verify environment variables and database connections.
- Confirm all dependencies are installed.
