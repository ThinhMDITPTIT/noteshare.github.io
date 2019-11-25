import user from "./user.js";
import noteScreen from "../Views/note.js";

let activeNote = "";
let noteListener = null;
let contentListener = null;
const localNotes = [];

function saveNote(name) {
    db.collection("notes")
        .doc()
        .set({
            name: name,
            // list_member: [user.authUser]
        });
}

function saveContent(content) {
    db.collection("contentNotes")
        .doc()
        .set({
            content: content,
            note_id: activeNote,
        });
}



function listenNote() {
    if (noteListener) {
        noteListener();
    }
    noteListener = db
        .collection("notes")
        .where("list_member", "array-contains", user.authUser)
        .onSnapshot(function (snapshot) {
            const notes = snapshot.docChanges();
            for (let i = 0; i < notes.length; i++) {
                if (localNotes.indexOf(notes[i].doc.id) < 0) {
                    localNotes.push(notes[i].doc.id);
                    // console.log(notes[i].doc.id);
                    noteScreen.createnewNote({
                        id: notes[i].doc.id,
                        name: notes[i].doc.data().name,
                        // list_member: notes[i].doc.data().list_member
                    });
                }
            }
        });
}

function listenContent() {
    if (!activeNote) return;
    if (contentListener) {
        contentListener();
    }
    contentListener = db.collection("contentNotes")
        .where("note_id", "==", activeNote)
        .onSnapshot(function (snapshot) {
            const content = snapshot.docChanges();
            for(let i = 0; i < content.length; i++){
                if(content[i].type === "added"){
                    noteScreen.addContent(content[i].doc.data());
                }
            }
        });
}

function updateActiveNote(nextId) {
    activeNote = nextId;
    listenContent();
}

export {
    saveNote,
    listenNote,
    saveContent,
    activeNote,
    updateActiveNote
}