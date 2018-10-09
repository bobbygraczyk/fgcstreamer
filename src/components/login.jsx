import React, { Component } from "react";
import Control from "./control.jsx";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.app = props.app;
    this.databaseSet = props.databaseSet;
    this.joinRef = React.createRef();
  }
  render() {
    return (
      <div className="Container">
        <div className="Login">
          Join session<br />
          <input type="text" ref={x => (this.joinRef = x)} />
          <button
            onClick={() => {
              this.databaseSet(this.joinRef.value);
              this.app.setState({ currentPage: Control });
            }}
          >
            GO
          </button>
          <br />
          <small>
            Please enter a unique and private Session ID.<br />
            KEEP THIS HANDY. It does not display in app<br />
            for privacy reasons. Share this with your team<br />
            and all connect with an identical ID.<br /><br />
            No spaces or special characters (besides _ or -) please.<br />
            e.g. <code>fgc_tourny</code> NOT <code>FGC Tourny</code>
          </small>
        </div>
      </div>
    );
  }
}
