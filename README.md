# shellreactor cell commands

Collection of default commands for remote cell/process management.

## configuration source `/dna/cell.json`

All of the commands are using the generic data structure loaded by `cell` command per `name`, shown bellow with computed defaults:

    "name": {
      "commandsWrapper": "ssh user@server",
      "cwd": "~/demo",
      "main": "app.js",
      "source": "https://github.com/...",
      "branch": "staging",
      "useNode": ". ~/.nvm/nvm.sh; nvm use v1.0.0",
      "native": true,
      "startCmd": "node node_modules/organic-angel/bin/angel.js -action start -target app.js -native true",
      "stopCmd": "node node_modules/organic-angel/bin/angel.js -action stop -target app.js -native true",
      "restartCmd": "node node_modules/organic-angel/bin/angel.js -action restart -target app.js -native true",
      "statusCmd": "node node_modules/organic-angel/bin/angel.js -action status -target app.js -native true",
    }

Notes:

* `useNode: ""` disables `nvm` source
* `startCmd`, `stopCmd`, `restartCmd`, `statusCmd` are optional, if not set will be computed using `organic-angel` taking into account `main` and `native` properties
* `native` flag is active when using organic-angel to switch spawning of non-organic nodejs applications. see [organic-tissue](http://github.com/outbounder/organic-tissue/) 

## using

1. create file `dna/cell.json` in root of your project with contents like:

        {
          "myapp": {
            "commandsWrapper": "ssh user@server",
            "cwd": "~/demo",
            "main": "app.js",
            "source": "https://github.com/...",
            "branch": "master",
            "useNode": ". ~/.nvm/nvm.sh; nvm use v1.0.0"
          },
          ....
        }

2. include in package.json

        {
          "devDependencies": {
            "organic-shellreactor-cellcmds": "0.0.1",
            "organic-angel": "0.2.0"
          }
        }

3. create file for execution

        // release.js
        var exec = require("child_process").exec
        var cell = require("organic-shellreactor-cellcmds/default/cell")
        var upgrade = require("organic-shellreactor-cellcmds/default/upgrade")
        cell({ commands: [], value: ["myapp"] }, function(c){
          upgrade(c, function(c){
            if(c.commandsWrapper)
              exec(c.commandWrapper+" '"+c.commands.join(" && ")+"'")
            else
              exec(c.commands.join(" && "))
          })
        })

# For more information about the concepts see

* [node-organic](http://github.com/varnalab/node-organic/docs/),
* [organic-tissue](http://github.com/outbounder/organic-tissue),
* [organic-shellreactor](http://github.com/outbounder/organic-shellreactor)
* [organic-angel](http://github.com/outbounder/organic-angel)
