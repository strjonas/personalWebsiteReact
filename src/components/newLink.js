import React, { Fragment, useState } from "react";
import { MdNoteAdd } from "react-icons/md";

const NewLink = ({ obj, editLink }) => {
  const [inhalt2, setinhalt2] = useState(obj.inhalt);
  if (inhalt2 === null) setinhalt2("");
  const updateinhalt = async (e) => {
    e.preventDefault();
    editLink(obj[0], inhalt2);
  };

  return (
    <Fragment>
      <MdNoteAdd
        type="button"
        data-toggle="modal"
        data-target={`#idsf`}
      ></MdNoteAdd>

      <div className="modal" id={`idsf`} onClick={() => setinhalt2(obj.inhalt)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">New Link</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setinhalt2(obj.inhalt)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={inhalt2}
                onChange={(e) => setinhalt2(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
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
                onClick={() => setinhalt2(obj.inhalt)}
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