import app from '../app.mjs';
import { suite, test } from 'node:test';
import assert from 'assert';
import request from 'supertest';

suite('Checking the API calls', () => {

  // Test for createTask
  test('Creates a new task', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.post('/task').send({
      id: '1',
      title: 'Test Task',
      description: 'This is a test task',
      status: 'open',
      priority: 'high',
      deadline: '2024-12-31',
      tags: ['test'],
      createdBy: 'user1',
      createdAt: '2024-12-01',
      assignee: 'user2',
      comments: []
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Task added');
  });

  test('Returns 400 if required fields are missing', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.post('/task').send({
      id: '1'
    });
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Missing required fields');
  });

  test('Returns 409 if task with same ID already exists', async () => {
    let server_agent = request.agent(app);
    await server_agent.post('/task').send({
      id: '1',
      title: 'Test Task',
      description: 'This is a test task',
      status: 'open',
      priority: 'high',
      deadline: '2024-12-31',
      tags: ['test'],
      createdBy: 'user1',
      createdAt: '2024-12-01',
      assignee: 'user2',
      comments: []
    });
    let response = await server_agent.post('/task').send({
      id: '1',
      title: 'Duplicate Task',
      description: 'This is a duplicate task',
      status: 'open',
      priority: 'high',
      deadline: '2024-12-31',
      tags: ['test'],
      createdBy: 'user1',
      createdAt: '2024-12-01',
      assignee: 'user2',
      comments: []
    });
    assert.strictEqual(response.status, 409);
    assert.strictEqual(response.body.message, 'Task with same ID already exists');
  });

  // Test for findTask
  test('Returns a task by id', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.get('/task').query({ id: '1' });
    assert.strictEqual(response.status, 200);
    assert(Object.keys(response.body.task).length > 0);
    assert.strictEqual(response.body.task.id, '1');
  });

  test('Returns 404 if task not found', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.get('/task').query({ id: '999' });
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Task not found');
  });

  // Test for updateTask
  test('Updates a task', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.put('/task').query({ id: '1' }).send({ title: 'Updated Task' });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Task updated');
  });

  test('Returns 404 if task not found', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.put('/task').query({ id: '999' }).send({ title: 'Updated Task' });
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Task not found');
  });

  // Test for getTaskDetailByTimestamp
  test('Returns task history detail by timestamp', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.get('/task/history').query({ id: '1', timestamp: '2025-01-01T00:00:00Z' });
    assert.strictEqual(response.status, 200);
    assert(new Date(response.body.task.updatedAt) <= new Date('2025-01-01T00:00:00Z'));
  });

  test('Returns 404 if no history found for timestamp', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.get('/task/history').query({ id: '1', timestamp: '2024-10-31T00:00:00Z' });
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'No history found for that timestamp');
  });

  // Test for addTaskComment
  test('Adds a comment to a task', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.post('/task/comment').query({ id: '1' }).send({ comment: 'New comment', commentedBy: 'user1' });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Comment added');
  });

  test('Returns 404 if task not found', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.post('/task/comment').query({ id: '999' }).send({ comment: 'New comment', commentedBy: 'user1' });
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Task not found');
  });

  test('Returns 400 if required fields are missing for comment', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.post('/task/comment').query({ id: '1' }).send({ comment: '' });
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Missing required fields');
  });

  // Test for addTaskTags
  test('Adds tags to a task', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.post('/task/tag').query({ id: '1' }).send({ tags: ['newTag'] });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Tags added');
  });

  test('Returns 404 if task not found', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.post('/task/tag').query({ id: '999' }).send({ tags: ['newTag'] });
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Task not found');
  });

  // Test for removeTaskTags
  test('Removes tags from a task', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.delete('/task/tag').query({ id: '1' }).send({ tags: ['oldTag'] });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Tags removed');
  });

  test('Returns 404 if task not found', async () => {
    let server_agent = request.agent(app);
    let response = await server_agent.delete('/task/tag').query({ id: '999' }).send({ tags: ['oldTag'] });
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Task not found');
  });

});