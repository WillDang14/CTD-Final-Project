// inputEnabled giá trị ban đầu = "true"
import { inputEnabled, setDiv } from "./index.js";

import { showLogin } from "./login.js";

import { showRegister } from "./register.js";

/* ////////////////////////////////////////////////// */
let loginRegisterDiv = null;

/* ////////////////////////////////////////////////// */
export const handleLoginRegister = () => {
    // lấy element ra
    loginRegisterDiv = document.getElementById("logon-register");

    // 2 cái này là buttons
    const login = document.getElementById("logon");
    const register = document.getElementById("register");

    // listen "click" 2 buttons
    loginRegisterDiv.addEventListener("click", (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            //
            if (e.target === login) {
                showLogin();
            } else if (e.target === register) {
                showRegister();
            }
        }
    });
};

////////////////////////////////////////////////
// Gọi đến hàm setDiv() ở modul "index.js"
// và truyền giá trị ban đầu
// loginRegisterDiv = <div id="logon-register" style="display: none">
// vừa được lấy ở handleLoginRegister() bên trên
export const showLoginRegister = () => {
    setDiv(loginRegisterDiv);
};
