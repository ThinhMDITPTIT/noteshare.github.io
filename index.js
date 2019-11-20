import loginScreen from "./Views/login.js"

function setScreen(screen) {
    document.getElementById('app').innerHTML = screen.content;
    screen.onload();
}

window.onload = function(){
    setScreen(loginScreen)
};

export default setScreen;
