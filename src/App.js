import React, { Component } from "react";
import FileSaver, { saveAs } from "file-saver/FileSaver";
import Draggable, { DraggableCore } from "react-draggable";
import AdSense from 'react-adsense';
import * as firebase from "firebase";
import Register from "./components/register.jsx";
import Control from "./components/control.jsx";
import Login from "./components/login.jsx";
import "./App.css";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAb5b9C0QTUov0Aj2a8bewTxbe7n6n9dpQ",
  authDomain: "fgcstreamer.firebaseapp.com",
  databaseURL: "https://fgcstreamer.firebaseio.com",
  projectId: "fgcstreamer",
  storageBucket: "fgcstreamer.appspot.com",
  messagingSenderId: "339270206392"
};
firebase.initializeApp(config);

const Docs = () => {
  return (
      <div>
          <h2>Using the Queue</h2>
          <ol>
            <li>
              The TO or Stage Manager should open the "Register" page. They can add players <br />
              to the queue here.
            </li>
            <li>
              The Stream runner should open the Control page. This will display the queue.
            </li>
            <li>
              Matches will populate in queue as they are added.
            </li>
            <li>
              Click "Next Match" to go to the next match in queue.
            </li>
          </ol>
          <h2>Streaming</h2>
          <ol>
              <li>
                  Download and install this chrome extension: <br />
                  https://chrome.google.com/webstore/detail/downloads-overwrite-alrea/lddjgfpjnifpeondafidennlcfagekbp
              </li>
              <li>
                  Switch 'Stream' to 'On' on the Control Page. This should download several <br />
                  files labelled with the information they contain. If not, add a dummy match to <br />
                  the queue.
              </li>
              <li>
                  In OBS, add these files as Text sources 'from file' and point it to the downloaded files.
              </li>
              <li>
                  Any time a change is made, the text will automatically update in OBS.
              </li>
          </ol>
          NOTE: Scores and commentators do not persist among sessions.<br />
          Email me with questions, feedback, or requests: bobbygraczyk@gmail.com
      </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.controlRef = React.createRef();

    this.state = {
      currentPage: Login,
      sidebarOpen: false,
      database: "",
      playerQueue: [],
      commentators: [],
      chatMessages: []
    };
  }
  databaseSet(db) {
    this.setState({ database: db });
    let dbRef = firebase.database().ref(db);
    dbRef.on("child_added", snapshot => {
      const x = snapshot.val();
      this.setState({
        playerQueue: x.playerQueue,
        commentators: x.commentators,
        chatMessages: x.chatMessages
      });
    });
    dbRef.on("value", snapshot => {
      const x = snapshot.val();
      if (x) {
        this.setState({
          playerQueue: x.playerQueue,
          commentators: x.commentators,
          currentPage: this.state.currentPage,
          chatMessages: x.chatMessages
        });
      }
    });
  }

  render() {
    const CurrentPage = this.state.currentPage;
    return (
      <div className="App">
        <div className="Title-Bar">
          <button
            id="button"
            onClick={() =>
              this.state.database !== ""
                ? this.setState({ sidebarOpen: !this.state.sidebarOpen })
                : ""}
          >
            FGCast
          </button>
          <AdSense.Google
          client='ca-pub-8092611228458852'
          slot='8092611228458852'
          enable_page_level_ads={true}
          style={{ width: 100, height: 50, float: 'left' }}
          format=''
          />
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
            style={{ float: "right", margin: "12px" }}
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
              type="hidden"
              name="hosted_button_id"
              value="YZAV786WDUVBQ"
            />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
              border="0"
              name="submit"
              alt="PayPal - The safer, easier way to pay online!"
            />
            <img
              alt=""
              border="0"
              src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </div>
        <div
          className="Sidebar"
          style={this.state.sidebarOpen ? { left: "0px" } : { left: "-120px" }}
        >
          <button onClick={() => this.setState({ currentPage: Register })}>
            Register
          </button>
          <button
            onClick={() =>
              this.setState({
                currentPage: Control
              })}
          >
            Control
          </button>
          <button
            onClick={() =>
              this.setState({
                currentPage: Docs
              })}
          >
            Docs
          </button>
        </div>
        <div className="Main-Content">
          <CurrentPage
            databaseSet={x => this.databaseSet(x)}
            firebase={firebase}
            ref={x => (this.controlRef = x)}
            app={this}
            database={this.state.database}
            playerQueue={this.state.playerQueue}
            chatMessages={this.state.chatMessages}
            commentators={this.commentators}
          />
        </div>
      </div>
    );
  }
}

export default App;
