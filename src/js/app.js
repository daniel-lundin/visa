(function(window, document, undefined) {
  'use strict';

  var directions = {
    BACKWARD: 1,
    FORWARD: 2
  };
  var vw = window.innerWidth / 100;
  var vh = window.innerHeight / 100;


  window.slideController = {
    eventListeners: {},
    eventNames: {
      ENTER: 'enter',
      LEAVE: 'leave',
      KEYDOWN: 'keydown'
    },

    init: function() {
      this.slides = document.getElementsByTagName('section');
      this.currentSlide = this.getSlideFromHash();
      this.setupEventListeners();
      console.log(this.currentSlide);
      this.slideInLeft(this.currentSlide);
      this.updateSlideFragments();
    },

    updateSlideFragments: function() {
      this.fragments = this.slides[this.currentSlide].querySelectorAll('.fragment');
      this.fragments = Array.prototype.slice.call(this.fragments);
      console.log(this.fragments);
      this.fragmentCount = this.fragments.length;
      this.fragmentIndex = 0;
      this.fragments.forEach(function(fragment) {
        fragment.style.opacity = '0';
      });
    },

    addEventListener: function(slideName, eventName, eventListener) {
      if(this.eventListeners[slideName] === undefined)
        this.eventListeners[slideName] = {};
      if(this.eventListeners[slideName][eventName] === undefined)
        this.eventListeners[slideName][eventName] = [];

      this.eventListeners[slideName][eventName].push(eventListener);

    },

    slideInLeft: function(index) {
      this.slides[index].style.opacity = '1';
      snabbt(this.slides[index], {
        fromPosition: [-100*vw, 0, 0],
        position: [0, 0, 0],
        easing: 'ease'
      });
    },

    slideOutLeft: function(index) {
      snabbt(this.slides[index], {
        fromPosition: [0, 0, 0],
        position: [-100*vw, 0, 0],
        easing: 'ease'
      });
    },

    slideInRight: function(index) {
      this.slides[index].style.opacity = 1;
      snabbt(this.slides[index], {
        position: [0, 0, 0],
        fromPosition: [100*vw, 0, 0],
        easing: 'ease'
      });
    },

    slideOutRight: function(index) {
      snabbt(this.slides[index], {
        fromPosition: [0, 0, 0],
        position: [100*vw, 0, 0],
        easing: 'ease'
      });
    },

    gotoPrevious: function() {
      if(this.currentSlide === 0)
        return;

      this.slideInLeft(this.currentSlide - 1);
      this.slideOutRight(this.currentSlide);

      this.triggerEvent(this.currentSlide - 1, this.eventNames.ENTER);
      this.triggerEvent(this.currentSlide, this.eventNames.LEAVE);
      this.currentSlide--;
    },

    gotoNext: function() {

      if(this.fragmentIndex < this.fragmentCount) {
        snabbt(this.fragments[this.fragmentIndex], {
          fromOpacity: 0,
          opacity: 1,
        });
        this.fragmentIndex++;
        return;
      }

      if(this.currentSlide === this.slides.length - 1)
        return;

      this.slideInRight(this.currentSlide + 1);
      this.slideOutLeft(this.currentSlide);

      this.triggerEvent(this.currentSlide + 1, this.eventNames.ENTER);
      this.triggerEvent(this.currentSlide, this.eventNames.LEAVE);
      this.currentSlide++;
      this.updateSlideFragments();
    },

    setupEventListeners: function() {
      document.addEventListener('keydown', function(event) {
        if(event.keyCode === 37) {
          this.gotoPrevious();
        }
        if(event.keyCode === 39) {
          this.gotoNext();
        }
        this.updateHash();
      }.bind(this));
    },

    triggerEvent: function(slideIndex, eventName, data) {
      var slideName = this.slides[slideIndex].getAttribute('data-slide-name');

      if(this.eventListeners[slideName] === undefined) {
        return;
      }

      if(this.eventListeners[slideName][eventName] === undefined) {
        return;
      }

      this.eventListeners[slideName][eventName].forEach(function(listener) {
        listener(data);
      });
    },

    updateHash: function() {
      window.location.hash = this.currentSlide;
    },

    getSlideFromHash: function() {
      try {
        var slideNumber = window.location.hash.substr(1);
        var number = parseInt(slideNumber, 10);
        if(number != number) {
          return 0;
        }
      } catch(e) {
        return 0;
      }
    }

  };

  document.addEventListener('DOMContentLoaded', function() {
    window.slideController.init();

    window.slideController.addEventListener('agenda', 'enter', function() {
      console.log('agenda enter');
    });

  });

  window.addEventListener('resize', function() {
    var vw = window.innerWidth / 100;
    var vh = window.innerHeight / 100;
  });



}(window, document));
