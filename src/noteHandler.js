import React from "react";
import Notes2 from "./components/notes";

class NoteHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      inputVal: "",
    };
    this.getNotes();
    this.deleteNote = this.deleteNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
  }

  async getNotes() {
    try {
      const response = await fetch("http://localhost:5000/notes");
      const jsonData = await response.json();
      if (jsonData !== undefined) {
        this.setState({ notes: jsonData });
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteReq(id) {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteNote(id) {
    await this.deleteReq(id);
    const newList = [];
    this.state.notes.forEach((item) => {
      if (item.id !== id) {
        newList.push(item);
      }
    });
    if (newList !== undefined) {
      this.setState({ notes: newList });
    }
  }

  async addNote(e) {
    const Note = this.state.inputVal;
    if (Note === "") return;

    const request = async (e) => {
      e.preventDefault();
      try {
        let description = Note;
        const body = { description };
        await fetch("http://localhost:5000/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    await request(e);
    await this.getNotes();
    this.setState({ inputVal: "" });
  }

  handleInputNotes = (event) => {
    let str = JSON.stringify(event.target.value);
    if (str.includes("<script>") || str.includes(";")) {
      this.setState({ inputVal: "" });
    } else {
      this.setState({ inputVal: event.target.value });
    }
  };

  render() {
    return (
      <div className="CenterDiv">
        <div className="row inprow">
          <h2>Notes</h2>
          <div className="input-group mb-3 inp" style={{ width: "auto" }}>
            <input
              id="pasteNote-input"
              type="text"
              onChange={this.handleInputNotes}
              className="form-control"
              value={this.state.inputVal}
              style={{ width: "auto" }}
            ></input>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-submit"
              onClick={this.addNote}
            >
              ADD
            </button>
          </div>
        </div>

        <Notes2 notes={this.state.notes} deleteNote={this.deleteNote} />
      </div>
    );
  }
}

export default NoteHandler;
