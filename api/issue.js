import { getNextSequence, getDB } from './db.js';
import { UserInputError } from 'apollo-server-express';

const issuesCollection = 'issues';

async function list() {
  const db = getDB();
  const issues = await db.collection(issuesCollection).find({}).toArray();
  console.log('Issues from DB: ', issues);
  return issues;
}

function validate(issue) {
  const newValidation = { ...issue };
  const errors = [];

  if (newValidation.title.length < 3) {
    errors.push('Field `Title` must be at least 3 characters long.');
  }

  if (newValidation.status === 'Assigned' && !newValidation.owner) {
    errors.push('Field `Owner` is required when status is `Assigned`');
  }

  if (errors.length > 0) {
    errors.map((err) => console.log(err, '\n'));
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { issue }) {
  const db = getDB();
  const newIssue = { ...issue };
  validate(newIssue);
  newIssue.created = new Date();
  newIssue.id = await getNextSequence('issues');
  console.log('This issue id is: ', newIssue.id);
  if (!newIssue.effort) newIssue.effort = Math.floor(Math.random() * 10) + 1;
  const result = await db.collection(issuesCollection).insertOne(newIssue);
  const savedIssue = await db
    .collection(issuesCollection)
    .findOne({ _id: result.insertedId });
  return savedIssue;
}

const issue = { list, add };
export default issue;
