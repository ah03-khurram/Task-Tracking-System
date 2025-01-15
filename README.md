# Task Tracking System

## Overview

The Task Tracking System is a project management tool designed to help teams and individuals manage their tasks efficiently. This system allows users to create, update, and track tasks, assign priorities, set deadlines, and add comments and tags to tasks. It also provides a Kanban board view for visual task management.

## Features

### Task Management
- **Create Task**: Users can create new tasks with details such as title, description, priority, deadline, and assignee. Implemented in [`taskManager.createTask`](taskManager.mjs).
    

https://github.com/user-attachments/assets/334a543d-da04-4820-ae62-ee05bd93fa1e


- **Update Task**: Users can update task details including title, description, priority, deadline, and assignee. Implemented in [`taskManager.updateTask`](taskManager.mjs).
    

https://github.com/user-attachments/assets/e10b07e4-2615-4135-b618-49794a7b492c


- **Task History**: Users can view the history of a task to see changes made over time. Implemented in [`taskManager.getTaskDetailByTimestamp`](taskManager.mjs).
    


https://github.com/user-attachments/assets/91fd8607-d8b6-4760-b930-1ee8bafce746


### Task Attributes
- **Priority Levels**: Tasks can be assigned priority levels (Low, Medium, High) to indicate their importance.
    

https://github.com/user-attachments/assets/9eb83c17-e175-401f-94b2-ccb4dd318bb8


- **Deadlines**: Users can set deadlines for tasks to ensure timely completion.
    

https://github.com/user-attachments/assets/3151d77f-6b70-4d0c-9a9c-2953e2277c2c


- **Tags**: Users can add tags to tasks for better categorization. Implemented in [`taskManager.addTaskTags`](taskManager.mjs) and [`taskManager.removeTaskTags`](taskManager.mjs).
    

https://github.com/user-attachments/assets/bc91e76e-3f32-4e9c-887e-d80f81991483


- **Comments**: Users can add comments to tasks for better collaboration and communication. Implemented in [`taskManager.addTaskComment`](taskManager.mjs).
    


https://github.com/user-attachments/assets/53515e64-6aa5-45d7-8988-e20e357237eb


### Views
- **Kanban Board**: A visual representation of tasks in different states (To Do, In Progress, Done, etc.) using a Kanban board. Implemented in [public/task_collection.html](public/task_collection.html).
    ![Kanban Board](Pictures/Board%20View.png)
- **List View**: A tabular view of all tasks with details such as ID, title, description, deadline, and state. Implemented in [public/list_view.html](public/list_view.html).
    ![List View](Pictures/List%20View.png)

### Search and Filter
- **Find Task**: Users can search for tasks by ID and view their details. Implemented in [public/find_task.html](public/find_task.html).
    


https://github.com/user-attachments/assets/399eafaf-718a-4e33-8561-8b05d798df5e


### User Interaction
- **Edit Mode**: Users can switch to edit mode to update task details.
- **Drag and Drop**: Tasks can be moved between different states on the Kanban board using drag and drop.
    <video controls src="Videos/Drag and Drop.mp4" title

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ah03-khurram/Task-Tracking-System.git
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

## Unit Testing

To run the unit tests for this project, follow these steps:

1. Ensure all dependencies are installed:
    ```sh
    npm install
    ```
2. Clear the database:
    ```sh
    mongo TaskTracking --eval "db.task_collection.drop()"
    ```
3. Run the tests:
    ```sh
    npm test
    ```

The unit tests are located in the [tests](/tests/apiTests.mjs) directory and cover various aspects of the application, including task creation, updating, deletion, and retrieval.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Acknowledgements

- **GitHub Kanban Board**: Ideas for UI and many of its features.

## Contact

For any questions or suggestions, please contact [khurrama@mun.ca](mailto:khurrama@mun.ca).
