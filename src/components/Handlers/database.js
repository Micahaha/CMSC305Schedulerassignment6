// import oponDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

// create constants for tables in database
const hostTableName = 'hosts';
const meetingTableName = 'meetings';
const hostItemsTableName = 'host_meetings'


module.exports = {
    // declare function that will create hosts table
    createHostsTable: async function () {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${hostTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Hosts table created successfully.');
                },
                error => {
                    console.log('Error creating hosts table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the hosts table
    addHost: async function (name, email) {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${hostTableName} (name, email) VALUES ("${name}", "${email}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(name + ' added successfully.');
                },
                error => {
                    console.log('Error adding host ' + error.message);
                },
            );
        });
    },

    // declare function that will create meetings table
    createMeetingsTable: async function () {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${meetingTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    location TEXT,
                    date TEXT
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Meetings table created successfully.');
                },
                error => {
                    console.log('Error creating meetings table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the meetings table
    addMeeting: async function (title, location, date) {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${meetingTableName} (title, location, date) VALUES ("${title}", "${location}", "${date}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(title + ' added successfully.');
                },
                error => {
                    console.log('Error adding meeting ' + error.message);
                },
            );
        });
    },

    createHostMeetingsTable: async function() {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${hostItemsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    host_id INTEGER,
                    meeting_id INTEGER
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('host meetings created successfully.');
                },
                error => {
                    console.log('Error creating host meetings table ' + error.message);
                },
            );
        });

    },

    
    addHostMeetings: async function (host_id, meeting_id){
        // declare transaction that will execute the SQL
        (await shopperDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${hostItemsTableName} (host_id, meeting_id) VALUES (${host_id}, ${meeting_id})`,
                // arguements passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(name + ' added successfully');
                },
                error => {
                    console.log('Error matching host and meeting' + error.message);
                },
            );
        });
    }
};