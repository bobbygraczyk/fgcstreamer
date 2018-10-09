import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.app = props.app;
    this.firebase = props.firebase;
    this.database = props.database;
    this.playerOneNameForm = React.createRef();
    this.playerTwoNameForm = React.createRef();
    this.playerOneTeamForm = React.createRef();
    this.playerTwoTeamForm = React.createRef();
    this.playerOneTwitterForm = React.createRef();
    this.playerTwoTwitterForm = React.createRef();
    this.roundForm = React.createRef();
    this.poolForm = React.createRef();
  }

  newPlayers(value) {
    this.firebase
      .database()
      .ref(this.database + "/playerQueue")
      .push({
        playerOne: value.playerOne,
        playerOneTeam: value.playerOneTeam,
        playerOneTwitter: value.playerOneTwitter,
        playerTwo: value.playerTwo,
        playerTwoTeam: value.playerTwoTeam,
        playerTwoTwitter: value.playerTwoTwitter,
        round: value.round,
        pool: value.pool,
      });
  }

  clear() {
    this.playerOneNameForm.value = "";
    this.playerOneTeamForm.value = "";
    this.playerTwoNameForm.value = "";
    this.playerTwoTeamForm.value = "";
    this.playerOneTwitterForm.value = "";
    this.playerTwoTwitterForm.value = "";
    this.roundForm.value = "";
    this.poolForm.value = "";
  }

  render() {
    return (
      <div className="Register">
        <small style={{ fontSize: "12px" }}>
          Please don't use '@' in twitter handles
        </small>
        <table>
          <tr>
            <td />
            <td>Player 1</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              <input
                ref={x => (this.playerOneNameForm = x)}
                type="text"
                className="QueueInput"
                height="100px"
                width="300px"
              />
            </td>
          </tr>
          <tr>
            <td>Team</td>
            <td>
              <input
                ref={x => (this.playerOneTeamForm = x)}
                type="text"
                className="QueueInput"
                width="300px"
              />
            </td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td>
              <input
                ref={x => (this.playerOneTwitterForm = x)}
                type="text"
                className="QueueInput"
                width="300px"
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>Player 2</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              <input
                ref={x => (this.playerTwoNameForm = x)}
                type="text"
                className="QueueInput"
                height="100px"
                width="300px"
              />
            </td>
          </tr>
          <tr>
            <td>Team</td>
            <td>
              <input
                ref={x => (this.playerTwoTeamForm = x)}
                type="text"
                className="QueueInput"
                width="300px"
              />
            </td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td>
              <input
                ref={x => (this.playerTwoTwitterForm = x)}
                type="text"
                className="QueueInput"
                width="300px"
              />
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
              Round Info
            </td>
          </tr>
          <tr>
            <td>Round</td>
            <td>
              <input
                ref={x => (this.roundForm = x)}
                type="text"
                className="QueueInput"
                width="300px"
              />
            </td>
          </tr>
          <tr>
            <td>Pool</td>
            <td>
              <input
                ref={x => (this.poolForm = x)}
                type="text"
                className="QueueInput"
                width="300px"
              />
            </td>
          </tr>
        </table>
        <button
          onClick={() => {
            this.newPlayers({
              playerOne: this.playerOneNameForm.value,
              playerOneTeam: this.playerOneTeamForm.value,
              playerTwo: this.playerTwoNameForm.value,
              playerTwoTeam: this.playerTwoTeamForm.value,
              playerOneTwitter: this.playerOneTwitterForm.value,
              playerTwoTwitter: this.playerTwoTwitterForm.value,
              round: this.roundForm.value,
              pool: this.poolForm.value,
            });
            this.clear();
          }}
        >
          Submit
        </button>
        <button onClick={() => this.clear()}>Clear</button>
      </div>
    );
  }
}
