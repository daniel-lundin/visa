(function(window, document, snabbt, undefined) {
  'use strict';


  var scrollPanel = document.getElementsByClassName('manual-scroll-panel')[0];

  //var letters = document.querySelectorAll('.manual-content .banner .letter');

  //var animation = snabbt(letters, {
  //  position: function(i, total) {
  //    return [
  //      Math.random() * 400 - 200,
  //      Math.random() * 400 - 200 + 400,
  //      Math.random() * 400,
  //    ];
  //  },
  //  rotation: [0, 0, 2*Math.PI],
  //  fromOpacity: 1,
  //  opacity: 0,
  //  perspective: 400,
  //  manual: true
  //});
  //
  window.slideController.addEventListener('manual-demo', 'enter', function() {
    scrollPanel.focus();
  });
  scrollPanel.focus();

  var background = document.getElementsByClassName('banner-background')[0];
  var backgroundHeight = background.clientHeight;

  var backgroundAnimation = snabbt(background, {
    position: [0, 0, 0],
    fromRotation: [0, 0, 0],
    rotation: [-Math.PI/2, 0, 0],
    transformOrigin: [0, backgroundHeight/2, 0],
    perspective: 1000,
    manual: true
  });

  var fullHeight = scrollPanel.clientHeight;

  scrollPanel.addEventListener('scroll', function(event) {
    //animation.setValue(event.target.scrollTop / fullHeight);
    backgroundAnimation.setValue(Math.min(event.target.scrollTop / backgroundHeight, 1));
    //codeAnimation.setValue(event.target.scrollTop / fullHeight);
  });

})(window, document, window.snabbt);




