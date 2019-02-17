module.exports = function(grunt) {
  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserSync: {
            bsFiles: {
                src: ['dist/css/*.css', '*.html' ]
                
            },
            
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },
        
        sass: {
            dist: {
                files:{
                    'dist/css/sass_style.css' : 'sass/sass_style.scss'
                  /*  i usualy use a _partials system with my sass so insted off watching the sass_style.scss, I tell grunt to watch every .scss file in the_partials folder, and then if there is change there, update the sass_style.scss file (the file with all the imports)*/
                }
            }
        },
        less: {
            dist: {
                files: {
                    'dist/css/less_style.css' : 'less/less_style.less'
                }
            }
        },
        watch: {
            css: {
                files: ['less/less_style.less', 'sass/_partials/*.scss'],
                tasks: ['less', 'sass']
            }
        },
        
        imagemin: {
            
            dynamic: {
                options:{
                    optimizationLevel: 3,
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/resized_images/'
                    /*im having some problems actualy optimizing the pictures, i do manage to get some optimization but just 3-4%, please give me some guidelines on how and why my current code do not work properly. 
                    */
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['browserSync', 'imagemin', 'watch']);
}