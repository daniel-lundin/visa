(function(window, document, snabbt, undefined) {
  'use strict';



  var backgroundImage = document.getElementsByClassName('background-image')[0];
  var backgroundHeight = backgroundImage.clientHeight;

  var headerAnimation = snabbt(backgroundImage, {
    position: [0, backgroundHeight/2, 0],
    manual: true
  });

  var letters = document.querySelectorAll('.para-header .letter');

  var letterAnimation = snabbt(letters, {
    fromPosition: [200, 0, 0],
    position: [0, 0, 0],
    fromRotation: [0, 0, Math.PI],
    rotation: [0, 0, 0],
    delay: function(i) {
      return i*50;
    },
    duration: 1000,
    manual: true
  });

  window.addEventListener('scroll', function(event) {
    var scrollTop = window.pageYOffset;
    headerAnimation.setValue(Math.min(scrollTop / backgroundHeight, 1));
    letterAnimation.setValue(scrollTop / (backgroundHeight/2));
  });

})(window, document, window.snabbt);





