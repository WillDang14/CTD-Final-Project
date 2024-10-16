import {
    enableInput,
    inputEnabled,
    message,
    setDiv,
    token,
    setToken,
} from "./index.js";

// import { showJobs } from "./jobs.js";
import { showItems } from "./jobs.js";

// tự thêm vô ==>> khi hết hạn thì show logon lại
// import { showLoginRegister } from "./loginRegister.js";
import { showLogin } from "./login.js";

let addEditDiv = null;

// let company = null;
let itemName = null;

// let position = null;
let price = null;

let status = null;

// let addingJob = null;
let addingItem = null;

/* ////////////////////////////////////////////////// */
export const handleAddEdit = () => {
    // addEditDiv = document.getElementById("edit-job");
    addEditDiv = document.getElementById("edit-item");

    // company = document.getElementById("company");
    itemName = document.getElementById("itemName");

    // position = document.getElementById("position");
    price = document.getElementById("price");

    status = document.getElementById("status");

    // addingJob = document.getElementById("adding-job");
    addingItem = document.getElementById("adding-item");

    const editCancel = document.getElementById("edit-cancel");

    //
    addEditDiv.addEventListener("click", async (e) => {
        //
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            //
            // if (e.target === addingJob) {
            if (e.target === addingItem) {
                //
                enableInput(false);

                let method = "POST";

                // let url = "/api/v1/jobs";
                let url = "/api/v1/items";

                // trường hợp tên button "add" đổi thành "update"
                // if (addingJob.textContent === "update") {
                if (addingItem.textContent === "update") {
                    //
                    method = "PATCH";

                    // url = `/api/v1/jobs/${addEditDiv.dataset.id}`;
                    url = `/api/v1/items/${addEditDiv.dataset.id}`;
                }

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        // body: JSON.stringify({
                        //     company: company.value,
                        //     position: position.value,
                        //     status: status.value,
                        // }),

                        body: JSON.stringify({
                            itemName: itemName.value,
                            price: price.value,
                            status: status.value,
                        }),
                    });

                    const data = await response.json();
                    console.log("Create Job = ", data);

                    //
                    if (response.status === 200 || response.status === 201) {
                        //
                        if (response.status === 200) {
                            // a 200 is expected for a successful update
                            // message.textContent = "The job entry was updated.";
                            message.textContent =
                                "The item entry was updated successfully!";
                        } else {
                            // a 201 is expected for a successful create
                            // message.textContent = "The job entry was created.";
                            message.textContent =
                                "The item entry was created successfully!";
                        }

                        // company.value = "";
                        itemName.value = "";

                        // position.value = "";
                        price.value = "";

                        // status.value = "pending";
                        status.value = "available";

                        // showJobs();
                        showItems();
                    } else if (response.status === 401) {
                        if (data.msg === "Authentication Expired!") {
                            // message.textContent = data.msg;
                            message.textContent = `${data.msg} Please login again!`;

                            setToken(null);

                            showLogin();
                        }
                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.log(err);

                    message.textContent = "A communication error occurred.";
                }

                //
                enableInput(true);
                //
            } else if (e.target === editCancel) {
                //
                message.textContent = "";

                // Chú ý là quay lại trang show table of job
                // showJobs();
                showItems();
            }
        }
    });
};

/////////////////////////////////////////////////////////
/* 
Chú ý: Mỗi lần gọi hàm showAddEdit() thì có 2 trường hợp

1) Nếu không truyền argument jobId thì reset value của <input>

2) nếu truyền argument jobId thì sẽ truy cập lại vô Database để lấy
1 jobId về và show ra cho Client xem

*/
// export const showAddEdit = async (jobId) => {
export const showAddEdit = async (itemId) => {
    //
    // if (!jobId) {
    if (!itemId) {
        // company.value = "";
        itemName.value = "";

        // position.value = "";
        price.value = "";

        // status.value = "pending";
        status.value = "available";

        // addingJob.textContent = "add";
        addingItem.textContent = "add";

        message.textContent = "";

        setDiv(addEditDiv);
        //
    } else {
        //
        enableInput(false);

        try {
            //
            // const response = await fetch(`/api/v1/jobs/${jobId}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${token}`,
            //     },
            // });

            const response = await fetch(`/api/v1/items/${itemId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            // console.log(data);

            if (response.status === 200) {
                // company.value = data.job.company;
                itemName.value = data.item.itemName;

                // position.value = data.job.position;
                price.value = data.item.price;

                // status.value = data.job.status;
                status.value = data.item.status;

                // thay đổi tên gọi của button ==>> chú ý là tên ban đầu là "add"
                // Chỉ tên gọi thay đổi chứ id vẫn là <button type="button" id="add-job">
                // addingJob.textContent = "update";
                addingItem.textContent = "update";

                message.textContent = "";

                // addEditDiv.dataset.id = jobId;
                addEditDiv.dataset.id = itemId;

                setDiv(addEditDiv);
            } else if (response.status === 401) {
                if (data.msg === "Authentication Expired!") {
                    // message.textContent = data.msg;
                    message.textContent = `${data.msg} Please login again!`;

                    setToken(null);

                    showLogin();
                }
            } else {
                // might happen if the list has been updated since last display
                message.textContent = "The jobs entry was not found";

                //
                // showJobs();
                showItems();
            }
        } catch (err) {
            console.log(err);

            message.textContent = "A communications error has occurred.";

            //
            // showJobs();
            showItems();
        }

        enableInput(true);
    }
};
