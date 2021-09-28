module.exports = function sortCategoriesForInsert (inputJson) {
    const data = JSON.parse(inputJson);
    var queue = [];
    var ret = [];
    var mp = new Map();

    // Turn input data into a Map keyed to parent_id; elements with null parent_id 
    // are pushed to a queue for later.
    // Map values are stored as arrays to allow for multiple elements with the same parent.
    for (const el of data) {
        const pid = el.parent_id;
        if (pid == null) {
            queue.push(el);
        } else if (mp.has(pid)) {
            mp.get(pid).push(el)
        } else {
            mp.set(pid, [el]);
        }
    }

    // Iterate through parent elements in queue, keying into map with their ids
    // to get their children. Children are added to a new queue, and the old queue 
    // is moved to ret.
    while (ret.length != data.length) {
        var temp = [];
        
        for (const el of queue) {
            if (mp.has(el.id)) {
                temp.push(...mp.get(el.id));
            }
        }

        ret.push(...queue);
        queue = temp;
    }

    return JSON.stringify(ret);
}
