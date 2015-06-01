(function(window, document, snabbt, undefined) {
  'use strict';

  var eventCount = 0;
  var section;

  var element = document.getElementById('chaining');
  var balls = element.querySelectorAll('.ball');

  element.addEventListener('click', function() {
    snabbt(balls, {
      position: [300, 0, 0],
      delay: function(i) {
        return i * 200;
      },
    }).snabbt({
      position: [300, 300, 0],
    }).snabbt({
      position: [0, 300, 0],
    }).snabbt({
      position: [0, 0, 0],
    });
  });

})(window, document, window.snabbt);


