const newDiv = document.createElement("div");
const head = document.querySelector(".head");
newDiv.innerHTML = `
<div>Module 1 Technical Interview</div>
<div>Learner name: name</div>
<div>Date: test day</div>`;
head.insertAdjacentHTML("afterbegin", newDiv.innerHTML);

const buildApiUrl = (page = 1, limit = 10, searchValue = "") => {
  const baseUrl = "http://171.244.60.204:8080/jobs";
  return `${baseUrl}?_page=${page}&_limit=${limit}&q=${searchValue}`;
};
let pageNumber = 1;

const updatePaginationButtons = () => {
  const previousBtn = document.querySelector("#previous");
  const nextBtn = document.querySelector("#next");

  if (pageNumber <= 1) {
    previousBtn.parentElement.classList.add("disabled");
  } else {
    previousBtn.parentElement.classList.remove("disabled");
  }
};

const fetchJobTitle = async (value = "", page = 1) => {
  try {
    const url = buildApiUrl(page, 10, value);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

fetchJobTitle();

const renderJobTitles = async (searchValue = "", page = "1") => {
  const data = await fetchJobTitle(searchValue, page);
  const listEl = document.querySelector("#listEl");
  listEl.innerHTML = "";
  data.forEach((job) => {
    const title = `<li>${job.title}</li>`;
    listEl.insertAdjacentHTML("beforeend", title);
  });
  updatePaginationButtons();
};

const searchButton = document.querySelector("#searchButton");
const previousBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const searchInput = document.querySelector("#searchInput");
const pageNumberButtons = document.querySelectorAll(".page-number");

searchButton.addEventListener("click", (e) => {
  const value = searchInput.value;
  pageNumber = 1;
  renderJobTitles(value, pageNumber.toString());
});

previousBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (pageNumber > 1) {
    pageNumber--;
    renderJobTitles("", pageNumber.toString());
  }
});

nextBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  pageNumber++;
  renderJobTitles("", pageNumber.toString());
});

pageNumberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    pageNumber = parseInt(button.textContent);
    renderJobTitles("", pageNumber);
  });
});

renderJobTitles();
