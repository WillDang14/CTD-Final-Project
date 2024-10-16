let activeDiv = null;

// Hàm này được gọi lần đầu tiên ở modul "loginRegister.js"
// với newDiv = <div id="logon-register" style="display: none">
export const setDiv = (newDiv) => {
    // console.log(newDiv);
    // console.log(activeDiv);

    // Lần đầu tiên chạy thì newDiv != null
    // và activeDiv = null
    if (newDiv != activeDiv) {
        // lệnh if này sẽ được bỏ qua lần đầu tiên chạy
        // ý nghĩa là nếu đang có activeDive (đang mở)
        // thì set lại về "none" ==>> không hiển thị
        if (activeDiv) {
            activeDiv.style.display = "none";
        }

        // set style = "block" để hiển thị <div>
        newDiv.style.display = "block";

        // gán giá trị activeDive là <div> hiện tại đang mở ra
        // dùng để so sánh với newDiv khi setDiv() được gọi ở đâu đó
        activeDiv = newDiv;
    }
};

/* ////////////////////////////////////////////////// */
// giá trị ban đầu là "true"
// Our click handlers ignore clicks if they occur while the inputEnabled flag is false.
// tức là nếu đang có "async operation" đang chạy thì không
// click button được
// ==>> Also, we need to disable input during the period in which the async operation is in progress
export let inputEnabled = true;

export const enableInput = (state) => {
    inputEnabled = state;
};

export let token = null;

export const setToken = (value) => {
    token = value;

    if (value) {
        localStorage.setItem("token", value);
    } else {
        localStorage.removeItem("token");
    }
};

export let message = null;

/* ////////////////////////////////////////////////// */
// import { showJobs, handleJobs } from "./jobs.js";
import { showItems, handleItems } from "./jobs.js";

import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";

import { handleLogin } from "./login.js";

import { handleAddEdit } from "./addEdit.js";

import { handleRegister } from "./register.js";

/* ////////////////////////////////////////////////// */
// Cái này được thực thi đầu tiên
document.addEventListener("DOMContentLoaded", () => {
    // Lần đầu tiên vào thì chưa có token
    token = localStorage.getItem("token");
    // console.log(token); // null

    message = document.getElementById("message");
    // console.log(message); // <p id="message"></p>

    // gọi đến hàm này trong modul "./loginRegister.js"
    handleLoginRegister();

    handleLogin();

    // handleJobs();
    handleItems();

    handleRegister();

    handleAddEdit();

    if (token) {
        // showJobs(); // nếu có token rồi thì showJobs

        showItems(); // nếu có token rồi thì showJobs
    } else {
        showLoginRegister(); //nếu chưa có token thì show lựa chọn Reg-Login
    }
});
