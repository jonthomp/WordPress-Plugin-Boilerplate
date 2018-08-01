import React from "react";

const AddMediaButton = () => {
  return (
    <a
      className="button"
      onClick={() => {
        let value = prompt("Enter a value:");
        const shortcode = `[custom_shortcode value='${value}']`;
        if (tinymce.activeEditor) {
          tinymce.activeEditor.execCommand(
            "mceInsertContent",
            false,
            shortcode
          );
        } else {
          tinymce.editors.content.execCommand(
            "mceInsertContent",
            false,
            shortcode
          );
        }
        const currentValue = document.querySelector(
          "#wp-content-editor-container textarea"
        ).value;
        document.querySelector("#wp-content-editor-container textarea").value =
          currentValue + " " + shortcode;
      }}
    >
      Insert Custom Shortcode
    </a>
  );
};

export default AddMediaButton;
