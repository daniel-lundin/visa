(function(window, document, snabbt, undefined) {
  'use strict';

  var eventCount = 0;
  var section;

  var element = document.getElementById('chaining');

  element.addEventListener('click', function() {
    snabbt(element, {
      position: [100, 0, 0],
      rotation: [0, 0, Math.PI/4]
    }).snabbt({
      position: [100, 100, 0],
      rotation: [0, 0, Math.PI/2]
    }).snabbt({
      position: [0, 100, 0],
      rotation: [0, 0, 3*Math.PI/4]
    }).snabbt({
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    });
  });
  window.slideController.addEventListener('chaining', 'enter', function(eventSection) {
    console.log('chaining enter');

  });

})(window, document, window.snabbt);


