module.exports = function (grunt) {
    grunt.initConfig({
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: "server.js",
                    node_env: undefined,
                    debug: true
                }
            }
        },
        watch: {
            dev: {
                files: ["./server/**/*"],
                tasks: ["express:dev"],
                options: {
                    //Without this option specified express won't be reloaded
                    nospawn: true,
                    atBegin: true
                }
            }

        },
        "node-inspector": {
            dev: {
                options: {
                    "web-port": 8082,
                    "no-preload": true
                }
            }
        },
        parallel: {
            dev: {
                options: {
                    stream: true
                },
                tasks: [{
                        grunt: true,
                        args: ["watch:dev"]
                    }, {
                        grunt: true,
                        args: ["node-inspector:dev"]
                    }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-env");
    grunt.loadNpmTasks("grunt-node-inspector");
    grunt.loadNpmTasks("grunt-parallel");

    grunt.registerTask("dev", "launch webserver in dev mode and watch task",
    ["parallel:dev"]);

};