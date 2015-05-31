module.exports = function(grunt) {

  var config = {
    connectOptions: {
      base: 'www-root',
      hostname: 'localhost',
      port: 9000
    },
    buildFolder: 'dist',
    livereload: 9001,
    jsLibFiles: [
      'bower_components/snabbt.js/snabbt.min.js',
      'bower_components/prism/prism.js'
    ],
    jsFiles: [
      'app.js',
      'domtopixel.js',
      'chaining.js',
      'multi-element-animations.js',
      'intro.js',
      'simple-examples.js',
    ],
    parallaxJsFiles: [
      'parallax.js'
    ]
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connectOptions: config.connectOptions,
    buildFolder: config.buildFolder,

    connect: {
      server: {
        options: config.connectOptions
      }
    },

    clean: {
      deploy: [config.buildFolder],
      develop: [config.connectOptions.base]
    },

    jade: {
      develop: {
        options: {
          data: {
            jsFiles: config.jsFiles,
            parallaxJsFiles: config.parallaxJsFiles,
            jsLibFiles: config.jsLibFiles,
            develop: true
          }
        },
        files: {
          '<%= connectOptions.base %>/index.html': 'src/jade/index.jade',
          '<%= connectOptions.base %>/parallax.html': 'src/jade/parallax.jade'
        }
      },
      deploy: {
        options: {
          data: {
            jsFiles: ['app-<%= pkg.version %>.min.js' ],
            parallaxJsFiles: ['parallax-<%= pkg.version %>.min.js' ],
            develop: false,
            version: '<%= pkg.version %>'
          }
        },
        files: {
          '<%= buildFolder %>/index.html': 'src/jade/index.jade',
          '<%= buildFolder %>/parallax.html': 'src/jade/parallax.jade'
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/js/**/*.js'],
      options: {
        globals: {
          console: true
        }
      }
    },

    scsslint: {
      allFiles: [
        'src/scss/**/*.scss'
      ],
      options: {
        config: ".scss-lint-config.yml",
        reporterOutput: null
      }
    },

    sass: {
      develop: {
        files: {
          '<%= connectOptions.base %>/css/app.css': 'src/scss/app.scss'
        }
      },
      deploy: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= buildFolder %>/css/app-<%= pkg.version %>.min.css': 'src/scss/app.scss'
        }
      }
    },

    copy: {
      develop: {
        files: [
          {
            expand: true,
            src: [
              'assets/**/*'
            ],
            dest: '<%= connectOptions.base %>/',
            cwd: 'src/'
          },
          {
            expand: true,
            src: config.jsLibFiles,
            dest: '<%= connectOptions.base %>/js'
          },
          {
            expand: true,
            src: config.jsFiles,
            dest: '<%= connectOptions.base %>/js',
            cwd: 'src/js'
          },
          {
            expand: true,
            src: config.parallaxJsFiles,
            dest: '<%= connectOptions.base %>/js',
            cwd: 'src/js'
          }
        ]
      },
      deploy: {
        files: [
          {
            expand: true,
            src: [
              'assets/**/*'
            ],
            dest: '<%= buildFolder %>/',
            cwd: 'src/'
          }
        ]
      }
    },

    uglify: {
      deploy: {
        files: {
          '<%= buildFolder %>/js/app-<%= pkg.version %>.min.js': (function() {
            var allFiles = [];

            config.jsFiles.forEach(function(f) {
              allFiles.push('src/js/' + f);
            });

            return config.jsLibFiles.concat(allFiles);
          }()),
          '<%= buildFolder %>/js/parallax-<%= pkg.version %>.min.js': (function() {
            var allFiles = [];

            config.parallaxJsFiles.forEach(function(f) {
              allFiles.push('src/js/' + f);
            });

            return config.jsLibFiles.concat(allFiles);
          }())
        }
      }
    },

    open : {
      dev : {
        path: 'http://<%= connectOptions.hostname %>:<%= connectOptions.port %>/index.html',
        app: 'Google Chrome'
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: config.livereload
        },
        files: [ '<%= connectOptions.base %>/**/*']
      },
      jade: {
        files: ['src/jade/*.jade'],
        tasks: ['jade']
      },
      js: {
        files: ['Gruntfile.js', 'src/js/**/*.js'],
        tasks: ['jshint', 'copy:develop']
      },
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:develop']
      },
      assets: {
        files: ['src/assets/**/*'],
        tasks: ['copy:develop']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('develop', ['clean:develop', 'jade:develop', 'sass:develop', 'jshint', 'copy:develop', 'connect', 'open', 'watch']);
  grunt.registerTask('build', ['clean:deploy', 'jade:deploy', 'sass:deploy', 'jshint', 'uglify', 'copy:deploy']);
};
