const newDiv = document.createElement('div');
const head = document.querySelector('.head');
newDiv.innerHTML =`
<div>Module 1 Technical Interview</div>
<div>Learner name: name</div>
<div>Date: test day</div>`;

head.insertAdjacentHTML('afterbegin', newDiv.innerHTML);
const API_URL = 'http://171.244.60.204:8080/jobs'

const fetchJobTitle = async () => {
  try {
fetch(API_URL)
.then((res) => res.json())
.then((data) => {
  console.log(data);
} catch (err) {
  console.log("err", err);
}
};

fetch(API_URL).then((result) => console.log(result))

const renderJobTitle = async (jobs) => {
  try {
    const data = await fetch(API_URL);
    const listEl = document.querySelector('.listEl');
    result.forEach(search => {
    listEl.innerHTML.appendChild(`<li>${search.title}</li>`);
  })
} catch (err) {
  console.log("err", err);
}
};


const searchButton = document.querySelector('.searchBtn');
const searchInput = document.querySelector('.searchInput');
const value = searchInput.value.trim();

const clickHandler = async (endpoint) {
  const data = await fetch(${API_URL}+'/jobs?q='${value})
  renderJobTitle();
};

searchButton.addEventListener('click', clickHandler());

const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
let pageNumber = 1;
previousBtn.addEventListener('click', () => {
  if (pageNumber > 1) {
      pageNumber--;
  } else {
      return;
  }
  console.log(pageNumber);
  renderJobTitle();
});

nextBtn.addEventListener('click', () => {
  pageNumber++;
  console.log(pageNumber);
  renderJobTitle();
});