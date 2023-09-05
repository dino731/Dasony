import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import Undo from '@ckeditor/ckeditor5-undo/src/undo';

// const editorConfiguration = {
//     plugins: [ Bold, Italic, Strikethrough, Underline, Alignment, Paragraph, Undo ],
//     toolbar: [ 'bold', 'italic', 'strikethrough', 'underline', '|', 'alignment', 'undo', 'redo' ]
// };

const CkEditor = ({editContent}) => {
    const content = editContent.content;
    const setContent = editContent.setContent;

    return(
            <CKEditor
                editor={ ClassicEditor }
                // config={ editorConfiguration }
                data={content}
                onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    // console.log("editor data : " + data);
                    setContent(data);
                } }
                onBlur={ ( event, editor ) => {
                    // console.log( 'Blur.', editor );
                    // const data = editor.getData();
                } }
                onFocus={ ( event, editor ) => {
                    // console.log( 'Focus.', editor );
                } }
            />
        );
};

export default CkEditor;