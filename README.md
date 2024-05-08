# BugBuddy

## Overview

The BugBuddy application is a simplified version of GitHub Issues or Jira, designed to help users manage and track issues within a project. It provides essential features for viewing, adding, editing, and deleting issues, along with attributes to describe each issue.

## Features

- View a list of issues
- Filter issues by various parameters
- Add new issues with initial field values
- Edit and update existing issues
- Delete issues

## Issue Attributes

Each issue in the system has the following attributes:

- **Title**: A summary of the issue (freeform long text)
- **Owner**: The person assigned to the issue (freeform short text)
- **Status**: An indicator of the current status (a list of possible status values)
- **Creation Date**: The date when the issue was created (automatically assigned)
- **Effort Required**: The estimated effort required to address the issue (number of days, a number)
- **Due Date**: The estimated completion or due date for the issue (optional)

## Tech Stack

The BugBuddy application is built using the MERN stack, which consists of the following technologies:

- **MongoDB**: A NoSQL database for storing issue data
- **Express.js**: A web application framework for building APIs
- **React.js**: A JavaScript library for building user interfaces
- **Node.js**: A JavaScript runtime environment for server-side development
- **GrapghQL**: A data query and manipulation language for APIs and a query runtime engine

## Installation

To run the BugBuddy application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Access the application in your browser at `http://localhost:4000/public`.

## Usage

Once the application is running, you can perform the following actions:

- View the list of existing issues.
- Filter issues by various parameters such as status, owner, etc.
- Add new issues by providing the required information.
- Edit and update existing issues as needed.
- Delete issues that are no longer relevant.

## Contributing

Contributions to the BugBuddy application are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository and create your branch from `main`.
2. Make your changes and ensure the code passes linting checks.
3. Test your changes thoroughly.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).


