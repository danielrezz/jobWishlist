let companyName = document.querySelector(".companyNameInput");
let jobTitle = document.querySelector(".jobTitleInput");
let jobList = document.querySelector("#job-list");
let jobCard = document.querySelector("#job-card");
let jobCount = document.querySelector("#job-count");
let contBtn = document.querySelector(".contBtn");

let jobs = [];

init();

function getRandomColor() {
    let colors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];
    let newColor = "";
    for (let i = 0; i < 1; i++) {
      newColor = colors[Math.floor(Math.random() * 5)];
    }
    getRandomColor.fired = true;
    return newColor;
  }

function renderJobs() {

    jobList.innerHTML = "";
    if(jobs.length === 1) {
        jobCount.textContent = `${jobs.length} job`;
    } else {
        jobCount.textContent = `${jobs.length} jobs`;
    }

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
        
        if (i === 0 || i === 6) {
        mainDiv.style.setProperty("background-color", "#ffb3ba");
        } else if (i === 1 || i === 7) {
            mainDiv.style.setProperty("background-color", "#bae1ff");
        } else if (i === 2 || i === 8) {
            mainDiv.style.setProperty("background-color", "#ffffba");
        } else if (i === 3 || i === 9) {
            mainDiv.style.setProperty("background-color", "#baffc9");
        } else if (i === 4 || i === 10) {
            mainDiv.style.setProperty("background-color", "#ffdfba");
        } else if (i === 5 || i === 11) {
            mainDiv.style.setProperty("background-color", "#c5b3e3");
        }

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

// function styleJobs() {
//     let mainDiv = document.querySelector(".card");
//     let time = document.querySelector(".card-text");

//     mainDiv.style.setProperty("background-color", getRandomColor());
//     time.innerHTML = `<small class="text-muted">${moment().startOf('hour').fromNow()}</small>`;
//     return;
// }

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
