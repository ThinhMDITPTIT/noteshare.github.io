import { activeNote, listenNote} from "../Models/note.js";
import { creatNote, save, changeActiveNote } from "../Controllers/note.js";

var editor;

const content = `
<div class="h-100 background_div">
<div class="topnav">
    <a>MyNote!!!</a>
    <button class="btn" id="js-logout">Log out</button>
</div>
<div class="container background_div">
    <div class="note1 background_div" style="width: 250px;">
        <div class="note1 background_div">
            <form id="js-formCreatNote">
                <input type="text" placeholder="Enter Title..." id="name">
                <button class="new-note-btn" id="js-newNote">
                    New Note
                </button>
            </form>
        </div>    
            <ul id = "js-listNote"></ul>
    </div>
    <div class="container flex-column background_div"  id="js-Area">
        <div class="note2 note-title" id="js-titleBar"></div>
        <div class="flex-grow-12 note1" id="js-noteArea">
            <div class="note3 note-body" id="js-noteContent" style="display: none;">
                Content of Note
            </div>
                <button class="new-note-btn1" id="js-btnEdit"  style="display: none;">
                    Edit
                </button>
                <button class="new-note-btn1" id="js-btnSave" style="display: none;">
                    Save Note
                </button>
        </div>
    </div>
</div>
</div>
`;

function onload() {
    listenNote();
    //Khi bấm vào một note
    const listNote = document.getElementById("js-listNote");
    listNote.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("js-noteContent").style.display = "block";
        document.getElementById("js-btnEdit").style.display = "block";
        const nextNoteID = event.target.dataset.id;
        if (nextNoteID === activeNote) return;
        const listNoteLi = listNote.children;
        for (let i = 0; i < listNoteLi.length; i++) {
            let li = listNoteLi[i];
            if (li.dataset.id !== nextNoteID) {
                li.classList.remove("active");
            }
            else {
                li.classList.add("active");
            }
        }
        document.getElementById("js-noteContent").innerHTML = "";
        document.getElementById("js-titleBar").innerHTML = event.target.innerHTML;
        changeActiveNote(nextNoteID);
    });
    //Khi bấm tạo new note
    const formCreatNote = document.getElementById("js-formCreatNote");
    formCreatNote.addEventListener('submit', function (event) {
        event.preventDefault();
        creatNote(formCreatNote.name.value);
    });
    //Khi bấm log out
    const logOut = document.getElementById("js-logout");
    logOut.addEventListener('click', function (event) {
        event.preventDefault();
        location.reload();
    });
    //Khi bấm edit
    const editNote = document.getElementById("js-btnEdit");
    editNote.addEventListener('click', function (event) {
        event.preventDefault();
        const listNote = document.getElementById("js-listNote");
        const listNoteLi = listNote.children;
        for (let i = 0; i < listNoteLi.length; i++) {
            let li = listNoteLi[i];
            if (li.dataset.id !== activeNote) {
                li.classList.add("disable");
            }
        }
        renderEdit();
        SaveEDNote();
    });
}
//Hiện CKEditor
function renderEdit() {
    const textArea = `
        <textarea id="js-content"></textarea>
    `;
    document.getElementById("js-noteContent").style.display = "none";
    document.getElementById("js-btnEdit").style.display = "none";
    document.getElementById("js-btnSave").style.display = "block";
    document
        .getElementById("js-noteArea")
        .insertAdjacentHTML("beforebegin", textArea);

    ClassicEditor
        .create( document.querySelector( '#js-content' ) )
        .then( newEditor => {
            editor = newEditor;
            editor.setData(document.getElementById("js-noteContent").innerHTML);
        } )
        .catch( error => {
            console.error( error );
        });
    
}
//Destroy CKEditor
function destroyEditor() {
    if ( !editor )
        return;
    editor.destroy();
    editor = null;
}
//Remove textarea
function removeTextArea() {
    var parent = document.getElementById("js-Area");
    var child = document.getElementById("js-content");
    parent.removeChild(child);
}
//Hàm Save
function SaveEDNote(){
    const saveNote = document.getElementById("js-btnSave");
    saveNote.addEventListener('click', function (event) {
        // console.log(editor);
        // console.log(editor.getData);
        const editorData = editor.getData();
        save(editorData);
        // console.log(editorData);
        document.getElementById("js-noteContent").innerHTML = "";
        // document.getElementById("js-noteContent").innerHTML = editorData;
        changeActiveNote(activeNote);
        document.getElementById("js-noteContent").style.display = "block";
        document.getElementById("js-btnSave").style.display = "none";
        document.getElementById("js-btnEdit").style.display = "block";

        const listNote = document.getElementById("js-listNote");
        const listNoteLi = listNote.children;
        for (let i = 0; i < listNoteLi.length; i++) {
            let li = listNoteLi[i];
            if (li.dataset.id !== activeNote) {
                li.classList.remove("disable");
            }
        }
        destroyEditor();
        removeTextArea();
    });
}

//Hiện nút mới
function createnewNote(note) {
    const noteHtml = `
    <li class="note3 note-title ${note.id === activeNote ? "active" : ""}" data-id="${note.id}">
                ${note.name}
    </li>
    `;
    document
        .getElementById("js-listNote")
        .insertAdjacentHTML("beforeend", noteHtml);
}

//Hiện nội dung mới
function addContent(note) {
    const noteHtml =`
        <div>
            ${note.content}
        </div>
    `;
    document
        .getElementById("js-noteContent")
        .insertAdjacentHTML("beforeend", noteHtml);
}

export default {
    content: content,
    onload: onload,
    createnewNote: createnewNote,
    addContent: addContent
};