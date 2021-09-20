import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function TextEditor(props) {
  let { setFormData, formData } = props;

  const inputHandler = (event, editor) => {
    console.log(editor.getData());
    setFormData({ ...formData, content: editor.getData() });
  };

  return (
    <>
      <div className="textEditorContainer">
        <CKEditor
          className="textEditor"
          data={formData.content}
          id="inputText"
          editor={ClassicEditor}
          onChange={inputHandler}
        />
      </div>
    </>
  );
}

export default TextEditor;
