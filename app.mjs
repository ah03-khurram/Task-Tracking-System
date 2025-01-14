import express from 'express';
import { tasks_init, createTask, findTask, updateTask, getTaskDetailByTimestamp, addTaskComment, addTaskTags, removeTaskTags } from './taskManager.mjs';
import path from 'path'

/**
 * Initializes an Express application.
 * 
 * @constant {Object} app - The Express application instance.
 */
const app = express();

app.use(express.json());// support json encoded bodies
app.use(express.urlencoded({ extended: true })); //incoming objects are strings or arrays

tasks_init();  // Initialize the task manager 

// Static Middleware
app.use(express.static(path.join(path.resolve(), 'public')));

app.get('/', (req, res) => {
    res.redirect('/task_collection.html');
});
app.post('/task', createTask);
app.get('/task', findTask);
app.get('/tasks', findTask)
app.put('/task', updateTask);
app.get('/task/history', getTaskDetailByTimestamp);
app.put('/task/priority', updateTask);
app.post('/task/Comment', addTaskComment);
app.post('/task/tag', addTaskTags);
app.delete('/task/Tag', removeTaskTags);
app.put('/task/deadline', updateTask);
app.put('/task/assign', updateTask);

export default app