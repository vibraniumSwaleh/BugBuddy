/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 * mongo issuetracker scripts/init.mongo.js
 * Atlas:
 * mongo mongoDb+srv://user:pwd@xxx.mongoDb.net/issuetracker 
 scripts/init.mongo.js
 * MLab:
 * mongo mongoDb://user:pwd@xxx.mlab.com:33533/issuetracker 
 scripts/init.mongo.js
 */

import { Db } from "mongoDb";

Db.issues.remove({});

const issuesdb = [
  {
    id: 1,
    status: "New",
    owner: "Ravan",
    effort: 5,
    created: new Date("2019-01-15"),
    due: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2019-01-16"),
    due: new Date("2019-02-01"),
    title: "Missing bottom border on panel",
  },
];

Db.issues.insertMany(issuesdb);
const count = Db.issues.count();
print("Inserted ", count, "issues");

Db.issues.createIndex({ id: 1 }, { unique: true });
Db.issues.createIndex({ status: 1 });
Db.issues.createIndex({ owner: 1 });
Db.issues.createIndex({ created: 1 });
