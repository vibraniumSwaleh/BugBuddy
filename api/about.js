let aboutMessage = 'Issue Tracker API v1.0';

function setMessage(message) {
  aboutMessage = message;
  return aboutMessage;
}

function getMessage() {
  return aboutMessage;
}

const about = { getMessage, setMessage };

export default about;
