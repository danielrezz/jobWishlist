let companyName = document.querySelector(".companyNameInput");
let jobTitle = document.querySelector(".jobTitleInput");
let jobList = document.querySelector("#job-list");
let jobCard = document.querySelector("#job-card");
let jobCount = document.querySelector("#job-count");
let contBtn = document.querySelector(".contBtn");

let jobs = [];

init();

function renderJobs() {

    jobList.innerHTML = "";
    jobCount.textContent = jobs.length;

    for (var i = 0; i < jobs.length; i++) {
        let job = jobs[i];

        let mainDiv = document.createElement("div");
        let secondDiv = document.createElement("div");
        let company = document.createElement("h5");
        let position = document.createElement("p");
        let time = document.createElement("p");

        let button = document.createElement("i");
        button.className = "deleteBtn bi bi-trash";

        mainDiv.className = "card";
        mainDiv.setAttribute("data-index", i);

        secondDiv.className = "card-body";
        company.className = "card-title";
        position.className = "card-text";
        time.className = "card-text";

        company.textContent = job.companyText;
        position.textContent = job.jobText;
        time.innerHTML = `<small class="text-muted">${moment().startOf('hour').fromNow()}</small>`;

        jobList.appendChild(mainDiv);
        mainDiv.appendChild(secondDiv);
        company.appendChild(button);
        secondDiv.appendChild(company);
        company.appendChild(position);
        position.appendChild(time);
    }
}

function init() {

    let storedJobs = JSON.parse(localStorage.getItem("jobs"));

    if (storedJobs !== null) {
        jobs = storedJobs;
    }

    renderJobs();
}

function storeJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}


contBtn.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.setItem("companyName", companyName.value);
    localStorage.setItem("jobTitle", jobTitle.value);

    let job = {
        companyText: companyName.value.trim(),
        jobText: jobTitle.value.trim()
    }

    jobs.push(job);
    companyName.value = "";
    jobTitle.value = "";

    storeJobs();
    renderJobs();
});

jobList.addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("i") === true) {

        let index = element.parentElement
        .parentElement.parentElement.getAttribute("data-index");
        jobs.splice(index, 1);

        storeJobs();
        renderJobs();
    }
});