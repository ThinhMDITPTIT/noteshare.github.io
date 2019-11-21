import user from "./user.js";
import noteScreen from "../Views/note.js";

function saveNote(title,content){
    db.collection("notes")
    .doc()
    .set({
        title: title,
        content: content,
        list_user:[user.authUser]
    });
}

export{
    saveNote
}