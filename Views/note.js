import setScreen from "../index.js";
import login from "./login.js";
import {save} from "../Controllers/note.js";

const content=`
<div class="topnav">
    <a>MyNote!!!</a>
    <button class="btn" id="js-logout">Log out</button>
</div>
<div>
    <div id="notesWrapper" class="w-100">
        <button class="new-note-btn" id="js-newNote">
            New Note
        </button>
    </div>
</div>
<ul id="js-listNote"></ul>
`;

function onload(){
    const newNote = document.getElementById("js-newNote");
    newNote.addEventListener('click', function(event){
        event.preventDefault();
        createnewNote();
    });
    const logOut = document.getElementById("js-logout");
    logOut.addEventListener('click', function(event){
        event.preventDefault();
        setScreen(login);
    });
}

function createnewNote(){
    const conHtml = `
    <div class="note w-100" id="note1">
        <div class="note-header">
            <div class="note-close" id="js-removeNote">
                    <i class="fas fa-times"></i>
            </div>
        </div>
        <form id="js-formNote">
            <button class="note-save">
                <i class="fas fa-check"></i>
            </button>
            <lable class="note-title" for="title">Title: </lable>
                    <div class="note-title" contenteditable="" id="title">
                    </div>
            <lable class="note-title" for="content">Content: </lable>
                    <div class="note-body" contenteditable="" id="content">
                    </div>
        </form>
    </div>
    `;
    document
        .getElementById("js-listNote")
        .insertAdjacentHTML("afterend", conHtml);
    const formNote = document.getElementById("js-formNote");    
    formNote.addEventListener('click', function(event){
        event.preventDefault();
        save(
            formNote.title.value,
            formNote.content.value
            );
    });
    const removeNote = document.getElementById("js-removeNote");
    removeNote.addEventListener('click', function(event){
        var child = document.getElementById("note1");
        child.parentNode.removeChild(child);
        // remove();
    });
}
export default{
    content: content,
    onload: onload,
};