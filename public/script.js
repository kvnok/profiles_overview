import dudeDataArr from './dudeData.js';

const dudeContainer = document.getElementById('dude-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let startingIndex = 0;
let endingIndex = 8;

const displayDudes = (dudes) => {
  dudeContainer.innerHTML = ''; // Clear previous content
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

displayDudes(dudeDataArr.slice(startingIndex, endingIndex));

loadMoreBtn.addEventListener('click', fetchMoreDudes);