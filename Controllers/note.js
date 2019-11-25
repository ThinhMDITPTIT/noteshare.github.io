import { saveNote, saveContent, updateActiveNote } from "../Models/note.js";

function creatNote(name){
    saveNote(name);
}

function save(content){
    saveContent(content);
}

function changeActiveNote(nextNoteId){
    updateActiveNote(nextNoteId);
}

function remove(){

}

export{
    creatNote,
    changeActiveNote,
    save,
    remove
};