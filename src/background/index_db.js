import async from 'async'

const CHECK_DB_SUPPORT = proceed => {
    if (!window.indexedDB) return proceed('INDEX_DB_NOT_SUPPORT')

    proceed()
}
const CONNECT_DB = (db_name, collections, proceed) => {
    let db
    const REQUEST = window.indexedDB.open(db_name)

    REQUEST.onerror = event => proceed('ERROR_OPEN_DB')

    REQUEST.onupgradeneeded = event => {
        db = event.target.result

        for (collection_name of collections)
            db.createObjectStore(collection_name, { autoIncrement: true })
    }

    REQUEST.onsuccess = event => {
        db = event.target.result

        proceed(null, db)
    }
}
const CREATE_MANY = (db, collection_name, data, proceed) => {
    const TRANSACTION = db.transaction(collection_name, "readwrite")
    const COLLECTION = TRANSACTION.objectStore(collection_name)

    data.forEach(r => COLLECTION.add(r))

    TRANSACTION.onerror = () => proceed('ERROR_CREATE')
    TRANSACTION.oncomplete = () => proceed()
}
const FIND_BY_KEY = (db, collection_name, key, proceed) => {
    const TRANSACTION = db.transaction(collection_name, "readonly")
    const COLLECTION = TRANSACTION.objectStore(collection_name)

    const REQUEST = COLLECTION.get(key)

    TRANSACTION.onerror = () => proceed('ERROR_READ')
    REQUEST.onsuccess = (event) => proceed(null, event.target.result)
}
const FIND = (db, collection_name, proceed) => {
    const TRANSACTION = db.transaction(collection_name, "readonly")
    const COLLECTION = TRANSACTION.objectStore(collection_name)

    const REQUEST = COLLECTION.openCursor()
    let result = []

    TRANSACTION.onerror = () => proceed('ERROR_READ')
    REQUEST.onsuccess = (event) => {
        let cursor = event.target.result

        if (cursor) {
            result.push(cursor.value)
            cursor.continue()
            return
        }

        proceed(null, result)
    }
}
const FIND_ALL = (db, collection_name, proceed) => {
    const TRANSACTION = db.transaction(collection_name, "readonly")
    const COLLECTION = TRANSACTION.objectStore(collection_name)

    TRANSACTION.onerror = () => proceed('ERROR_READ')
    COLLECTION.getAll().onsuccess = event => proceed(null, event.target.result)
}
const FIND_ONE = (db, collection_name, key, value, proceed) => {
    const TRANSACTION = db.transaction(collection_name, "readonly")
    const COLLECTION = TRANSACTION.objectStore(collection_name)

    const REQUEST = COLLECTION.index(key)

    TRANSACTION.onerror = () => proceed('ERROR_READ')
    REQUEST.get(value).onsuccess = event => proceed(null, event.target.result)
}
const DELETE_MANY = (db, collection_name, proceed) => {
    const TRANSACTION = db.transaction(collection_name, "readwrite")
    const COLLECTION = TRANSACTION.objectStore(collection_name)

    const REQUEST = COLLECTION.clear()

    TRANSACTION.onerror = () => proceed('ERROR_READ')
    REQUEST.onsuccess = event => proceed()
}
// function update_record(record) {
//     if (db) {
//         const put_transaction = db.transaction("roster", "readwrite");
//         const objectStore = put_transaction.objectStore("roster");
//         return new Promise((resolve, reject) => {
//             put_transaction.oncomplete = function () {
//                 console.log("ALL PUT TRANSACTIONS COMPLETE.");
//                 resolve(true);
//             }
//             put_transaction.onerror = function () {
//                 console.log("PROBLEM UPDATING RECORDS.")
//                 resolve(false);
//             }
//             objectStore.put(record);
//         });
//     }
// }

const INIT = CONNECT_DB
const SET = (db, collection_name, data, proceed) => {
    async.waterfall([
        cb => DELETE_MANY(db, collection_name, cb),
        cb => CREATE_MANY(db, collection_name, data, cb)
    ], e => proceed(e))
}
const GET = FIND_ALL
const DELETE = DELETE_MANY

export default {
    CHECK_DB_SUPPORT,
    INIT,
    SET,
    GET,
    DELETE
}