(function(window, document, snabbt, undefined) {
  'use strict';

  var springElement = document.getElementById('spring-easing');
  var easeElement = document.getElementById('ease');
  var easeInElement = document.getElementById('ease-in');
  var easeOutElement = document.getElementById('ease-out');

  window.slideController.addEventListener('easings', 'enter', function() {
    springElement.style.opacity = '0';
  });

  window.slideController.addEventListener('easings', 'keydown', function(data) {
    console.log(data);
    if(data === 32 || data === 13) {
      snabbt(springElement, {
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
    if(data === 69) {
      snabbt(easeElement, {
        position: [0, 100, 0],
        easing: 'ease'
      }).then({
        position: [0, 0, 0],
        easing: 'ease'
      });

      snabbt(easeInElement, {
        position: [0, 100, 0],
        easing: 'easeIn',
        delay: 1000
      }).then({
        position: [0, 0, 0],
        easing: 'easeIn'
      });

      snabbt(easeOutElement, {
        position: [0, 100, 0],
        easing: 'easeOut',
        delay: 2000
      }).then({
        position: [0, 0, 0],
        easing: 'easeOut'
      });
    }
  });

})(window, document, window.snabbt);


