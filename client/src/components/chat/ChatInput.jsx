import React, { useState, useContext } from "react";
import ChatFileUpload from "../../styled/Chat/ChatFileUpload";
import { SocketContext } from "../../contexts/SocketContext";
import { connect } from "react-redux";
import EmojiPicker from "./EmojiPicker";
import GifPicker from "./GifPicker";
import uuid from "uuid";

function ChatInput({ auth: { user }, chatid, selecteduser }) {
  // eslint-disable-next-line
  const [isEmoji, setIsEmoji] = useState(false);
  const [isGif, setIsGif] = useState(false);
  const [msg, setMsg] = useState("");
  // eslint-disable-next-line
  const [selectedFile, setSelectedFile] = useState([]);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [previewSource, setPreviewSource] = useState([]);
  const { socket } = useContext(SocketContext);

  const clearFiles = async () => {
    await setSelectedFile([]);
    await setIsSelectedFile(false);
    await setPreviewSource([]);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (msg.length < 1 && !isSelectedFile) {
      return;
    }
    if (chatid) {
      socket.emit("message", {
        _id: chatid,
        body: msg,
        userId: user._id,
        isMedia: isSelectedFile,
        media: isSelectedFile ? previewSource : null,
      });
    } else if (selecteduser && !chatid) {
      socket.emit("spawnChat", {
        people: [user._id, selecteduser],
        message: msg,
        userId: user._id,
        isGroup: false,
        name: "",
      });
    }
    setMsg("");
  };

  const onImageUpload = async (e) => {
    e.persist();
    let results = [];
    await setSelectedFile([...e.target.files]);
    await setIsSelectedFile(true);
    await Array.from(e.target.files).forEach(async (item) => {
      const reader = new FileReader();
      await reader.readAsDataURL(item);
      reader.onload = () =>
        results.push({
          res: reader.result,
          type: item.type.split("/")[0],
          name: item.name,
        });
    });
    await setPreviewSource(results);
  };

  return (
    <div>
      {isEmoji && (
        <EmojiPicker setMsg={setMsg} msg={msg} setIsEmoji={setIsEmoji} />
      )}
      {isGif && <GifPicker chatid={chatid} onMessageSubmit={onMessageSubmit} />}
      {isSelectedFile && (
        <article
          className="d-flex bg-secondary w-100"
          style={{
            position: "absolute",
            bottom: "38px",
            left: 0,
            padding: "0 38px",
          }}
        >
          {previewSource.length > 0 &&
            previewSource.map((file) => (
              <div className="p-2" key={uuid.v4()}>
                {file.type === "image" && (
                  <img
                    style={{
                      maxHeight: "80px",
                      width: "auto",
                    }}
                    src={file.res}
                    alt={file.type}
                  />
                )}
                <br />
                <span>{file.name}</span>
              </div>
            ))}
          <button
            className="btn btn-secondary"
            style={{
              margin: "0 0 0 auto",
              height: "37px",
              alignSelf: "center",
            }}
            onClick={clearFiles}
          >
            <i className="fas fa-times" />
          </button>
        </article>
      )}
      <form onSubmit={(e) => onMessageSubmit(e)}>
        <ChatFileUpload>
          <label htmlFor="file" className="m-0" title="Upload a file">
            <i className="fas fa-paperclip" />
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={onImageUpload}
            multiple
          />
        </ChatFileUpload>
        <ChatFileUpload>
          <span title="Insert Emoji" onClick={() => setIsEmoji(!isEmoji)}>
            <i className="fas fa-smile-wink" />
          </span>
        </ChatFileUpload>
        <ChatFileUpload>
          <span title="Insert Emoji" onClick={() => setIsGif(!isGif)}>
            <i className="fas fa-photo-video" />
          </span>
        </ChatFileUpload>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="form-control"
          placeholder="Type a message"
        />
        <button className="btn btn-secondary" type="submit">
          <i className="fas fa-paper-plane" />
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ChatInput);
