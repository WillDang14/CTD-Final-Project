import {
    inputEnabled,
    setDiv,
    token,
    message,
    enableInput,
    setToken,
} from "./index.js";

import { showLoginRegister } from "./loginRegister.js";

// import { showJobs } from "./jobs.js";
import { showItems } from "./jobs.js";

let loginDiv = null;

let email = null; // email address for logon-div form

let password = null;

/* ////////////////////////////////////////////////// */
export const handleLogin = () => {
    loginDiv = document.getElementById("logon-div");

    email = document.getElementById("email");

    password = document.getElementById("password");

    const logonButton = document.getElementById("logon-button");
    const logonCancel = document.getElementById("logon-cancel");

    // Async / await
    loginDiv.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            //
            if (e.target === logonButton) {
                //
                enableInput(false);

                try {
                    const response = await fetch("/api/v1/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email.value,
                            password: password.value,
                        }),
                    });

                    const data = await response.json();
                    console.log("Login data = ", data);

                    if (response.status === 200) {
                        //
                        message.textContent = `Logon successful.  Welcome ${data.user.name}!`;

                        setToken(data.token);

                        email.value = "";
                        password.value = "";

                        // tam thoi ko show
                        // showJobs();
                        showItems();
                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.error(err);

                    message.textContent = "A communications error occurred.";
                }

                enableInput(true);
            } else if (e.target === logonCancel) {
                email.value = "";
                password.value = "";

                showLoginRegister();
            }
        }
    });
};

//
export const showLogin = () => {
    email.value = null;

    password.value = null;

    setDiv(loginDiv);
};
