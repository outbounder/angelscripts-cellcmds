# shellreactor cell commands

Collection of default commands for remote cell/process management.

The commands implementation is having the following requirements:

* ssh
* nvm installed
* git available for execution
* [organic-angel](http://github.com/outbounder/organic-angel) included as dependency for target
* unix based OS

## configuration source `/dna/cell.json`

All of the commands are using the generic data structure loaded by `cell` command per `name`:

    "name": {
      "remote": "user@server",
      "cwd": "~/demo",
      "target": "app.js",
      "source": "https://github.com/...",
      "branch": "v0.2",
      "nvmSource": ". ~/.nvm/nvm.sh",
      "nodeVersion": "nvm use "+process.version()
    }

## plain usage

    var plasma = new Plasma()
    require("organic-shellreactor")(plasma,{reactOn: "execute"})
    require("organic-shellreactor-cellcmds")(plasma)

    plasma.emit({
      type: "execute",
      value: ("cell staging install start upgrade").split(" ")
    }, function(){
      // do something after `staging` cell got 1. installed 2. started 3. upgraded successfully
    })

## usage via DNA

    // dna.json
    "plasma": {
      "shellreactor": {
        "source": "node_modules/organic-shellreactor",
        "reactOn": "execute"
      },
      "shellreactor-cmds": {
        "source": "node_modules/organic-shellreactor-cellcmds"
      }
    }

    // app.js
    plasma.emit({type: "execute", value:["cell","staging","upgrade"]}, doneHandler)

## partial usage of some of the commands via DNA

    // dna.json
    "plasma": {
      "shellreactor": {
        "source": "node_modules/organic-shellreactor",
        "reactOn": "execute"
      },
      "shellreactor-cmds": {
        "source": "node_modules/organic-shellreactor-cellcmds",
        "exclude": ["upgrade"]
      },
      "custom-upgrade-cmd": {
        "source": "scripts/custom-upgrade-cmd"
      }
    }

    // app.js
    plasma.emit({type: "execute", value:["cell","staging","stop","upgrade","start"]}, doneHandler)

## using commands for non-organic nodejs applications

1. create file `dna/cell.json` in root of your project with contents like:

        {
          "myapp": {
            "remote": "user@server",
            "cwd": "~/demo",
            "target": "app.js",
            "source": "https://github.com/...",
            "branch": "master",
            "nvmSource": ". ~/.nvm/nvm.sh",
            "nodeVersion": "nvm use "+process.version()
          },
          ....
        }

2. include in package.json

        {
          "devDependencies": {
            "organic": "0.1.1",
            "organic-shellreactor": "0.0.1",
            "organic-shellreactor-cellcmds": "0.0.1",
            "organic-angel": "0.2.0"
          }
        }

3. create file for triggering specific commands, for example `release.js` with contents like:

        // release.js
        var Plasma = require("organic").Plasma
        require("organic-shellreactor")(plasma, {reactOn: "execute"})
        require("organic-shellreactor-cellcmds")(plasma)
        var plasma = new Plasma()
        plasma.emit({
          type: "execute",
          value: "cell myapp upgrade"
        })

4. execute the script

        node ./release.js


## using without `organic-shellreactor`

repeat steps 1 and 2 from above and then create a script, for example `release.js` with contents like:

    // release.js
    var exec = require("child_process").exec
    var cell = require("organic-shellreactor-cellcmds/default/cell")
    var upgrade = require("organic-shellreactor-cellcmds/default/upgrade")
    cell({
      commands: [],
      value: ["myapp"]
    }, function(c){
      upgrade(c, function(){
        if(c.commandsWrapper)
          exec(c.commandWrapper+" '"+c.commands.join(" && ")+"'")
        else
          exec(c.commands.join(" && "))
      })
    })

## WHY?

This package of commands is just a quick and dirty common tasks needed to manage a given nodejs application on remote server. Usually one can achieve the same result with simple bash script,
however having the idea of central location of metadata used for commands generation makes them re-usable across projects.

Or in simple words - I just need them and wanted to share in case somebody else has to deal with similar stuff.

### why not gruntjs plugin

Simplicity.

# For more information about the concepts see

* [node-organic](http://github.com/varnalab/node-organic/docs/),
* [organic-tissue](http://github.com/outbounder/organic-tissue),
* [organic-shellreactor](http://github.com/outbounder/organic-shellreactor) and
* [organic-angel](http://github.com/outbounder/organic-angel)
