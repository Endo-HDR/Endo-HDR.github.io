function copyToClipboard() {
  const pre = document.querySelector('.bibcontainer pre');
  const textToCopy = pre.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}
 

const videosGroup2 = [
 "./static/video/pulling-nerf.mp4",
  "./static/video/pulling-depth-nerf.mp4",
  "./static/video/seq3-nerf.mp4",
  "./static/video/seq3-depth-nerf.mp4"
];
let currentIndex2 = 0;

const videoPlayer2 = document.getElementById('video-player-2');
const dotsContainer2 = document.getElementById('dots-container-2');
const prevButton2 = document.getElementById('prev-button-2');
const nextButton2 = document.getElementById('next-button-2');

function initDots2() {
  for (let i = 0; i < videosGroup2.length; i++) {
    let dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => changeVideo2(i));
    dotsContainer2.appendChild(dot);
  }
}

function updateDots2() {
  const dots = dotsContainer2.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentIndex2) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function changeVideo2(index) {
  currentIndex2 = (index + videosGroup2.length) % videosGroup2.length;
  let currentSource = videosGroup2[currentIndex2];

  videoPlayer2.classList.remove('show');

  setTimeout(() => {
    videoPlayer2.src = currentSource;
    videoPlayer2.play();

    videoPlayer2.onloadeddata = () => {
      videoPlayer2.classList.add('show');
      updateDots2();
    };
  }, 500);
}

initDots2();
videoPlayer2.addEventListener('ended', () => changeVideo2(currentIndex2 + 1));

// Optional: Handle previous and next buttons
prevButton2.addEventListener('click', () => changeVideo2(currentIndex2 - 1));
nextButton2.addEventListener('click', () => changeVideo2(currentIndex2 + 1));

changeVideo2(0);