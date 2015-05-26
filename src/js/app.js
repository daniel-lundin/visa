(function(window, document, undefined) {
  'use strict';

  var directions = {
    BACKWARD: 1,
    FORWARD: 2
  };
  var vw = window.innerWidth / 100;
  var vh = window.innerHeight / 100;

  window.slideController = {
    init: function() {
      this.slides = document.getElementsByTagName('section');
      this.currentSlide = 0;
      this.setupEventListeners();

      this.slideInLeft(this.currentSlide);
    },

    slideInLeft: function(index) {
      this.slides[index].style.opacity = '1';
      snabbt(this.slides[index], {
        //fromPosition: [-100*vw, 0, 0],
        position: [0, 0, 0],
        //fromRotation: [0, -Math.PI, 0],
        rotation: [0, 0, 0],
        perspective: 50*vw,
        transformOrigin: [-50*vw, 0, 0],
        easing: 'ease'
      });
    },

    slideOutLeft: function(index) {
      snabbt(this.slides[index], {
        //fromPosition: [0, 0, 0],
        position: [-100*vw, 0, 0],
        rotation: [0, -Math.PI, 0],
        //fromRotation: [0, 0, 0],
        perspective: 50*vw,
        transformOrigin: [-50*vw, 0, 0],
        easing: 'ease'
      });
    },

    slideInRight: function(index) {
      this.slides[index].style.opacity = 1;
      snabbt(this.slides[index], {
        position: [0, 0, 0],
        //fromPosition: [100*vw, 0, 0],
        //fromRotation: [0, Math.PI, 0],
        rotation: [0, 0, 0],
        perspective: 50*vw,
        transformOrigin: [50*vw, 0, 0],
        easing: 'ease'
      });
    },

    slideOutRight: function(index) {
      snabbt(this.slides[index], {
        //fromPosition: [0, 0, 0],
        position: [100*vw, 0, 0],
        //fromRotation: [0, 0, 0],
        rotation: [0, Math.PI, 0],
        perspective: 50*vw,
        transformOrigin: [50*vw, 0, 0],
        easing: 'ease'
      });
    },

    gotoPrevious: function() {
      if(this.currentSlide === 0)
        return;

      this.slideInLeft(this.currentSlide - 1);
      this.slideOutRight(this.currentSlide);
      this.currentSlide--;
    },

    gotoNext: function() {
      if(this.currentSlide === this.slides.length - 1)
        return;

      this.slideInRight(this.currentSlide + 1);
      this.slideOutLeft(this.currentSlide);
      this.currentSlide++;
    },

    setupEventListeners: function() {
      document.addEventListener('keydown', function(event) {
        console.log(event);
        if(event.keyCode === 37) {
          this.gotoPrevious();
        }
        if(event.keyCode === 39) {
          this.gotoNext();
        }
      }.bind(this));
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    window.slideController.init();
  });

  window.addEventListener('resize', function() {
    var vw = window.innerWidth / 100;
    var vh = window.innerHeight / 100;
  });


}(window, document));
