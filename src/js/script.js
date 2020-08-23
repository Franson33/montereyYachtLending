"use strict"

document.addEventListener("DOMContentLoaded", function(event) {

  // Галерея изображений

let gallery = {
  galleryBox: document.getElementById("JS-gallery-container"),
  stage: document.getElementById("JS-stage"),
  stageSlides: document.getElementById("JS-stage").children,

  buttonLeft: document.getElementById("JS-button-left"),
  buttonRight: document.getElementById("JS-button-right"),

  startPointFinder() {
    let galleryInfo = this.galleryBox.getBoundingClientRect();
    let startPoint = Math.floor(galleryInfo.left);
    return startPoint;
  },

  slidesFinder() {
    let slidesInfo = [];
    let stageLength = this.stage.children.length;
    for (let i = 0; i < stageLength; i++) {
      let slideInfo = this.stageSlides[i].getBoundingClientRect();
      slidesInfo.push(slideInfo.x);
    };
    return slidesInfo;
  },

  stepFinder() {
    let steps = [];
    let stageLength = this.stageSlides.length;
    let step = 100 / stageLength;
    let currentStep = 0;
    for (let y = 0; y < stageLength; y++) {
      steps.push(-currentStep);
      currentStep += step;
    };
    return steps;
  },

  slideIndexFinder() {
    let info = this.slidesFinder();
    let start = this.startPointFinder();
    let slideIndex;
    for (let l = 0; l < info.length; l++) {
      if (Math.floor(info[l]) === start) {
        slideIndex = l;
        break;
      };
    };
    return slideIndex;
  },

  nextStepsFinder() {
    let steps = this.stepFinder();
    let index = this.slideIndexFinder();

    let nextStepLeft = steps[index - 1];
    let nextStepRight = steps[index + 1];

    if (index === 0) {
      nextStepLeft = steps[steps.length - 1];
    } else if (index === steps.length - 1) {
      nextStepRight = steps[0];
    };

    let nextSteps = [
      nextStepLeft, nextStepRight
    ];

    return nextSteps;
  },

  slide(direction) {
    let nextSteps = this.nextStepsFinder();

    if (direction === "left") {
      this.stage.style.transform = ("translateX(" + nextSteps[0] + "%)");
    } else if (direction === "right") {
      this.stage.style.transform = ("translateX(" + nextSteps[1] + "%)");
    };
  },

  buttonsControl() {
    this.buttonLeft.addEventListener("click", function() {
      gallery.slide("left");
    });
    this.buttonRight.addEventListener("click", function() {
      gallery.slide("right");
    });
  },

  keyboardControl() {
    document.addEventListener("keydown", function(evt) {
      if (evt.keyCode === 37) {
        gallery.slide("left");
      } else if (evt.keyCode === 39) {
        gallery.slide("right");
      };
    });
  },

  swipeMouse() {
    let swipeArea = this.galleryBox;
    let isSwipe = false;
    let x = 0;
    let swipeStart;
    let swipeFinish;

    swipeArea.addEventListener("mousedown", function(evt) {
      x = evt.offsetX;
      swipeStart = x;
      isSwipe = true;
    });

    swipeArea.addEventListener("mousemove", function(evt) {
      if (isSwipe === true) {
        x = evt.offsetX;
        swipeFinish = x;
        swipeCheck(swipeStart, swipeFinish);
      };
    });

    swipeArea.addEventListener("mouseup", function(evt) {
      if (isSwipe === true) {
        x = 0;
        isSwipe = false;
      };
    });

    function swipeCheck(start, finish) {
      let result = start - finish;
      if (result > 100 || result < -100) {
        if (result > 0) {
          gallery.slide("right");
        } else {
          gallery.slide("left");
        };
      };
    };
  },

  swipeTouch() {
    let swipeArea = this.galleryBox;

    swipeArea.addEventListener("touchstart", touchToMouse, true);
    swipeArea.addEventListener("touchmove", touchToMouse, true);
    swipeArea.addEventListener("touchend", touchToMouse, true);

    function touchToMouse(evt) {
      let theTouch = evt.changedTouches[0];
      let mouseEvt;

      switch(evt.type) {
        case "touchstart": mouseEvt="mousedown"; break;
        case "touchmove":  mouseEvt="mousemove"; break;
        case "touchend":   mouseEvt="mouseup"; break;

        default: return;
      };

      let mouseEvent = document.createEvent("MouseEvent");

      mouseEvent.initMouseEvent(mouseEvt, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
      theTouch.target.dispatchEvent(mouseEvent);

      evt.preventDefault();
    };
  },

  galleryStart() {
    this.buttonsControl();
    this.keyboardControl();
    this.swipeMouse();
    this.swipeTouch();
  },
};

gallery.galleryStart();

  // Модальное окно

function modalOpener() {

  let openButton1 = document.getElementById("JS-contact-button-1");
  let openButton2 = document.getElementById("JS-contact-button-2");
  let modal = document.getElementById("JS-modal");
  let closeModal = document.getElementById("JS-close-button");

  function modalWindowToggler(state) {
    if (state === "open") {
      modal.classList.add("background--active");
    } else if (state === "close") {
      modal.classList.remove("background--active");
    };
  };

  openButton1.addEventListener("click", function() {
    let action = "open";
    modalWindowToggler(action)
  });

  openButton2.addEventListener("click", function() {
    let action = "open";
    modalWindowToggler(action)
  });

  closeModal.addEventListener("click", function() {
    let action = "close";
    modalWindowToggler(action)
  });

  document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      let action = "close";
      modalWindowToggler(action);
    };
  });
};

modalOpener();

});
