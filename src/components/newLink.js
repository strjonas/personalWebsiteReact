import React, { Fragment, useState } from "react";
import { MdNoteAdd } from "react-icons/md";

const NewLink = ({ obj, editLink }) => {
  const [inhalt2, setinhalt2] = useState(obj.link);
  if (inhalt2 === null || inhalt2 === undefined) setinhalt2("");
  const updateinhalt = async (e) => {
    e.preventDefault();
    editLink(obj, inhalt2);
  };
  const handleInput = (e) => {
    if (e.key === "Enter") {
      document.getElementById("newLinkDismiss").click(e);
    }
  };

  return (
    <Fragment>
      <MdNoteAdd
        type="button"
        data-toggle="modal"
        data-target={`#id${obj.id}`}
      ></MdNoteAdd>

      <div
        className="modal"
        id={`id${obj.id}`}
        onClick={() => setinhalt2(obj.link)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">New Link</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setinhalt2(obj.link)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={inhalt2}
                onKeyPress={(e) => handleInput(e)}
                onChange={(e) => setinhalt2(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                id="newLinkDismiss"
                data-dismiss="modal"
                onClick={(e) => updateinhalt(e)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setinhalt2(obj.link)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewLink;
