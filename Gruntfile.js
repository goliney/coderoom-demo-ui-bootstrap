module.exports = function(grunt) {

    grunt.initConfig({
        coderoom: {
            build: {
                src: 'demo/',
                dest: 'build/'
            }
        },
        watch: {
            scripts: {
                files: ['demo/**/*'],
                tasks: ['coderoom']
            }
        }
    });

    grunt.loadNpmTasks('grunt-coderoom');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['coderoom']);
};