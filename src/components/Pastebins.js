import React from "react";
import Pastebin from "./Pastebin";

export default function Pastebins({ bins, deleteBin }) {
  return bins.map((bin) => {
    return <Pastebin key={bin.id} deleteBin={deleteBin} bin={bin} />;
  });
}
