(function(window, snabbt) {

  slideController.addEventListener('freestyle', 'enter', function() {
    console.log('settings up freestyle demo');
    
    var createPatch = function(element) {
      var matrix = snabbt.createMatrix();

      var rotX = 0;
      var rotY = 0;
      var rotOffsetX = 0;
      var rotOffsetY = 0;
      var rotationVelocityX = 0;
      var rotationVelocityY = Math.PI/16;
      var position = [0, 0, 0];
      var velocity = [0, 0, 0];
      
      var updateElement = function() {
        matrix.clear();
        matrix.translate(position[0], position[1], position[2]);
        matrix.rotateX(rotX + rotOffsetX);
        matrix.rotateY(rotY + rotOffsetY);
        snabbt.setElementTransform(element, matrix);
      };

      // Public api
      return {
        tick: function() {
          rotX += rotationVelocityX;
          rotY += rotationVelocityY;
          rotationVelocityX *= 0.98;
          rotationVelocityY *= 0.98;
          if(Math.abs(rotationVelocityX) < 0.001) {
            rotationVelocityX = 0;
          }
          if(Math.abs(rotationVelocityY) < 0.001) {
            rotationVelocityY = 0;
          }
          updateElement();
        },

        setRotateXOffset: function(value) {
          rotationVelocityX = 0;
          rotOffsetX = value;
        },

        setRotateYOffset: function(value) {
          rotationVelocityY = 0;
          rotOffsetY = value;
        },

        spin: function(velocityX, velocityY) {
          rotX += rotOffsetX;
          rotY += rotOffsetY;
          rotOffsetX = 0;
          rotOffsetY = 0;
          rotationVelocityX = velocityY;
          rotationVelocityY = velocityX;
        },

        randomizePosition: function() {
          position = [(0.5 - Math.random()) * 400, (0.5 - Math.random()) * 400, (0.5 - Math.random()) * 400];
        }

      };
    };

    var PATCH_COUNT = 30;
    var elements = [];
    var container = document.getElementById('patch-container');
    var patchObjects = [];

    var i;
    for(i=0; i<PATCH_COUNT; ++i) {
      var element = document.createElement('div');
      element.className = 'patch';
      container.appendChild(element);
      patchObjects.push(createPatch(element));
    }
    patchObjects.forEach(function(patch) {
      patch.randomizePosition();
    });

    var hammer = new Hammer(document.getElementById('touch-area'));
    hammer.on('pan', function(event) {
      
      var v = event.deltaX/200;
      var y = event.deltaY/200;
      patchObjects.forEach(function(patch) {
        patch.setRotateYOffset(-v*Math.PI);
        patch.setRotateXOffset(-y*Math.PI);
      });


      if(event.isFinal) {
        patchObjects.forEach(function(patch) {
          patch.spin(event.velocityX/10, event.velocityY/10);
        });

      }
    });

    function animationFrame() {
      patchObjects.forEach(function(patch) {
        patch.tick();
      });
      window.requestAnimationFrame(animationFrame);
    }

    window.requestAnimationFrame(animationFrame);
  });
  
})(window, window.snabbt);

