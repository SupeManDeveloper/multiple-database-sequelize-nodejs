# Connecting to Multiple Databases with Nodejs and Sequelize

In many applications, it is necessary to interact with more than one database. This is particularly common when different parts of an application require separate databases, such as user authentication, analytics, or a microservices architecture. **Node.js** and **Sequelize** offer a flexible solution for connecting to multiple databases and managing them through a single application.

## What is Sequelize?

[Sequelize](https://sequelize.org/) is a promise-based Node.js ORM (Object-Relational Mapping) library for relational databases like PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It simplifies database interaction by allowing developers to work with database tables as JavaScript objects. Sequelize also provides a way to manage database migrations, seed data, and perform complex queries using a higher-level API.

## Why Connect to Multiple Databases?

Connecting to multiple databases might be necessary for a variety of reasons:

- **Separation of Concerns**: Different databases might store different kinds of data (e.g., one for user data, another for logging, and another for analytics).
- **Microservices**: In a microservices architecture, each service may have its own database, and you may need to connect to several databases to interact with different services.
- **Legacy Systems**: Sometimes, an application may need to integrate with multiple legacy systems that use different databases.
- **Scaling**: Distributing load and data across multiple databases can help scale the application horizontally.

# Project Scripts Usage

This file describes the available scripts in the `package.json` and how to use them for development, migration, and seeding.

## Available Scripts

### `dev`
Runs the development server using `nodemon` for automatic restarts on file changes.

`bun run dev`

### `build`
Description: Cleans the ./build directory using rimraf and then compiles the TypeScript files to JavaScript using tsc.

Usage: Run this command to build the project before production deployment.

`bun run build`

### `start`
Description: Starts the application using nodemon, but this time it looks for src/app.js instead of app.ts. Useful for when the TypeScript files are already compiled to JavaScript.

Usage: Start the app in production or testing environments after building the TypeScript code.

`bun run start`

### `sample:*:migrate`
This command generates a new Sequelize model named **`*`** within the `./db/models/*` directory. The model has one attribute `name` of type `string`.

`bun run sample:*:migrate`

### `sample:*:seed`
This command generates a new seed file named demo-`*` within the ./db/models/* directory. Seed files are typically used to populate the database with initial data.

`bun run sample:*:seed`

### `*:migrate`
This command runs the migration for the `*` environment. It first builds the project using `bun run build`, then performs the migration.

`bun run *:migrate`

# Tech Stack

This project uses a combination of modern tools and libraries to handle backend functionality, database management, development workflow, and more. Below is an overview of the key technologies and libraries used in the stack.

## Backend Framework: Express

- **Express**: A minimal and flexible Node.js web application framework that provides robust features for building APIs and web applications.
  - **Usage**: Used to handle routing, middleware, and HTTP requests in the application. Express simplifies server-side code and integrates easily with other libraries and tools.

## Database Management: PostgreSQL with Sequelize

- **PostgreSQL**: A powerful, open-source relational database system that uses and extends the SQL language. It provides strong ACID compliance, extensibility, and scalability.
  - **Usage**: The primary database used for storing and managing the application's data.
  
- **Sequelize**: A promise-based Node.js ORM (Object-Relational Mapper) that supports multiple SQL dialects, including PostgreSQL.
  - **Usage**: Used to interact with the PostgreSQL database through models, migrations, and seeders. It abstracts away raw SQL queries and allows for managing data with JavaScript code.

- **pg & pg-hstore**: PostgreSQL client for Node.js and a module for handling JSON serialization for PostgreSQL.
  - **Usage**: `pg` is used as the database driver for PostgreSQL, and `pg-hstore` handles serializing and deserializing JSON data when working with PostgreSQL's JSONB field types.

## Development & Build Tools

- **TypeScript**: A superset of JavaScript that adds static types, enabling better development tools and improving maintainability and scalability.
  - **Usage**: All backend code is written in TypeScript, ensuring strong type-checking and better development practices.
  
- **ts-node**: A TypeScript execution environment for Node.js, enabling the direct execution of TypeScript files without compiling them manually.
  - **Usage**: Allows for running TypeScript code directly without the need for a separate build step during development.

- **nodemon**: A utility that monitors for changes in files and automatically restarts the application.
  - **Usage**: It is used during development to automatically restart the server when changes are made to the TypeScript or JavaScript files, saving time on manual restarts.

- **rimraf**: A utility to recursively remove files and directories, typically used to clean up build or temporary files.
  - **Usage**: Used in the build process to clean the `./build` directory before compiling the project.

- **tsconfig-paths**: A library for resolving modules based on the paths defined in the `tsconfig.json` file.
  - **Usage**: Helps with module resolution, particularly when using custom path mappings in `tsconfig.json`.

## Environment Configuration

- **dotenv**: A module to load environment variables from a `.env` file into `process.env`.
  - **Usage**: Used to manage sensitive information (e.g., database credentials, API keys) and environment-specific settings without hardcoding values in the codebase.

## Command Line Tools

- **sequelize-cli**: Command-line interface for Sequelize, allowing for database migrations, seeding, and other tasks.
  - **Usage**: Used for running migrations and seeds, ensuring the database schema and data are up to date.

## UUID Generation

- **uuid**: A library for generating universally unique identifiers (UUIDs).
  - **Usage**: Used to generate unique IDs for records in the database, such as for primary keys or identifying unique entities.

## Web Development & Bundling: Bun

- **Bun**: A fast all-in-one JavaScript runtime like Node, but with a focus on performance. Bun includes a JavaScript engine, bundler, transpiler, and task runner.
  - **Usage**: Bun is used in this project as a fast and efficient alternative to traditional task runners like npm, yarn, or gulp. It's integrated with build and migration scripts, like `bun run staging:migrate` or `bun run staging:seed`, to speed up the development and deployment workflow. Bun helps reduce the time for starting up and running tasks, offering better performance than traditional tools.
  
  - **Key Features**:
    - **Bundler**: Efficiently bundles JavaScript, CSS, and other assets.
    - **Transpiler**: Uses the same engine to transpile JavaScript and TypeScript faster.
    - **Task Runner**: Runs scripts (e.g., migrations, seeds) with minimal overhead.
    - **Fast**: Compared to Node.js, Bun offers significant speed improvements in many workflows.

## Version Control & Collaboration

- **Git**: A distributed version control system for tracking changes in source code during software development.
  - **Usage**: Used for source control to manage project changes, track versions, and collaborate with other developers.

## Deployment & Containerization

- **Docker**: A platform for developing, shipping, and running applications in containers, ensuring consistency across different environments.
  - **Usage**: While not explicitly stated in the project, Docker is typically used for containerizing the application for deployment and ensuring that the environment is consistent across local and production environments.

---

## Overview of Key Tools

| Tool/Library         | Description                                                                 | Usage                                                    |
|----------------------|-----------------------------------------------------------------------------|----------------------------------------------------------|
| **Express**           | Web framework for Node.js                                                    | Server-side routing and HTTP request handling            |
| **PostgreSQL**        | Relational database management system                                        | Data storage and management                              |
| **Sequelize**         | ORM for Node.js to interact with SQL databases                               | Database models, migrations, and seeders                 |
| **pg**                | PostgreSQL client for Node.js                                                | Database communication with PostgreSQL                   |
| **pg-hstore**         | Module for handling JSON serialization in PostgreSQL                         | Serialize/deserialize JSON data in PostgreSQL            |
| **TypeScript**        | Superset of JavaScript with static types                                     | Strong typing for better maintainability and safety      |
| **nodemon**           | Development tool for automatically restarting Node.js applications          | Auto-restart server on file changes during development   |
| **ts-node**           | TypeScript execution environment for Node.js                                 | Run TypeScript code directly without compiling           |
| **rimraf**            | Utility for removing files and directories                                  | Clean up directories (e.g., `./build` before building)   |
| **dotenv**            | Loads environment variables from `.env` files                                | Manage environment-specific configurations              |
| **sequelize-cli**     | CLI tool for Sequelize ORM                                                   | Manage database migrations, models, and seeders          |
| **uuid**              | Generates universally unique identifiers (UUIDs)                             | Generate unique IDs for database records                 |
| **Bun**               | Fast JavaScript runtime and task runner                                     | Run scripts, bundle assets, and transpile code faster    |
| **Git**               | Distributed version control system                                           | Source control and collaboration                         |
| **Docker**            | Containerization platform                                                    | Deploy and manage applications in containers             |

## Summary

The tech stack used in this project includes a combination of tools and libraries that streamline backend development, database management, and deployment. Express handles web server tasks, PostgreSQL is used as the relational database, and Sequelize provides an easy-to-use ORM for interacting with the database. TypeScript ensures better maintainability with static typing, while tools like `nodemon`, `rimraf`, and `ts-node` facilitate development and build processes. Bun, as a fast runtime and task runner, enhances the overall efficiency of handling scripts and builds. With these technologies, the project aims to offer a robust and scalable solution for handling backend services and database operations.
