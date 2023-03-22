const newDiv = document.createElement('div');
const head = document.querySelector('.head');
newDiv.innerHTML =`
<div>Module 1 Technical Interview</div>
<div>Learner name: name</div>
<div>Date: test day</div>`;
const API_URL = 'http://171.244.60.204:8080/jobs?_page=1&_limit=10';
head.insertAdjacentHTML('afterbegin', newDiv.innerHTML);

const fetchJobTitle = async (pageNumber) => {
  try {
  const url = `${API_URL}&_page=${pageNumber}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log (data)
  return data;
  } catch (error) {
    console.log("err", error);
  }
};

console.log(fetchJobTitle(API_URL));

const renderJobTitles = async (pageNumber) => {
    const data = await fetchJobTitle(pageNumber);
    const listEl = document.querySelector('#listEl');
    listEl.innerHTML = "";
    data.forEach(job => { 
      const title = `<li>${job.title}</li>`;
      listEl.insertAdjacentHTML('beforeend', title); 
    });
};

renderJobTitles(1);

const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
let pageNumber = 1;

previousBtn.addEventListener('click', async () => {
  if (pageNumber > 1) {
      pageNumber--;
      console.log(pageNumber);
      renderJobTitles(pageNumber);
    }
  });

  nextBtn.addEventListener('click', async () => {
    pageNumber++;
    console.log(pageNumber);
    renderJobTitles(pageNumber);
  });

const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');

searchButton.addEventListener('click', async (e) => {
  const value = searchInput.value.trim();
  const searchResults = await fetchJobTitle(`${API_URL}?q=${value}`);
  const listEl = document.querySelector('#listEl');
    listEl.innerHTML = "";
    searchResults.forEach(job => { 
      const title = `<li>${job.title}</li>`;
      listEl.insertAdjacentHTML('beforeend', title); 
    });
});


