document.addEventListener('DOMContentLoaded', function(event) {

  // Галерея изображений

  var galleryBox = document.querySelector('.JS-gallery-container')
  var stage = galleryBox.querySelector('.JS-stage')
  var quantity = stage.children.length;
  var styles = getComputedStyle(stage);
  var stageSize = styles.width.replace('px', '');
  var elementSize = stageSize / quantity;
  var buttonLeft = galleryBox.querySelector('.JS-button-left')
  var buttonRight = galleryBox.querySelector('.JS-button-right')
  var i = 0;

  var slide = function(distance) {
    stage.style.transform = ('translateX(' + distance + 'px)')
  };

  var slideLeft = function() {
    i += elementSize
    if (i > 0) {
      i = -(stageSize - elementSize);
    }
    slide(i)
  };

  var slideRight = function() {
    i -= elementSize;
    if (-i > (stageSize - elementSize)) {
      i = 0;
    }
    slide(i);
  }

  buttonLeft.addEventListener('click', function() {
    slideLeft()
  });

  buttonRight.addEventListener('click', function() {
    slideRight()
  });

  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 37) {
      slideLeft()
    } else if (evt.keyCode === 39) {
      slideRight()
    }
  });

  // Модальное окно

  var openButton1 = document.querySelector('.JS-contact-button-1');
  var openButton2 = document.querySelector('.JS-contact-button-2');
  var modal = document.querySelector('.JS-modal');
  var closeModal = document.querySelector('.JS-close-button');

  var opener = function() {
    modal.classList.add('background--active')
  };

  var closer = function() {
    modal.classList.remove('background--active')
  };

  openButton1.addEventListener('click', function() {
    opener()
  });

  openButton2.addEventListener('click', function() {
    opener()
  });

  closeModal.addEventListener('click', function() {
    closer()
  });

  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      closer()
    }
  });

});
