/**
 * Created by davidoregan on 02/09/2014.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '\n/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> by David ORegan\n' +
            '' +
            ' * Copyright <%= grunt.template.today("yyyy") %> Osedea\n' +
            '' +
            ' */\n',

        concat: {
            'osedea': {
                src: [
                    'js/jquery.js',
                    'js/bootstrap.js',
                    'js/osedea.js',
                    'js/jquery.cookie',
                    'js/jquery-lang'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        cssmin: {
            'oregand.github.io': {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
                }
            }
        },
        clean: {
            js: ["dist/*.js", "!dist/*.min.js"]
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            'oregand.github.io': {
                src: ['dist/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            js: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['concat', 'uglify', 'watch', 'clean']);
};