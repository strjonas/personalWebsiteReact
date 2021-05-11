import React from "react";
import * as FaIcons from "react-icons/fa";
import { CgGoogleTasks } from "react-icons/cg";
import { MdPhotoLibrary } from "react-icons/md";
import { BsFillBookmarksFill } from "react-icons/bs";

export const SidebarData = [
  {
    title: "Pastebin",
    path: "/pastebin",
    icon: <FaIcons.FaPaste />,
    cName: "nav-text",
  },
  {
    title: "Bookmarks",
    path: "/bookmarks",
    icon: <BsFillBookmarksFill />,
    cName: "nav-text",
  },
  {
    title: "Photo",
    path: "/photo",
    icon: <MdPhotoLibrary />,
    cName: "nav-text",
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <CgGoogleTasks />,
    cName: "nav-text",
  },
];
