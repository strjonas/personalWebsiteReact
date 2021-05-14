import React, { Fragment, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";

const NewFolder = ({ obj, newFolder }) => {
  const [inhalt, setinhalt] = useState(obj.link);
  if (inhalt === null || inhalt === undefined) setinhalt("");

  const updateinhalt = async (e) => {
    e.preventDefault();
    newFolder(obj, inhalt);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      document.getElementById(`newFolderDismiss${obj.id}`).click(e);
    }
  };
  return (
    <Fragment>
      <MdCreateNewFolder
        type="button"
        data-toggle="modal"
        data-target={`#id${obj["id"]}`}
      ></MdCreateNewFolder>

      <div
        className="modal"
        id={`id${obj["id"]}`}
        onClick={() => setinhalt(obj.link)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">New Folder</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setinhalt(obj.link)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                id={`inp${obj.id}`}
                onKeyPress={(e) => handleInput(e)}
                className="form-control"
                value={inhalt}
                onChange={(e) => setinhalt(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                id={`newFolderDismiss${obj.id}`}
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateinhalt(e)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setinhalt(obj.link)}
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

export default NewFolder;
