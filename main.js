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

        mainDiv.setAttribute("class", "card");
        secondDiv.setAttribute("class", "card-body");
        company.setAttribute("class", "card-title");
        position.setAttribute("class", "card-text");
        time.setAttribute("class", "card-text");

        company.textContent = job.companyText;
        position.textContent = job.jobText;

        jobList.appendChild(mainDiv);
        mainDiv.appendChild(secondDiv);
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
  

contBtn.addEventListener("click", function(e) {
    e.preventDefault();
  
    localStorage.setItem("companyName", companyName.value);
    localStorage.setItem("jobTitle", jobTitle.value);

    let job = {
        companyText: companyName.value.trim(),
        jobText: jobTitle.value.trim()
    }

      jobs.push(job);

    storeJobs();
    renderJobs();
  });

