"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var initialIssues = [{
  id: 1,
  status: "New",
  owner: "Ravan",
  effort: 5,
  created: new Date("2018-08-15"),
  due: undefined,
  title: "Error in console when clicking Add",
  color: "yellow"
}, {
  id: 2,
  status: "Assigned",
  owner: "Eddie",
  effort: 14,
  created: new Date("2018-08-16"),
  due: new Date("2018-08-30"),
  title: "Missing bottom border on panel",
  color: "red"
}];
var IssueFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(IssueFilter, _React$Component);
  function IssueFilter() {
    _classCallCheck(this, IssueFilter);
    return _callSuper(this, IssueFilter, arguments);
  }
  _createClass(IssueFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placehodler for the issue filter.");
    }
  }]);
  return IssueFilter;
}(React.Component);
var IssueTbale = /*#__PURE__*/function (_React$Component2) {
  _inherits(IssueTbale, _React$Component2);
  function IssueTbale() {
    var _this;
    _classCallCheck(this, IssueTbale);
    _this = _callSuper(this, IssueTbale);
    _this.state = {
      issues: []
    };
    return _this;
  }
  _createClass(IssueTbale, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this2 = this;
      setTimeout(function () {
        _this2.setState({
          issues: initialIssues
        });
      }, 500);
    }
  }, {
    key: "render",
    value: function render() {
      var issueRows = this.state.issues.map(function (issue) {
        return /*#__PURE__*/React.createElement(IssueRow, {
          key: issue.id,
          issue: issue
        });
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
    }
  }]);
  return IssueTbale;
}(React.Component);
var IssueRow = /*#__PURE__*/function (_React$Component3) {
  _inherits(IssueRow, _React$Component3);
  function IssueRow() {
    _classCallCheck(this, IssueRow);
    return _callSuper(this, IssueRow, arguments);
  }
  _createClass(IssueRow, [{
    key: "render",
    value: function render() {
      var issue = this.props.issue;
      var colorClass = issue.color === "red" ? "red" : "yellow";
      return /*#__PURE__*/React.createElement("tr", {
        className: colorClass
      }, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toDateString() : "-"), /*#__PURE__*/React.createElement("td", null, issue.title));
    }
  }]);
  return IssueRow;
}(React.Component);
var IssueAdd = /*#__PURE__*/function (_React$Component4) {
  _inherits(IssueAdd, _React$Component4);
  function IssueAdd() {
    _classCallCheck(this, IssueAdd);
    return _callSuper(this, IssueAdd, arguments);
  }
  _createClass(IssueAdd, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placehodler for a form to add an issue.");
    }
  }]);
  return IssueAdd;
}(React.Component);
var IssueList = /*#__PURE__*/function (_React$Component5) {
  _inherits(IssueList, _React$Component5);
  function IssueList() {
    _classCallCheck(this, IssueList);
    return _callSuper(this, IssueList, arguments);
  }
  _createClass(IssueList, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTbale, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, null));
    }
  }]);
  return IssueList;
}(React.Component);
var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById("content"));