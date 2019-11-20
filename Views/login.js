import setScreen from "../index.js";
import register from "./register.js";
import {login} from "../Controllers/auth.js";
import noteScreen from "./note.js";

const content = `
    <div id="container">
            <div class="card">
                <form id="js-loginForm">
                    <div id="header">
                        <label id="lable">MyNote !!!</label>
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Email..." id="email">
                        <i class="fas fa-envelope-open-text"></i> 
                    </div>
                    
                    <div>
                        <input type="password" name="password" placeholder="Password..." id="password">
                        <i class="fas fa-lock"></i>
                    </div>
                    <hr>
                    <div>
                        <button type="submit">Login</button>
                        <button type="button" id="js-btnRegister">Register</button>
                    </div>
                </form>
            </div>
    </div>
`;

function onload(){
    const form = document.getElementById("js-loginForm");

    form
        .addEventListener("submit", async function(event){
            event.preventDefault();
            try{
                const result = await login(form.email.value, form.password.value);
                if(result){
                    setScreen(noteScreen);
                }
            }catch(err){
                alert("Error: " + err.message);
            }
    });
    document
        .getElementById("js-btnRegister")
        .addEventListener("click", function(){
            setScreen(register);
    });
}

export default{
    content: content,
    onload: onload
}