# Docker Setup Guide for Zone Clocker Application

This guide details the steps to set up a MySQL database in a Docker container and to run API and client containers for the Zone Clocker application.

## Prerequisites

- Docker installed on your machine.
- `db.sql` file located at `C:/Users/YourUser/Desktop/db.sql` (Update the path as per your file location).

## Setup Steps

### Step 1: Download Required Docker Images

Before setting up the containers, download the necessary Docker images.

#### MySQL Image

```bash
docker pull mysql
```

#### Zone Clocker API Image

```bash
docker pull nicoc12024/zone_clocker:api-tag
```

#### Zone Clocker Client Image

```bash
docker pull nicoc12024/zone_clocker:client-tag
```

### Step 2: Run the MySQL Container

This command creates a new Docker container named 'db' using the MySQL image. It sets up the MySQL server but doesn't create any database schemas yet.

```bash
docker run -d --name db -e MYSQL_ROOT_PASSWORD=root -p 3307:3306 mysql
```

### Step 3: Copy the Database Schema File into the Container

This step involves copying your database schema file from your local machine to the newly created MySQL container. Replace the file path with your schema file's location.

```bash
docker cp C:/Users/nicoc/Desktop/db.sql db:/db.sql
```

### Step 4: Create the Database Schema

Now, create a new database schema named 'zone_clocker' in the MySQL container.

```bash
docker exec -i db mysql -u root -proot -e "CREATE DATABASE zone_clocker;"
```

### Step 5: Import Database Tables

This command will import your table definitions and data into the 'zone_clocker' database from the previously copied 'db.sql' file.

```bash
docker exec -i db cat /db.sql | docker exec -i db mysql -u root -proot zone_clocker
```

### Step 6: Run the API Container

Run the API component of your application in a new container, linking it to the MySQL database.

```bash
docker run -d --name api -e DB_HOST=db -e DB_USER=root -e DB_PASSWORD=root -e DB_DATABASE=zone_clocker --link db:db -p 8800:8800 nicoc12024/zone_clocker:api-tag
```

### Step 7: Run the Client Container

Finally, start the client component in another container.

```bash
docker run -d --name client -p 3000:3000 nicoc12024/zone_clocker:client-tag
```

## Verification

After completing these steps, ensure that the containers are running properly and the application is accessible.

## Troubleshooting

If you encounter any issues, check the Docker container logs for any error messages and ensure all file paths are correctly specified.
