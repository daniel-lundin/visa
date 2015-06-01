(function(window, document, snabbt, undefined) {
  'use strict';


  // Manual example
  (function() {
    var flipper = document.getElementById('flipper');
    var flipperDrag = document.getElementById('flipper-drag');
    var flipperBackground = document.getElementById('flipper-background');

    var dragInProgress = false;

    function dragRightAnimations() {
      var animations = [];
      animations.push(snabbt(flipper, {
        fromRotation: [0, 0, 0],
        rotation: [0, -Math.PI, 0],
        transformOrigin: [75, 0, 0],
        manual: true,
        easing: 'ease',
        duration: 1000
      }));
      animations.push(snabbt(flipperBackground, {
        fromScale: [0.0, 0.0],
        scale: [1.0, 1.0],
        fromRotation: [0, 0, 2*Math.PI],
        rotation: [0, 0, 0],
        manual: true,
        easing: 'ease',
        duration: 1000
      }));
      return animations;
    }

    function dragLeftAnimations() {
      var animations = [];
      animations.push(snabbt(flipper, {
        fromRotation: [0, -Math.PI, 0],
        rotation: [0, 0, 0],
        transformOrigin: [75, 0, 0],
        manual: true,
        easing: 'ease',
        duration: 1000
      }));
      animations.push(snabbt(flipperBackground, {
        scale: [0.0, 0.0],
        fromRotation: [0, 0, 0],
        rotation: [0, 0, 2*Math.PI],
        manual: true,
        easing: 'ease',
        duration: 1000
      }));
      return animations;
    }

    // Execute callback after `number` calls
    var debouncedCallback = function(callback, number) {
      var n = number;
      return function() {
        n--;
        if(n === 0) {
          callback();
        }
      };
    };


    var hammer = new Hammer(flipperDrag);
    var opened = -1;
    var animations = [];
    hammer.on('pan', function(event) {
      if(!dragInProgress) {
        if(opened === -1) {
          animations = dragRightAnimations();
        } else {
          animations = dragLeftAnimations();
        }
        dragInProgress = true;
      }

      var delta = Math.min(1, Math.max(0, (-opened * event.deltaX)/200));
      if(animations.length) {
        animations.forEach(function(animation) {
          animation.setValue(delta);
        });
      }


      if(event.isFinal) {
        if(animations) {
          if(delta > 0.5) {
            var finishCallback = debouncedCallback(function() {
              dragInProgress = false;
              opened *= -1;
            }, animations.length);

            animations.forEach(function(animation) {
              animation.finish(finishCallback);
            });
          } else {
            var rollbackCallback = debouncedCallback(function() {
              dragInProgress = false;
            }, animations.length);

            animations.forEach(function(animation) {
              animation.rollback(rollbackCallback);
            });
          }
          animations = undefined;
        }
      }
    });
  })();
  
})(window, document, window.snabbt);




