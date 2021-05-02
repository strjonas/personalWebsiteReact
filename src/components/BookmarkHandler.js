import React from "react";
import BookmarkTree from "./BookmarkTree";

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

  async function fetchBookmarks() {}

  async function editBookmark(obj, name) {
    console.log(`changing bookmark to ${name}`);
  }

  async function addBookmark(obj, name) {
    console.log("adding bookmark", name);
  }
  async function deleteBookmark(obj) {
    console.log("deleteing bookmark", obj);
  }
  async function addFolder(obj, name) {
    console.log(`adding folder with name ${name}`);
  }
  async function deleteFolder(obj) {
    console.log("deleting folder", obj);
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

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="mt-3">
            <div className="row mt-3 -d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark">
                <BookmarkTree
                  data={treeData}
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
