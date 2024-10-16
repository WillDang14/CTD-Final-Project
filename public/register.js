import {
    inputEnabled,
    setDiv,
    message,
    token,
    enableInput,
    setToken,
} from "./index.js";

import { showLoginRegister } from "./loginRegister.js";

// import { showJobs } from "./jobs.js";
import { showItems } from "./jobs.js";

/* ////////////////////////////////////////////////// */
let registerDiv = null;

let name = null;

let email1 = null; // email address for register-div form

let password1 = null;

let password2 = null;

/* ////////////////////////////////////////////////// */
export const handleRegister = () => {
    // lấy element <div id="register-div" style="display: none">
    registerDiv = document.getElementById("register-div");

    //
    name = document.getElementById("name");

    email1 = document.getElementById("email1");

    password1 = document.getElementById("password1");
    password2 = document.getElementById("password2");

    const registerButton = document.getElementById("register-button");
    const registerCancel = document.getElementById("register-cancel");

    // Promise Async/await
    registerDiv.addEventListener("click", async (e) => {
        //
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            //
            if (e.target === registerButton) {
                //
                if (password1.value != password2.value) {
                    //
                    message.textContent = "The passwords entered do not match.";
                } else {
                    // cái này dùng để set inputEnabled ở file "index.js"
                    enableInput(false); // inputEnabled = false

                    try {
                        //
                        const response = await fetch("/api/v1/auth/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: name.value,
                                email: email1.value,
                                password: password1.value,
                            }),
                        });

                        // convert data sang JSON format
                        const data = await response.json();
                        console.log("Register data = ", data);
                        // console.log(data.token);

                        if (response.status === 201) {
                            message.textContent = `Registration successful.  Welcome ${data.user.name}!`;

                            // save vào browser’s local storage
                            setToken(data.token);

                            // reset lại value của <input> tag
                            name.value = "";
                            email1.value = "";
                            password1.value = "";
                            password2.value = "";

                            // tam thoi ko show
                            // showJobs();
                            showItems();
                        } else {
                            message.textContent = data.msg;
                        }
                    } catch (err) {
                        console.error(err);

                        message.textContent =
                            "A communications error occurred.";
                    }

                    // set inputEnabled = true lại
                    enableInput(true);
                }
            } else if (e.target === registerCancel) {
                //
                name.value = "";
                email1.value = "";
                password1.value = "";
                password2.value = "";

                showLoginRegister();
            }
        }
    });
};

// cái này được gọi ở module "./loginRegister.js"
export const showRegister = () => {
    // reset về giá trị ban đầu
    email1.value = null;
    password1.value = null;
    password2.value = null;

    // sau đó hiển thị <div> register
    setDiv(registerDiv);
};
