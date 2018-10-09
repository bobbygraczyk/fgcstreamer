import React, { Component } from "react";
import FileSaver, { saveAs } from "file-saver/FileSaver";

export default class Control extends Component {
  constructor(props) {
    super(props);

    this.firebase = props.firebase;
    this.database = props.database;
    this.playerQueue = props.playerQueue;
    this.chatMessages = props.chatMessages;
    this.app = props.app;
    this.notesRef = React.createRef();
    this.userRef = React.createRef();
    this.roundRef = React.createRef();
    this.commOneName = React.createRef();
    this.commOneTwitter = React.createRef();
    this.commTwoName = React.createRef();
    this.commTwoTwitter = React.createRef();

    this.state = {
      playerOneScore: 0,
      playerTwoScore: 0,
      streaming: false
    };
  }

  render() {
    let rounds = [];
    let gameRounds = [
      "Round 1",
      "Round 2",
      "Round 3",
      "Round 4",
      "Round 5",
      "Round 6",
      "Top 16",
      "Top 8",
      "Losers Semifinals",
      "Losers Finals",
      "Winners Semifinals",
      "Winners Finals",
      "Grand Finals"
    ];
    gameRounds.map(x => rounds.push(<option>{x}</option>));
    let matches = [];
    let messages = [];
    let messageArray = [];
    if (this.props.chatMessages) {
      messageArray = Object.entries(this.props.chatMessages);
    }
    let currentRound = null;
    if (this.props.playerQueue) {
      let queue = Object.entries(this.props.playerQueue);
      currentRound = Object.entries(this.props.playerQueue)[0];
      queue.map((x, i) => {
        if (i !== 0) {
        matches.push(
          <div className="Queue-Item">
            <b>QUEUE {i + 1}}</b>
            <button
              style={{ position: "absolute", right: "0px", top: "0px" }}
              onClick={() => {
                this.firebase
                  .database()
                  .ref(this.database + "/playerQueue/" + x[0])
                  .remove();
              }}
            >
              x
            </button>
            <br />
            <table>
              <tr>
                <td>
                  <b>{x[1].playerOneTeam} </b> {x[1].playerOne}
                  <br />
                  <small>@{x[1].playerOneTwitter}</small>
                </td>
                <td><b><i>vs.</i></b></td>
                <td>
                  <b>{x[1].playerTwoTeam} </b> {x[1].playerTwo}
                  <br />
                  <small>@{x[1].playerTwoTwitter}</small>
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td>
                  Round: {x[1].round}
                </td>
                <td>
                  Pool: {x[1].pool}
                </td>
              </tr>
            </table>
          </div>
        );
      }});
    }
    messageArray.map((x, i) => {
      messages.push(
        <div className="Chat-Message">
          <b>{x[1].sender}: </b>
          {x[1].message}
        </div>
      );
    });
    if (currentRound && this.state.streaming) {
      FileSaver.saveAs(
        new Blob([currentRound[1].playerOne], {
          type: "text/plain;charset=utf-8"
        }),
        "playerOneName.txt"
      );
      FileSaver.saveAs(
        new Blob([currentRound[1].playerTwo], {
          type: "text/plain;charset=utf-8"
        }),
        "playerTwoName.txt"
      );
      FileSaver.saveAs(
        new Blob([currentRound[1].playerOneTeam], {
          type: "text/plain;charset=utf-8"
        }),
        "playerOneTeam.txt"
      );
      FileSaver.saveAs(
        new Blob([currentRound[1].playerTwoTeam], {
          type: "text/plain;charset=utf-8"
        }),
        "playerTwoTeam.txt"
      );
      FileSaver.saveAs(
        new Blob(["@" + currentRound[1].playerOneTwitter], {
          type: "text/plain;charset=utf-8"
        }),
        "playerOneTwitter.txt"
      );
      FileSaver.saveAs(
        new Blob(["@" + currentRound[1].playerTwoTwitter], {
          type: "text/plain;charset=utf-8"
        }),
        "playerTwoTwitter.txt"
      );
      FileSaver.saveAs(
        new Blob([this.state.playerOneScore], {
          type: "text/plain;charset=utf-8"
        }),
        "playerOneScore.txt"
      );
      FileSaver.saveAs(
        new Blob([this.state.playerTwoScore], {
          type: "text/plain;charset=utf-8"
        }),
        "playerTwoScore.txt"
      );
      FileSaver.saveAs(
        new Blob([this.roundRef.value], { type: "text/plain;charset=utf-8" }),
        "round.txt"
      );
    }
    return (
      <React.Fragment>
        <div className="Container">
          <div className="Queue">
            <button
              style={{ position: 'sticky', top: '0', fontSize: '15px' }}
              onClick={() => {
                currentRound
                  ? this.firebase
                      .database()
                      .ref(this.database + "/playerQueue/" + currentRound[0])
                      .remove()
                  : "";
                this.setState({ playerOneScore: 0, playerTwoScore: 0 });
              }}
            >
              Next Match
            </button>
            <button
              style={{ position: 'sticky', top: '0', fontSize: '15px' }}
              onClick={() =>
                this.setState({ streaming: !this.state.streaming })}
            >
              Stream: {this.state.streaming ? "On" : "Off"}
            </button>
            {matches ? matches : "No matches in Queue"}
          </div>
          <div className="colWrapper">
            <div className="Score">
              {currentRound ? (
                <React.Fragment>
                  <b>CURRENT MATCH</b>
                  <br />
                  <table>
                    <tr>
                      <td>
                        <b>{currentRound[1].playerOneTeam}</b>
                        {currentRound[1].playerOne}
                        <br />
                        <small>@{currentRound[1].playerOneTwitter}</small>
                      </td>
                      <td><b><i>vs.</i></b></td>
                      <td>
                        <b>{currentRound[1].playerTwoTeam}</b>
                        {currentRound[1].playerTwo}
                        <br />
                        <small>@{currentRound[1].playerTwoTwitter}</small>
                      </td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <td>
                        Round: {currentRound[1].round}
                      </td>
                      <td>
                        Pool: {currentRound[1].pool}
                      </td>
                    </tr>
                  </table>
                  <button
                    onClick={() => {
                      this.setState({
                        playerOneScore: this.state.playerOneScore - 1
                      });
                    }}
                  >
                    -
                  </button>
                  {this.state.playerOneScore}
                  <button
                    onClick={() => {
                      this.setState({
                        playerOneScore: this.state.playerOneScore + 1
                      });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      this.setState({
                        playerTwoScore: this.state.playerTwoScore - 1
                      });
                    }}
                  >
                    -
                  </button>
                  {this.state.playerTwoScore}
                  <button
                    onClick={() => {
                      this.setState({
                        playerTwoScore: this.state.playerTwoScore + 1
                      });
                    }}
                  >
                    +
                  </button><br />
                  <select
                    ref={x => (this.roundRef = x)}
                    onChange={() =>
                      this.state.streaming
                        ? FileSaver.saveAs(
                            new Blob([this.roundRef.value], {
                              type: "text/plain;charset=utf-8"
                            }),
                            "round.txt"
                          )
                        : ""}
                  >
                    {rounds}
                  </select>
                  <br />
                </React.Fragment>
              ) : (
                "No matches in queue"
              )}
            </div>
            <div className="Commentators">
                <b>COMMENTATORS</b>
                <br />
                <table>
                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                        <input type="text" ref={(x) => this.commOneName = x} />
                        </td>
                        <td>
                        <input type="text" ref={(x) => this.commTwoName = x} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Twitter
                        </td>
                        <td>
                        <input type="text" ref={(x) => this.commOneTwitter = x} />
                        </td>
                        <td>
                        <input type="text" ref={(x) => this.commTwoTwitter = x} />
                        </td>
                    </tr>
                </table>
                <button
                    onClick={() => {
                        FileSaver.saveAs(
                            new Blob([this.commOneName.value], { type: "text/plain;charset=utf-8" }),
                            "commOneName.txt"
                        );
                        FileSaver.saveAs(
                            new Blob([this.commOneTwitter.value], { type: "text/plain;charset=utf-8" }),
                            "commOneTwitter.txt"
                        );
                        FileSaver.saveAs(
                            new Blob(['@' + this.commTwoName.value], { type: "text/plain;charset=utf-8" }),
                            "commTwoName.txt"
                        );
                        FileSaver.saveAs(
                            new Blob(['@' + this.commTwoTwitter.value], { type: "text/plain;charset=utf-8" }),
                            "commTwoTwitter.txt"
                        );
                    }}
                >Submit</button>
            </div>
            <div className="Notes">
              <b>CHAT</b>
              <input
                type="text"
                style={{ float: "right", width: '120px' }}
                ref={x => (this.userRef = x)}
              />
              <div className="Chat-Messages">{messages}</div>
              <div className="SendBox">
                <textarea
                  id="field"
                  rows="4"
                  cols="150"
                  ref={x => (this.notesRef = x)}
                />
                <button
                  onClick={() => {
                    this.firebase
                      .database()
                      .ref(this.database + "/chatMessages")
                      .push({
                        sender: this.userRef.value,
                        message: this.notesRef.value
                      });
                    this.notesRef.value = "";
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
