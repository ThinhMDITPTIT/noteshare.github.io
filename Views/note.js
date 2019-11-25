import setScreen from "../index.js";
import login from "./login.js";
import { activeNote, listenNote, updateActiveNote } from "../Models/note.js";
import { creatNote, save, changeActiveNote } from "../Controllers/note.js";

// let id = activeNote;

const content = `
<div class="topnav">
    <a>MyNote!!!</a>
    <button class="btn" id="js-logout">Log out</button>
</div>
<div class="container h-100">
    <div class="note1 h-100" style="width: 250px;">
            <form id="js-formCreatNote">
                <input type="text" placeholder="Enter Title..." id="name">
                <button class="new-note-btn" id="js-newNote">
                    New Note
                </button>
            </form>
            <ul id = "js-listNote"></ul>
    </div>
    <div class="container flex-column h-100">
        <div class="note2 note-title" id="js-titleBar"></div>
        <div class="flex-grow-12 note1" id="js-noteArea">
            <div class="note3 note-body" id="js-noteContent" style="display: none;">
                Content of Note
            </div>
                <button class="new-note-btn1" id="js-btnEdit"  style="display: none;">
                    Edit
                </button>
        </div>
    </div>
</div>
`;

function renderEdit() {
    const textArea = `
        <textarea id="js-content"></textarea>
    `;
    const savebtn = `
        <button class="new-note-btn1" id="js-btnSave">
            Save Note
        </button>
    `;
    document.getElementById('js-noteContent').style.display = "none";
    document.getElementById('js-btnEdit').style.display = "none";
    document
        .getElementById("js-noteArea")
        .insertAdjacentHTML("beforebegin", textArea);
    document
        .getElementById("js-noteArea")
        .insertAdjacentHTML("beforeend", savebtn);

    let editor;

    ClassicEditor
        .create( document.querySelector( '#js-content' ) )
        .then( newEditor => {
            editor = newEditor;
            editor.setData(document.getElementById('js-noteContent').innerHTML);
            // CKEDITOR.instances.editor.setData ('');
        } )
        .catch( error => {
            console.error( error );
        });
    const saveNote = document.getElementById("js-btnSave");
    saveNote.addEventListener('click', function (event) {
        const editorData = editor.getData();
        console.log(editorData);
        // creatNote(editorData);
        save(editorData);
        document.getElementById('js-noteContent').innerHTML = editorData;
        // document.getElementById('js-btnEdit').style.display = "block";
        // document.getElementById('js-content').style.display = "none";
        // document.getElementById('js-btnSave').style.display = "none";
        const listNote = document.getElementById("js-listNote");
        const listNoteLi = listNote.children;
        for (let i = 0; i < listNoteLi.length; i++) {
            let li = listNoteLi[i];
            // console.log(li.dataset.id);
            if (li.dataset.id !== activeNote) {
                li.classList.remove("disable");
            }
        }
        // location.reload();
        console.log(activeNote);
        // updateActiveNote(id);
    });
}

function onload() {
    listenNote();
    const formCreatNote = document.getElementById("js-formCreatNote");
    formCreatNote.addEventListener('submit', function (event) {
        event.preventDefault();
        creatNote(formCreatNote.name.value);
    });
    const logOut = document.getElementById("js-logout");
    logOut.addEventListener('click', function (event) {
        event.preventDefault();
        setScreen(login);
    });
    const editNote = document.getElementById("js-btnEdit");
    editNote.addEventListener('click', function (event) {
        event.preventDefault();
        const listNote = document.getElementById("js-listNote");
        const listNoteLi = listNote.children;
        for (let i = 0; i < listNoteLi.length; i++) {
            let li = listNoteLi[i];
            // console.log(li.dataset.id);
            if (li.dataset.id !== activeNote) {
                li.classList.add("disable");
            }
        }
        renderEdit();
    });
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
}


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