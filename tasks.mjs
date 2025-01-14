export class Task {
    constructor(
        id,
        title,
        description = '',
        status = 'To Do',        // Statuses: "To Do", "In Progress", "Backlog", "In Review", "Done"
        priority = 'Medium',     // Possible priorities: "Low", "Medium", "High"
        deadline = null,         // Date or null if no deadline
        tags = [],
        createdBy = '',          // Creator of the task
        createdAt = new Date(),  // Timestamp for task creation
        updatedAt = new Date(),  // Timestamp for last update
        assignee = '',
        history = [],            // Array to log history changes
        comments = [],            // Array to store comments on the task
        reterivingFromDB = false
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.deadline = deadline;
        this.tags = tags;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = (history.length <= 1)? this.createdAt: updatedAt; // Initialized to creation time
        this.assignee = assignee;
        this.history = history;          // Array to log history changes
        this.comments = comments;   // Array to store comments
        if (!reterivingFromDB){
            this.history_update();
        }
    }

    /**
     * Update a field and add an entry to the history
     * @param {Object} upgradeInfo - Object with the field to update and the new value
     */
    updateField(upgradeInfo) {
        
        let updateHistory = false;
        for (let field in upgradeInfo) {
            if (this[field] !== undefined && this[field] !== upgradeInfo[field]) {
                updateHistory = true;
                this[field] = upgradeInfo[field];
            }
        }
        if (updateHistory) {
            this.history_update();  // Update the task's history log
        }
    }

    /**
     * Add a comment to this task
     * @param {string} commentText - Text of the comment
     * @param {string} commentedBy - User making the comment
     */
    addComment(commentText, commentedBy) {
        let timestamp = new Date();
        this.comments.push({
            text: commentText,
            commentedBy: commentedBy,
            timestamp: timestamp
        });
        this.updatedAt = timestamp;  // Update the task's last modified timestamp
        this.history_update();
    }

    /**
     * Get all comments on the task
     * @returns {Array} - Array of comments with text, user, and timestamp
     */
    getComments() {
        return this.comments;
    }

    /**
     * Add a tag to this task.
     * @param {string} tag - The tag to add.
     */
    addTag(tag) {
        let updateHistory = false;
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
            updateHistory = true;
        }
        if (updateHistory) {
            this.history_update();
        }
    }

    /**
     * Remove a tag from this task.
     * @param {string} tag - The tag to remove.
     */
    removeTag(tag) {
        let updateHistory = false;
        if (this.tags.includes(tag)) {
            this.tags = this.tags.filter(existingTag => existingTag !== tag);
            updateHistory = true;
        }
        if (updateHistory) {
            this.history_update();
        }
    }


    /**
     * Get the task's history log
     * @returns {Array} - Array of history entries
     */
    getHistory() {
        return this.history;
    }

    /**
     * 
     * @param {string} timestamp - The ISO timestamp to retrieve state at
     * @returns {Object} - The state of the task at the given timestamp
     */
    getSpecificTimeHistory(timestamp){
        let taskHistory;
        for (let i = 0; i < this.history.length; i++) {
            if (this.history[i]["updatedAt"] <= timestamp) {  // Find the most recent history entry before the timestamp
                taskHistory = this.history[i];
            }
        }
        const taskState = {};
        if (taskHistory) {
            taskState.id = taskHistory.id;
            taskState.title = taskHistory.title;
            taskState.description = taskHistory.description;
            taskState.status = taskHistory.status;
            taskState.priority = taskHistory.priority;
            taskState.deadline = taskHistory.deadline;
            taskState.tags = taskHistory.tags;
            taskState.createdBy = taskHistory.createdBy;
            taskState.createdAt = taskHistory.createdAt;
            taskState.assignee = taskHistory.assignee;
            taskState.updatedAt = taskHistory.updatedAt;
            taskState.comments = taskHistory.comments;
        }
        return taskState;
    }

    /**
     * Updates the history log with the current state of the task
     */
    history_update() {
        let timestamp = new Date();
        this.updatedAt = timestamp;
        this.history.push({
            id : this.id,
            title : this.title,
            description : this.description,
            status : this.status,
            priority : this.priority,
            deadline : this.deadline,
            tags : this.tags,
            createdBy : this.createdBy,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt,
            assignee : this.assignee,
            comments : this.comments,
        });
    }
}
