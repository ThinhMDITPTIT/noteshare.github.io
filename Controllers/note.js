import { saveNote } from "../Models/note.js";

function save(title,content){
    saveNote(title,content);
}

function remove(){

}

export{
    save,
    remove
};