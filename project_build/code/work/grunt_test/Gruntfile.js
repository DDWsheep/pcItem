/*
运行grunt指令, 会去加载读取的配置文件
 */
module.exports = function (grunt) {
  //1. 初始化插件配置
  grunt.initConfig({
    //es6语法转es5
    babel: {        //配置任务名
      options: {    //配置选项
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand:true,     //如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
          cwd:'src/',      //js目录下
          src:['**/*.js'], //所有js文件
          dest:'build/'    //输出到此目录下
        }]
      }
    },
    //语法检查
    jshint: {
      options: {
        "curly": true,
        "eqnull": true,
        "eqeqeq": true,
        // "undef": true,
        "esversion": 6,
        "globals": {
          "jQuery": true
        }
      },
      all: ['Gruntfile.js','src/js/*.js']  //检查的所有文件
    },
    //js合并
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['build/js/module1.js', 'build/js/module2.js'],
        dest: 'build/js/built.js',
      },
    },
    //js压缩
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          'dist/js/dist.min.js': ['build/js/built.js']
        }
      }
    },
    //less转css
    less: {    //将less文件编译成css文件，将编译后的文件合并成一个文件
      production: {
        options: {
          paths: ['build/css'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
          ]
        },
        files: {
          'build/css/built.css': 'src/less/*.less'
        }
      }
    },
    //压缩css
    cssmin: {
      options: {
        mergeIntoShorthands: false,   //禁止合并css属性
        roundingPrecision: false     //不去四舍五入
      },
      target: {
        files: {
          'dist/css/dist.min.css': ['build/css/built.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,  //移除注释
          collapseWhitespace: true   //去除多余空格
        },
        files: {
          'build/index.min.html': 'src/index.html'
        }
      }
    },
    watch: {
      less: {
        files: ['src/less/*.less'],
        tasks: ['less', 'cssmin'],
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false,   //加快任务速度
        },
      }
    }
    
  });
  //2. 加载插件任务
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  //3. 注册构建任务
  grunt.registerTask('default', ['jshint', 'babel', 'concat', 'uglify', 'less', 'cssmin', 'htmlmin']);
  grunt.registerTask('myWatch', ['default','watch']);
};