import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    token,
    enableInput,
} from "./index.js";

import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

// tự thêm vô ==>> khi hết hạn thì show logon lại
// import { showLoginRegister } from "./loginRegister.js";
import { showLogin } from "./login.js";

// let jobsDiv = null;
let itemsDiv = null;

// let jobsTable = null;
let itemsTable = null;

// let jobsTableHeader = null;
let itemsTableHeader = null;

/* ////////////////////////////////////////////////// */
// export const handleJobs = () => {
export const handleItems = () => {
    //
    // jobsDiv = document.getElementById("jobs");
    itemsDiv = document.getElementById("items");

    const logoff = document.getElementById("logoff");

    // const addJob = document.getElementById("add-job");
    const addItem = document.getElementById("add-item");

    // jobsTable = document.getElementById("jobs-table");
    itemsTable = document.getElementById("items-table");

    // jobsTableHeader = document.getElementById("jobs-table-header");
    itemsTableHeader = document.getElementById("items-table-header");

    itemsDiv.addEventListener("click", (e) => {
        //
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            //
            if (e.target === addItem) {
                //
                showAddEdit(null);
                //
            } else if (e.target === logoff) {
                // xóa token đi
                setToken(null);

                message.textContent = "You have been logged off.";

                itemsTable.replaceChildren([itemsTableHeader]);

                showLoginRegister();
            } else if (e.target.classList.contains("editButton")) {
                //
                message.textContent = "";

                showAddEdit(e.target.dataset.id);
                //
            } else if (e.target.classList.contains("deleteButton")) {
                //
                enableInput(false);

                deleteJobs(e.target.dataset.id);

                enableInput(true);
            }
        }
    });
};

///////////////////////////////////////////////////////////////
// Chú ý: mỗi lần gọi đến hàm showJobs()
// là đều sẽ truy cập đến database
// ==>>  tức là sẽ lấy data về Client
// export const showJobs = async () => {
export const showItems = async () => {
    //
    try {
        enableInput(false);

        // const response = await fetch("/api/v1/jobs", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //     },
        // });

        const response = await fetch("/api/v1/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log("List Data Job = ", data);

        let children = [itemsTableHeader];

        if (response.status === 200) {
            if (data.count === 0) {
                //
                itemsTable.replaceChildren(...children); // clear this for safety
                //
            } else {
                // for (let i = 0; i < data.jobs.length; i++) {
                for (let i = 0; i < data.items.length; i++) {
                    //
                    let rowEntry = document.createElement("tr");

                    // let editButton = `<td><button type="button" class="editButton" data-id=${data.jobs[i]._id}>edit</button></td>`;
                    let editButton = `<td><button type="button" class="editButton" data-id=${data.items[i]._id}>edit</button></td>`;

                    // let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.jobs[i]._id}>delete</button></td>`;
                    let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.items[i]._id}>delete</button></td>`;

                    // let rowHTML = `
                    //             <td>${data.jobs[i].company}</td>
                    //             <td>${data.jobs[i].position}</td>
                    //             <td>${data.jobs[i].status}</td>
                    //             <div>${editButton}${deleteButton}</div>`;

                    let rowHTML = `
                                <td>${data.items[i].itemName}</td>
                                <td>${data.items[i].price}</td>
                                <td>${data.items[i].status}</td>
                                <div>${editButton}${deleteButton}</div>`;

                    // Gán data mới tạo ở trên vào Table row
                    rowEntry.innerHTML = rowHTML;

                    //
                    children.push(rowEntry);
                }

                // jobsTable.replaceChildren(...children);
                itemsTable.replaceChildren(...children);
            }
        } else if (response.status === 401) {
            if (data.msg === "Authentication Expired!") {
                // message.textContent = data.msg;
                message.textContent = `${data.msg} Please login again!`;

                // setToken(null);

                showLogin();
            }
        } else {
            message.textContent = data.msg;
        }
    } catch (err) {
        console.log(err);

        message.textContent = "A communication error occurred.";
    }

    enableInput(true);

    // setDiv(jobsDiv);
    setDiv(itemsDiv);
};

///////////////////////////////////////////////////////////////
const deleteJobs = async (itemId) => {
    // jobId = "66d62c2108859ec7068897bb";
    // test error ==>> đúng ID syntax but sai số cuối
    // jobId = "66d62c2108859ec7068897bc";
    // jobId = "66d62c2108859ec7068897bbd";

    try {
        // const response = await fetch(`/api/v1/jobs/${jobId}`, {
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //     },
        // });

        const response = await fetch(`/api/v1/items/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log("Delete message = ", data);

        if (response.status === 200) {
            //
            message.textContent = data.msg;

            showItems();
            //
        } else if (response.status === 401) {
            //
            if (data.msg === "Authentication Expired!") {
                // message.textContent = data.msg;
                message.textContent = `${data.msg} Please login again!`;

                setToken(null);

                showLogin();
            }
            //
        } else {
            //
            message.textContent = "The item entry was not found!";

            showItems();
        }

        // showJobs();
        // showItems();
        //
    } catch (err) {
        console.log(err);

        message.textContent = "A communications error has occurred.";

        //
        // showJobs();
        showItems();
    }
};
