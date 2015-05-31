(function(window, document, snabbt, undefined) {
  'use strict';

  var element = document.getElementById('intro-animation');

  element.addEventListener('click', function() {
    snabbt(element, {
      scale: [20, 0],
      easing: 'ease',
    }).snabbt({
      scale: [1, 1],
      easing: 'ease',
    });
  });
})(window, document, window.snabbt);

