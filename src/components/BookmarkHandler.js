import React, { useState, useEffect } from "react";
import BookmarkTree from "./BookmarkTree";
import NewFolder from "./newFolderPopup";
import NewLink from "./newLink";
import Footer from "./Footer";

export default function BookmarkHandler() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchBookmarks();
  }, []);
  async function fetchBookmarks() {
    const response = await fetch("http://192.168.178.41:5000/bookmarks");
    let jsonData;
    try {
      jsonData = await response.json();
    } catch (error) {
      setData({});

      console.log(error);
      return;
    }
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
          let sortedTemp = [];
          for (let key in temp) {
            if (temp[key].isfolder === "true") {
              sortedTemp.push(temp[key]);
            }
          }
          for (let key in temp) {
            if (temp[key].isfolder === "false") {
              sortedTemp.push(temp[key]);
            }
          }

          oTasks[name] = sortedTemp;
        }
      });
    } catch (e) {
      console.log(e);
    }
    setData(oTasks);
  }

  async function editBookmark(obj, name) {
    console.log(`changing bookmark to ${name} ${obj.id}`);
    const body = { name: name, id: obj.id };
    await fetch("http://192.168.178.41:5000/bookmarks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
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
      default:
        console.log("unvalid event");
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
      <div className="row Bookmark-main">
        <div
          className=" text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            className="row"
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <NewFolder
                obj={{ id: "newFolderMain", inhalt: "" }}
                newFolder={newFolder}
              />

              <NewLink
                obj={{ id: "newLinkMain", inhalt: "" }}
                editLink={newLink}
              />
            </div>
            <div style={{ width: "40px" }}></div>
            <p> Bookmarks </p>
          </div>
          <div className="mt-3">
            <div className="row mt-3 -d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark Bookmark-container">
                <BookmarkTree
                  nextOne="main"
                  counter={1}
                  data={data}
                  treeEventHandler={treeEventHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="third-seperator-tasks" />
      <div className="footer-tasks">
        <Footer />
      </div>
    </>
  );
}
