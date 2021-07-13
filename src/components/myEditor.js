import React, { useState } from "react";
import { Button } from "react-bootstrap";
import EditorJS from "@editorjs/editorjs";
// import { Header } from "@editorjs/header";
// import List from "@editorjs/list";

const MyEditor = new EditorJS({
  /**
   * Id of Element that should contain the Editor
   */
  holder: "editorjs",

  /**
   * Available Tools list.
   * Pass Tool's class or Settings object for each Tool you want to use
   */
  // tools: {
  //   header: {
  //     class: Header,
  //     inlineToolbar: ["link"],
  //   },
  //   list: {
  //     class: List,
  //     inlineToolbar: true,
  //   },
  // },
});

export default MyEditor;

// export const MyEditor = () => {
//   const submitText = () => {};

//   return (
//     <>
//       <div></div>

//       <Button variant="danger" onClick={submitText}>
//         Delete Blog
//       </Button>
//     </>
//   );
// };
