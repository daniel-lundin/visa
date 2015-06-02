(function(window, document, snabbt, undefined) {
  'use strict';

  var springElement = document.getElementById('spring-easing-example');

  window.slideController.addEventListener('spring', 'keydown', function(data) {
    if(data === 32 || data === 13) {
      snabbt(springElement, {
        position: [100, 0, 0],
        easing: 'spring',
        springConstant: 0.7,
        springDeceleration: 0.8,
      }).snabbt({
        position: [0, 0, 0],
        easing: 'spring',
        springConstant: 0.7,
        springDeceleration: 0.8,
      });
    }
  });

})(window, document, window.snabbt);


