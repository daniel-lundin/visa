(function(window, document, snabbt, undefined) {
  'use strict';

  var eventCount = 0;
  var section;

  window.slideController.addEventListener('domtopixel-2', 'enter', function(eventSection) {
    console.log('enter domtopixel');
    console.log('eventSection: ' + eventSection);
    section = eventSection;
    eventCount = 0;
  });

  window.slideController.addEventListener('domtopixel-2', 'keydown', (function() {
    return function(data) {
      if(data === 32) {
        switch(eventCount) {
          case 0:
            var boxes = section.querySelectorAll('.render-graph .box');

            snabbt([boxes[0], boxes[3]], {
              fromWidth: boxes[0].clientWidth,
              width: 2 * boxes[0].clientWidth,
            });

            snabbt([boxes[1], boxes[2]], {
              fromWidth: boxes[1].clientWidth,
              width: 0,
              fromOpacity: 1,
              opacity: 0
            });
            break;
          case 1:
            break;
          default:
            break;
        }

      }
      console.log(data);
    };
  })());

})(window, document, window.snabbt);

