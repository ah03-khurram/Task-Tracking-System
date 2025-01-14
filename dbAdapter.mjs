/**
 * 
 * Mongo implementation of persistence interface for courses project.
 * 
 * @module dbAdapter
 * @author Khurram Ahmed
 * @version 0.1
 */

import { MongoClient } from 'mongodb';
import { Task } from './tasks.mjs' ;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
var db;

/**
 * initialize the persistance tech - Mongo
 * 
 * @param {string} cSetName - name of the storage segment to use - Mongo collection
 * @throws an error if the tech (eg database) cannot be initialized
 * @returns the object corresponding to the storage segment for this tech
 */
export async function initStore(cSetName = 'task_collection') {
    try {
        // Connect the client to the server
        await client.connect();
        // Our db name is TaskTracking
        db = await client.db('TaskTracking');
        console.log("Connected successfully to mongoDB");

        // set a connection timeout
        setTimeout( () => client.close(), 3000 )

    } catch (err) {
        throw err;
    }

    return await db.collection(cSetName);
}

/* Internal function to get connection */
async function _get_tasks_collection(cSetName) {
    // Connect the client to the server
    await client.connect();
    // Our db name is TaskTracking
    db = await client.db('TaskTracking');
    // console.log("Connected successfully to mongoDB");  
    return await db.collection(cSetName);
};

async function _close_collection() {
    // await client.close();
    // return 'Connection closed';
};

/**
 * Close the access to the persistance db. Call when db session is finished. 
 * 
 * @param string cSetName - name of the storage segment to close
 * @returns string confirming close.
 */
async function closeStore(cSetName) {
    await client.close();
    return 'Connection closed';
};

/**
 * store/persist a contact
 * 
 * @param {string} cSetName - name of the storage segment task_collection will be added to 
 * @param {OfferingSection} c - Task to add
 * @returns true - if course add is successful
 * @throws an error if the Task was not added 
 */
async function add_task(cSetName, t) {
    let collection = await _get_tasks_collection(cSetName);
    let mongoObj = await collection.insertOne(t);
    _close_collection();
    return true;
}

/**
 * update a contact info in the db/persistance tech
 * 
 * @param {string} cSetName - name of the storage segment contact will be added to 
 * @param {string} who - current name of contact to update
 * @param {Contact} c - update information
 * @returns 'Contact was deleted' - if contact delete is successful
 * @throws an error if task_id was not found 
 */
async function update_task(cSetName, task_id, updatedInfo) {
    let collection = await _get_tasks_collection(cSetName);
    
    let obj = await collection.replaceOne({ id: task_id }, updatedInfo);
    _close_collection();
    if (obj.modifiedCount > 0) {
        return 'Task correctly updated.';
    } else {
        throw new Error(`${task_id} not found`)
    }
}

/**
 * retrieve the course info in the db/persistance tech
 * 
 * @param {string} cSetName - name of the storage segment task_collection will be added to 
 * @param {string} id - id of the Task to retrieve
 * @returns an array of Task objects matching the search criteria. 
 * @throws an error if who was not found 
 */
async function find_tasks(cSetName, id = null) {
    let collection = await _get_tasks_collection(cSetName);
    let findspec = {};
    if (id) findspec.id = id;
    let objs = await collection.find(findspec).toArray();
    _close_collection();
    return objs.map(o => new Task(o.id, o.title, o.description, o.status, o.priority, o.deadline, o.tags, o.createdBy, o.createdAt, o.updatedAt, o.assignee, o.history, o.comments, true));
}

export default { closeStore, initStore, add_task, update_task, find_tasks };