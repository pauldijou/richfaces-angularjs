/*global module:false*/
module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    distdirv: '<%= distdir %>/archives/<%= pkg.version %>',
    distdirl: '<%= distdir %>/last',
    demodir: 'demo',
    filename: '<%= pkg.name %>',
    filenamev: '<%= filename %>-<%= pkg.version %>',
    filenamel: '<%= filename %>-<%= pkg.version %>',
    filenamed: '<%= filename %>',
    pkg : '<json:package.json>',
    meta : {
      banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    coffee: {
      build: {
        src: ['core/*.coffee', 'modules/**/*.coffee', 'demo/**/*.coffee'],
        extension: ".coffee.js"
      }
    },
    qunit : {
      files : [ 'test/**/*.html' ]
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'core/*.js', 'modules/**/*.js'],
        dest: '<%= distdir %>/<%= filename %>.js'
      },
      democontrollers: {
        src: ['<banner:meta.banner>', '<%= demodir %>/js/controllers/*.js' ],
        dest: '<%= demodir %>/js/controllers.js'
      }
    },
    recess: {
      dist: {
        src: ['core/<%= filename %>.less'],
        dest: '<%= distdir %>/<%= filename %>.css',
        options: {
          compile: true
        }
      },
      min: {
        src: '<config:recess.dist.dest>',
        dest: '<%= distdir %>/<%= filename %>.min.css',
        options: {
          compress: true
        }
      },
      demo: {
        src: ['<%= demodir %>/less/demo.less'],
        dest: '<%= demodir %>/css/demo.css',
        options: {
          compile: true
        }
      }
    },
    min : {
      dist : {
        src : [ '<banner:meta.banner>', '<config:concat.dist.dest>' ],
        dest : '<%= distdir %>/<%= filename %>.min.js'
      }
    },
    watch : {
      files : ['index.html', 'grunt.js', 'core/*', 'modules/**/*', 'demo/**/*'],
      tasks : 'dist'
    },
    lint : {
      files : [ 'grunt.js', '<%= distdir %>/<%= filename %>.js' ]
    },
    jshint : {
      options : {
        curly : true,
        eqeqeq : true,
        immed : true,
        latedef : true,
        newcap : true,
        noarg : true,
        sub : true,
        undef : true,
        boss : true,
        eqnull : true,
        browser : true
      },
      globals : {
          jQuery: true,
          angular: true,
          console: true,
          Prism: true
      }
    },
    uglify : {},
    copy: {
      archive: {
        files: {
          "<%= distdirv %>/<%= filenamev %>.js": "<%= distdir %>/<%= filename %>.js",
          "<%= distdirv %>/<%= filenamev %>.min.js": "<%= distdir %>/<%= filename %>.min.js",
          "<%= distdirv %>/<%= filenamev %>.css": "<%= distdir %>/<%= filename %>.css",
          "<%= distdirv %>/<%= filenamev %>.min.css": "<%= distdir %>/<%= filename %>.min.css"
        }
      },
      last: {
        files: {
          "<%= distdirl %>/<%= filenamel %>.js": "<%= distdir %>/<%= filename %>.js",
          "<%= distdirl %>/<%= filenamel %>.min.js": "<%= distdir %>/<%= filename %>.min.js",
          "<%= distdirl %>/<%= filenamel %>.css": "<%= distdir %>/<%= filename %>.css",
          "<%= distdirl %>/<%= filenamel %>.min.css": "<%= distdir %>/<%= filename %>.min.css"
        }
      },
      demo: {
        files: {
          "<%= demodir %>/js/<%= filenamed %>.js": "<%= distdir %>/<%= filename %>.js",
          "<%= demodir %>/css/<%= filenamed %>.css": "<%= distdir %>/<%= filename %>.css"
        }
      }
    },
    server: {
      port: 8000,
      base: '.'
    }
  });

  // Default task.
  grunt.registerTask('default', 'dist');
  
  grunt.registerTask('dist', 'coffee recess concat lint min copy');
  
  grunt.registerTask("run", "dist server watch");
};
