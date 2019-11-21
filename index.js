import loginScreen from "./Views/login.js"
import noteScreen from "./Views/note.js"

function setScreen(screen) {
    document.getElementById('app').innerHTML = screen.content;
    screen.onload();
}

window.onload = function(){
    setScreen(noteScreen)
};

export default setScreen;
