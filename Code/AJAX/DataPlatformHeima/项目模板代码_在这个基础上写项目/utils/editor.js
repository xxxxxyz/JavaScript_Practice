// wangEditor
const { createEditor, createToolbar } = window.wangEditor;

//configuration object
const editorConfig = {
  placeholder: "Type here...",

  // editor change callback fn
  onChange(editor) {
    const html = editor.getHtml();
    console.log("editor content", html);
    // You can sync HTML to <textarea>

    // collect form content
    document.querySelector(".publish-content").value = html;
  },
};

const editor = createEditor({
  selector: "#editor-container",
  // default content
  html: "<p><br></p>",

  // configuration option
  config: editorConfig,
  mode: "default", // or 'simple'
});

// toolbar config setting
const toolbarConfig = {};

const toolbar = createToolbar({ 
  editor,
  // toolbar position
  selector: "#toolbar-container",
  config: toolbarConfig,
  mode: "simple", // or 'default'
});
