import e from 'express';
import persist from './dbAdapter.mjs';
import { Task } from './tasks.mjs';

/**
 * Initialize the storage mechanism.
 */
export function tasks_init() {
    persist.initStore('task_collection')
};

export async function createTask(req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let priority = req.body.priority;
    let deadline = req.body.deadline;
    let tags = req.body.tags;
    let createdBy = req.body.createdBy;
    let createdAt = req.body.createdAt;
    let assignee = req.body.assignee;
    let comments = req.body.comments;

    if (!id || !title || !description || !createdBy) {
        let reply = {
            success: false,
            message: 'Missing required fields',
            task: null
        }
        return res.status(400).send(reply);
    }

    let prev_task = await persist.find_tasks('task_collection', id);
    if (prev_task.length > 0) {
        let reply = {
            success: false,
            message: 'Task with same ID already exists',
            previous: prev_task[0]
        }
        return res.status(409).send(reply);
    }

    let task = new Task(id, title, description, status, priority, deadline, tags, createdBy, createdAt, null, assignee, [], comments, false);

    await persist.add_task('task_collection', task);

    let reply = {
        success: true,
        message: 'Task added',
        task: task
    }
    
    return res.status(200).send(reply);
}


export async function findTask(req, res) {
    let id = req.query.id;

    let tasks = await persist.find_tasks('task_collection', id);
    let reply;
    if (tasks.length === 0) {
        reply = {
            success: false,
            message: 'Task not found',
            task: null
        }
        return res.status(404).send(reply);
    }

    if (id) {
        reply = {
            success: true,
            message: 'Task found',
            task: tasks[0]
        }
    }

    else {
        reply = {
            success: true,
            message: 'Tasks found',
            task: tasks
        }
    }

    return res.status(200).send(reply);
}


export async function updateTask(req, res) {
    let task_id = req.query.id;
    let updatedInfo = req.body;
    let reply;

    let update_task = await persist.find_tasks('task_collection', task_id);

    if (update_task.length === 0) {
        reply = {
            success: false,
            message: 'Task not found',
            task: null
        }
        return res.status(404).send(reply);
    }

    update_task[0].updateField(updatedInfo);

    try {
        await persist.update_task('task_collection', task_id, update_task[0]);
        reply = {
            success: true,
            message: 'Task updated',
            task: update_task[0]
        }
        return res.status(200).send(reply);
    } catch (e) {
        reply = {
            success: false,
            message: e.message,
            task: null
        }
        return res.status(500).send(reply);
    }
}

export async function getTaskDetailByTimestamp(req, res) {

    let id = req.query.id;
    let timestamp = new Date(req.query.timestamp); // Convert timestamp to a number
    let reply;

    let task = await persist.find_tasks('task_collection', id);

    if (task.length === 0) {
        reply = {
            success: false,
            message: 'Task not found',
            task: null
        }
        return res.status(404).send(reply);
    }

    let taskHistoryDetail = task[0].getSpecificTimeHistory(timestamp);

    if (Object.keys(taskHistoryDetail).length > 0) {
        reply = {
            success: true,
            message: 'Task history found',
            task: taskHistoryDetail
        }
        return res.status(200).send(reply);
    }

    reply = {
        success: false,
        message: 'No history found for that timestamp',
        task: null
    }

    return res.status(404).send(reply);
}

export async function addTaskComment(req, res) {
    let id = req.query.id;
    let comment = req.body.comment;
    let commentedBy = req.body.commentedBy;
    let reply;

    if (!comment || !commentedBy) {
        reply = {
            success: false,
            message: 'Missing required fields',
            comment: null
        }
        return res.status(400).send(reply);
    }

    let task = await persist.find_tasks('task_collection', id);

    if (task.length === 0) {
        reply = {
            success: false,
            message: 'Task not found',
            comment: null
        }
        return res.status(404).send(reply);
    }

    task[0].addComment(comment, commentedBy);

    await persist.update_task('task_collection', id, task[0]);

    let updated_task = await persist.find_tasks('task_collection', id);

    if (updated_task) {
        reply = {
            success: true,
            message: 'Comment added',
            comment: updated_task[0].comments[updated_task[0].comments.length - 1]
        }
        return res.status(200).send(reply);
    }
    else {
        reply = {
            success: false,
            message: 'Comment not added',
            comment: null
        }
        return res.status(500).send(reply);
    }
}

export async function addTaskTags(req, res) {
    let id = req.query.id;
    let tags = req.body.tags;
    let reply;

    let task = await persist.find_tasks('task_collection', id);

    if (task.length === 0) {
        reply = {
            success: false,
            message: 'Task not found',
            tags: null
        }
        return res.status(404).send(reply);
    }

    for (let i = 0; i < tags.length; i++) {
        task[0].addTag(tags[i]);
    }

    await persist.update_task('task_collection', id, task[0]);

    reply = {
        success: true,
        message: 'Tags added',
        tags: task[0].tags
    }

    return res.status(200).send(reply);
}

export async function removeTaskTags(req, res) {
    let id = req.query.id;
    let tags = req.body.tags;
    let reply;

    let task = await persist.find_tasks('task_collection', id);

    if (task.length === 0) {
        reply = {
            success: false,
            message: 'Task not found',
            tags: null
        }
        return res.status(404).send(reply);
    }

    for (let i = 0; i < tags.length; i++) {
        task[0].removeTag(tags[i]);
    }

    await persist.update_task('task_collection', id, task[0]);

    reply = {
        success: true,
        message: 'Tags removed',
        tags: task[0].tags
    }

    return res.status(200).send(reply);
}