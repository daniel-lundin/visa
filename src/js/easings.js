(function(window, document, snabbt, undefined) {
  'use strict';

  var element = document.getElementById('spring-easing');

  window.slideController.addEventListener('easings', 'enter', function() {
    element.style.opacity = '0';
  });

  window.slideController.addEventListener('easings', 'keydown', function(data) {
    if(data === 32) {
      snabbt(element, {
        fromRotation: [0, Math.PI/2, 0],
        rotation: [0, 0, 0],
        fromPosition: [0, 0, -600],
        position: [0, 0, 0],
        fromOpacity: 1,
        opacity: 1,
        easing: 'spring',
        springConstant: 0.3,
        perspective: 600,
      });
    }
  });

})(window, document, window.snabbt);


