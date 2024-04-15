class IssueFilter extends React.Component {
  render() {
    return <div>This is a placehodler for the issue filter.</div>;
  }
}
class IssueTbale extends React.Component {
  render() {
    return <div>This is a placehodler for the table of issues.</div>;
  }
}
class IssueAdd extends React.Component {
  render() {
    return <div>This is a placehodler for a form to add an issue.</div>;
  }
}

class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTbale />
        <hr />
        <IssueAdd />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;
ReactDOM.render(element, document.getElementById("content"));
