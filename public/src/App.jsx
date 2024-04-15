class IssueFilter extends React.Component {
  render() {
    return <div>This is a placehodler for the issue filter.</div>;
  }
}

class IssueTbale extends React.Component {
  render() {
    const rowStyle = { border: "1px solid silver", padding: 4 };

    return (
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <IssueRow
            rowStyle={rowStyle}
            issue_id={1}
            issue_title={"Error in console when clicking Add"}
          />
          <IssueRow
            rowStyle={rowStyle}
            issue_id={2}
            issue_title={"Missing bottom border on panel"}
          />
        </tbody>
      </table>
    );
  }
}

class IssueRow extends React.Component {
  render() {
    const style = this.props.rowStyle;

    return (
      <tr>
        <td style={style}>{this.props.issue_id}</td>
        <td style={style}>{this.props.issue_title}</td>
      </tr>
    );
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
