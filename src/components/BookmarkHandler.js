import React, { useState, useEffect } from "react";
import BookmarkTree from "./BookmarkTree";
import NewFolder from "./newFolderPopup";
import NewLink from "./newLink";

export default function BookmarkHandler() {
  const treeData = [
    {
      key: "0",
      label: "Documents",
      folder: "main",
      isfolder: "true",
      children: [
        {
          key: "0-0",
          label: "Private Documents",
          folder: "Documents",
          isfolder: "true",
          children: [
            {
              key: "0-1-1",
              label: "Document-0-1.doc",
              folder: "Private Documents",
              isfolder: "false",
            },
            {
              key: "0-1-2",
              label: "Document-0-2.doc",
              folder: "Private Documents",
              isfolder: "false",
            },
            {
              key: "0-1-3",
              label: "Document-0-3.doc",
              folder: "Private Documents",
              isfolder: "false",
            },
            {
              key: "0-1-4",
              label: "Document-0-4.doc",
              folder: "Private Documents",
              isfolder: "true",
              children: [
                {
                  key: "0-1-1-1",
                  label: "Document-0-1.doc",
                  folder: "Very Private Documents",
                  isfolder: "false",
                },
                {
                  key: "0-1-2-1",
                  label: "Document-0-2.doc",
                  folder: "Very Private Documents",
                  isfolder: "false",
                },
                {
                  key: "0-1-3-1",
                  label: "Document-0-3.doc",
                  folder: "Very Private Documents",
                  isfolder: "false",
                },
                {
                  key: "0-1-4-1",
                  label: "Document-0-4.doc",
                  folder: "Very Private Documents",
                  isfolder: "false",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "0d",
      label: "Desktop",
      folder: "main",
      isfolder: "true",
      children: [
        {
          key: "0-1-4dd-1",
          label: "Document-0-4.doc",
          folder: "Very Private Documents",
          isfolder: "false",
        },
      ],
    },
  ];
  const [data, setData] = useState();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    const response = await fetch("http://192.168.178.41:5000/bookmarks");
    const jsonData = await response.json();
    let oTasks = {};
    try {
      jsonData.forEach((task) => {
        let temp = task.folder;
        if (!oTasks[temp]) {
          oTasks[temp] = [task];
        } else {
          let name = task.folder;
          let temp = oTasks[name];
          if (task.inhalt !== "") {
            temp.push(task);
          }

          oTasks[name] = temp;
        }
      });
    } catch (e) {
      console.log(e);
    }
    setData(oTasks);
  }

  async function editBookmark(obj, name) {
    console.log(`changing bookmark to ${name}`);
    await fetchBookmarks();
  }

  async function addBookmark(obj, name) {
    let folder = obj.link;
    let link = name;
    let isfolder = "false";
    const body = { link, folder, isfolder };
    console.log(body);
    await fetch("http://192.168.178.41:5000/bookmarks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await fetchBookmarks();
  }
  async function deleteBookmark(obj) {
    try {
      await fetch(`http://192.168.178.41:5000/bookmarks/${obj["id"]}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
    await fetchBookmarks();
  }

  async function addFolder(obj, name) {
    let folder = obj.link;
    let link = name;
    let isfolder = "true";
    const body = { link, folder, isfolder };
    console.log(body);
    await fetch("http://192.168.178.41:5000/bookmarks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await fetchBookmarks();
  }
  async function deleteFolder(obj) {
    const id = obj.id;
    const name = obj.link;
    const body = { id, name };
    try {
      const response = await fetch(
        "http://192.168.178.41:5000/delete/bookmarks",
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      await fetchBookmarks();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await fetchBookmarks();
  }

  function treeEventHandler(event, eventType, name) {
    switch (eventType) {
      case "newFolder":
        addFolder(event, name);
        break;
      case "deleteFolder":
        deleteFolder(event);
        break;
      case "newLink":
        addBookmark(event, name);
        break;
      case "deleteLink":
        deleteBookmark(event);
        break;
      case "editLink":
        editBookmark(event, name);
        break;
    }
  }
  function newFolder(obj, name) {
    addFolder({ link: "main" }, name);
  }
  function newLink(obj, name) {
    addBookmark({ link: "main" }, name);
  }

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="mt-3">
            <div className="row mt-3 -d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark">
                <div
                  className="row"
                  style={{ color: "white", paddingLeft: "30px" }}
                >
                  <NewFolder
                    obj={{ id: "newFolderMain", inhalt: "" }}
                    newFolder={newFolder}
                  />
                  <NewLink
                    obj={{ id: "newLinkMain", inhalt: "" }}
                    editLink={newLink}
                  />
                </div>
                <BookmarkTree
                  nextOne="main"
                  data={data}
                  treeEventHandler={treeEventHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
