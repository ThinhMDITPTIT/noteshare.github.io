import user from "./user.js";
import noteScreen from "../Views/note.js";

let activeNote = "";
let noteListener = null;
let contentListener = null;
const localNotes = [];

//Tạo note
function saveNote(name) {
    db.collection("notes")
        .doc()
        .set({
            name: name,
            list_member: [user.authUser]
        });
}

//Update content cho note đang active
function saveContent(content) {
    db.collection("notes")
        .doc(activeNote)
        .update({
            content: content,
            note_id: activeNote
        })
}

//Hiện ra note có email trong danh sách
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
                    noteScreen.createnewNote({
                        id: notes[i].doc.id,
                        name: notes[i].doc.data().name,
                    });
                }
            }
           
        });
}

//Load content của note
function listenContent() {
    if (!activeNote) return;
    if (contentListener) {
        contentListener();
    }
    contentListener = db
        .collection("notes")
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

//Chạy lại nội dung của note đang active
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