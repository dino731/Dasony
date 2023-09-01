import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';

const editorConfiguration = {
    plugins: [ Bold, Italic, Strikethrough, Underline, Alignment, Paragraph, Undo ],
    toolbar: [ 'bold', 'italic', 'strikethrough', 'underline', '|', 'alignment', 'undo', 'redo' ]
};

const CkEditor = () => {
    return(
            <CKEditor
                editor={ ClassicEditor }
                config={ editorConfiguration }
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        );
};

export default CkEditor;