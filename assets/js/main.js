window.addEventListener('DOMContentLoaded', function () {
  // sound button
  var soundBtn = document.getElementById('sound-btn');
  var soundEnabled = false;
  var soundInProcess = false;
  var animTime = 500;
  soundBtn.addEventListener('click', function () {
    if (soundInProcess) {
      return;
    }

    if (!soundEnabled) {
      soundInProcess = true;
      soundBtn.classList.add('enabling');
      setTimeout(() => {
        soundBtn.classList.add('enabled');
        soundBtn.classList.remove('enabling');
        soundBtn.classList.remove('disabled');
        soundInProcess = false;
        soundEnabled = true;
      }, animTime);
    } else {
      soundInProcess = true;
      soundBtn.classList.add('disabling');
      setTimeout(() => {
        soundBtn.classList.add('disabled');
        soundBtn.classList.remove('disabling');
        soundBtn.classList.remove('enabled');
        soundInProcess = false;
        soundEnabled = false;
      }, animTime);
    }
  });

  // mouse and axis
  var width = window.innerWidth;
  var height = window.innerHeight;

  var axisX = document.getElementById('axis-x');
  var axisY = document.getElementById('axis-y');

  var arrowX = document.getElementById('arrow-x');
  var arrowY = document.getElementById('arrow-y');

  window.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;

    var percentX = x / width;
    var percentY = y / height;

    var topX = percentX * axisX.clientHeight;
    var topY = percentY * axisY.clientHeight;

    if (topX > axisX.clientHeight) {
      topX = axisX.clientHeight;
    } else if (topX < 0) {
      topX = 0;
    }

    if (topY > axisY.clientHeight) {
      topY = axisY.clientHeight;
    } else if (topY < 0) {
      topY = 0;
    }

    arrowX.style.top = topX + 'px';
    arrowY.style.top = topY + 'px';
  });

  // feedback axis
  // var feedbackAxisY = document.getElementById('feedback-axis-y');
  // var feedbackArrowY = document.getElementById('feedback-arrow-y');

  // window.addEventListener('mousemove', function (e) {
  //   var y = e.clientY;
  //   var percentY = y / height;
  //   var topY = percentY * feedbackAxisY.clientHeight;

  //   if (topY > feedbackAxisY.clientHeight) {
  //     topY = feedbackAxisY.clientHeight;
  //   } else if (topY < 0) {
  //     topY = 0;
  //   }

  //   feedbackArrowY.style.top = topY + 'px';
  // });

  // sound
  var audio = new Audio('/assets/sound/sound.mp3');

  audio.loop = true;

  audio.onended = function () {
    audio.play();
  };

  soundBtn.addEventListener('click', function () {
    if (!soundEnabled) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.about');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('menu-btn--active');
    menu.classList.toggle('about--active');
  });

  // AOS.init({ once: true, duration: 300 });

  const searchButton = document.getElementById('searchButton');
  const searchWrapper = document.querySelector('.search__wrapper');
  const searchCross = document.querySelector('.search__cross');
  searchButton.addEventListener('click', () => {
    const tagsLinks = Array.from(document.querySelectorAll('.search__tag > .search__tag-link'));
    const tagsContent = tagsLinks.map((link) => [link.innerHTML, link.getAttribute('href')]);
    shuffle(tagsContent);

    document.querySelectorAll('.search__tag > .search__tag-link').forEach((link, index) => {
      link.innerHTML = tagsContent[index][0];
      link.setAttribute('href', tagsContent[index][1]);
    });

    setTimeout(() => {
      document.querySelector('.search').classList.add('search--fixed')
      document.body.classList.add('body-fixed');
    }, 500);

    searchWrapper.classList.add('search__wrapper--active');
    AOS.init({ once: true, duration: 300 });
  });

  function closeSearch() {
    searchWrapper.classList.remove('search__wrapper--active');
    document.querySelector('.search').classList.remove('search--fixed');
    document.body.classList.remove('body-fixed');
    document.querySelectorAll('.search__tag').forEach((tag) => {
      tag.classList.remove('aos-init', 'aos-animate');
    });
  }

  searchCross.addEventListener('click', () => {
    closeSearch();
  });

  document.querySelectorAll('.search__tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      closeSearch();
    });
  });

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
});

SmoothScroll({
  animationTime: 800,
  stepSize: 75,
  accelerationDelta: 30,
  accelerationMax: 2,
  keyboardSupport: true,
  arrowScroll: 50,
  pulseAlgorithm: true,
  pulseScale: 4,
  pulseNormalize: 1,
  touchpadSupport: true,
});
