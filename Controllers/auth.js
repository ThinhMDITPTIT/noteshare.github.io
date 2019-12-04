import {validateEmail} from "../utils.js";
import user from "../Models/user.js";

async function register(email, password, retypePassword){
    if(!validateEmail(email)){
        throw Error("Not a valid email!");
    }
    if(password.length < 8){
        throw Error("Password's length must be greeter than 8 characters!")
    }
    if(password !== retypePassword){
        throw Error("Password not matched!");
    }

    //register user
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    //send email
    firebase.auth().currentUser.sendEmailVerification();    
    return true;
}

async function login(email, password){
    const loginResult = await firebase.auth().signInWithEmailAndPassword(email, password);
    if(!loginResult.user.emailVerified){
        // return false;
        throw Error("Email not verified!");
    }
    user.authUser = loginResult.user.email;
    return true;
}

export {register, login};