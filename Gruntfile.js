module.exports = function (grunt) {
    grunt.initConfig({

        less: {
            dev: {
                options: {
                },
                files: {
                    "css/style.css": "less/style.less"
                }
            }
        },
        watch: {
            css: {
                files: ['less/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    livereload: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

	
	grunt.registerTask('default', ['watch']);
};