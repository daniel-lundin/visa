(function(window, document, snabbt, undefined) {
  'use strict';

  var example1 = document.getElementById('example1');
  var example2 = document.getElementById('example2');
  var example3 = document.getElementById('example3');

  example1.addEventListener('click', function() {
    snabbt(example1, {
      position: [200, 0, 0],
    });
  });

  example2.addEventListener('click', function() {
    snabbt(example2, {
      rotation: [0, 0, Math.PI],
    });
  });

  example3.addEventListener('click', function() {
    snabbt(example3, {
      position: [200, 0, 0],
      rotation: [0, 0, Math.PI],
    });
  });
})(window, document, window.snabbt);


