const dudeContainer = document.getElementById('dude-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let startingIndex = 0;
let endingIndex = 8;
let dudeDataArr = [];

fetch('profiles.json')
  .then((res) => res.json())
  .then((data) => {
    dudeDataArr = data;
    displayDudes(dudeDataArr.slice(startingIndex, endingIndex));  
  })
  .catch((err) => {
   dudeContainer.innerHTML = '<p class="error-msg">There was an error loading the dudes</p>';
  });

const fetchMoreDudes = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayDudes(dudeDataArr.slice(startingIndex, endingIndex));
  if (dudeDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
	loadMoreBtn.style.cursor = 'not-allowed';
    loadMoreBtn.textContent = 'No more data to load';
  }
};

const displayDudes = (dudes) => {
  dudes.forEach(({ dude, image, url, bio }, index) => {
    dudeContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="dude-name">${dude}</h2>
      <img class="user-img" src="${image}" alt="${dude} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
      <a class="dude-link" href="${url}" target="_blank">${dude} dude page</a>
    </div>
  `;
  });
};

loadMoreBtn.addEventListener('click', fetchMoreDudes);