(function(window, document, snabbt, undefined) {
  'use strict';

  var expanded = false;

  var element = document.getElementById('multi-element-toggle');
  var balls = document.querySelectorAll('.multi-element .ball');

  element.addEventListener('click', function() {
    if(!expanded) {
      snabbt(balls, {
        position: [200, 0, 0],
        rotationPost: function(i, total) {
          return [0, 0, (i / total)  * 2 * Math.PI];
        },
        rotation: [2*Math.PI, 0, 0],
        perspective: 300
      });
    } else {
      snabbt(balls, {
        position: [0, 0, 0],
        rotationPost: [0, 0, 0],
        rotation: [0, 0, 0],
      });
    }
    expanded = !expanded;
  });
  window.slideController.addEventListener('chaining', 'enter', function(eventSection) {
    console.log('chaining enter');

  });

})(window, document, window.snabbt);



