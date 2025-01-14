# Task Tracking System

## Overview

The Task Tracking System is a project management tool designed to help teams and individuals manage their tasks efficiently. This system allows users to create, update, and track tasks, assign priorities, set deadlines, and add comments and tags to tasks. It also provides a Kanban board view for visual task management.

## Features

### Task Management
- **Create Task**: Users can create new tasks with details such as title, description, priority, deadline, and assignee. Implemented in [`taskManager.createTask`](taskManager.mjs).
- **Update Task**: Users can update task details including title, description, priority, deadline, and assignee. Implemented in [`taskManager.updateTask`](taskManager.mjs).
- **Delete Task**: Users can delete tasks that are no longer needed.
- **Task History**: Users can view the history of a task to see changes made over time. Implemented in [`taskManager.getTaskDetailByTimestamp`](taskManager.mjs).

### Task Attributes
- **Priority Levels**: Tasks can be assigned priority levels (Low, Medium, High) to indicate their importance.
- **Deadlines**: Users can set deadlines for tasks to ensure timely completion.
- **Tags**: Users can add tags to tasks for better categorization and filtering. Implemented in [`taskManager.addTaskTags`](taskManager.mjs) and [`taskManager.removeTaskTags`](taskManager.mjs).
- **Comments**: Users can add comments to tasks for better collaboration and communication. Implemented in [`taskManager.addTaskComment`](taskManager.mjs).

### Views
- **Kanban Board**: A visual representation of tasks in different states (To Do, In Progress, Done, etc.) using a Kanban board. Implemented in [public/task_collection.html](public/task_collection.html).
- **List View**: A tabular view of all tasks with details such as ID, title, description, deadline, and state. Implemented in [public/list_view.html](public/list_view.html).

### Search and Filter
- **Find Task**: Users can search for tasks by ID and view their details. Implemented in [public/find_task.html](public/find_task.html).
- **Filter by Tags**: Users can filter tasks based on tags to find relevant tasks quickly.

### User Interaction
- **Edit Mode**: Users can switch to edit mode to update task details.
- **Drag and Drop**: Tasks can be moved between different states on the Kanban board using drag and drop.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ah03-khurram/Web-Based-Task-Tracking-System.git
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Ensure MongoDB is installed and running on your machine.
    - Create a database named `TaskTracking`.
    - Import the initial data from [task_database.json](/task_database.json) into the `task_collection` collection:
        ```sh
        mongoimport --db TaskTracking --collection task_collection --file task_database.json --jsonArray
        ```

4. Start the server:
    ```sh
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. **Create a Task**: Navigate to the "Create New Task" tab, fill in the task details, and click "Create Task". Implemented in [task_creation.html](/public/task_creation.html).
2. **View Tasks**: Use the `List View` or `Kanban Board` to view all tasks.
3. **Update a Task**: Click on a task in the `List View` or `Kanban Board` to view its details. Switch to edit mode to update the task.
4. **Add Comments and Tags**: Use the task details view to add comments and tags to a task.
5. **Search for a Task**: Use the `Find Task` tab to search for a task by ID.

## Unit Testing

To run the unit tests for this project, follow these steps:

1. Ensure all dependencies are installed:
    ```sh
    npm install
    ```

2. Run the tests:
    `node --test .\tests\apiTests.mjs`

The unit tests are located in the [tests](/tests/apiTests.mjs) directory and cover various aspects of the application, including task creation, updating, deletion, and retrieval.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Acknowledgements

- **GitHub Kanban Board**: Ideas for UI and many of its features.

## Contact

For any questions or suggestions, please contact [khurrama@mun.ca](mailto:khurrama@mun.ca).
