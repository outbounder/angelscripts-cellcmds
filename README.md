# shellreactor cell commands

Collection of default commands for remote cell/process management.

## configuration source `/dna/cell.json`

All of the commands are using the generic data structure loaded by `cell` command per `name`, shown bellow with computed defaults:

    "name": {
      "cwd": "~/myapp",
      "target": "app.js",
      "source": "git://",
      "branch": "master",
      "nodeSource": "source ~/.nvm/nvm.sh; nvm use v0.11.0",
      "nodeVersion": "v0.11.0",
      "remote": "user@server",
      "start": "",
      "restart": "",
      "stop": "",
      "status": ""
    }

Notes:

* `nodeSource: ""` disables `nvm` source

## Available commands

### `cell [name] (start|stop|restart|status)`

does the action by cell name on the remote

### `cell [name] install`

executes install instructions by cell name on the remote

### `cell [name] upgrade`

executes upgrade instructions by cell name on the remote

## pre-requirements

* git
* ssh
* nvm*
* npm*
* organic-angel*