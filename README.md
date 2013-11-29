# angelscripts cellcmds

## cell
Treat any application as cell and provide support for 
its process management locally or remote.

### configuration.json

    {
      "remote": String // optional
      "cwd": String,
      "source": String,
      "branch": String,
      "nvmPath": String,
      "nodeVersion": "v0.x.x",
      "start": String,
      "stop": String,
      "restart": String,
      "status": String
    }

### actions

* All actions are executed on `remote` via `ssh` when it is present, otherwise locally.
* `:mode` is the path to configuration.json which is loaded to seed the commands.

<br />

#### cell install

    $ angel cell install :mode
      -> mkdir -p {cwd}
      -> cd {cwd}
      -> git clone {source} ./
      -> git checkout {branch}
      -> cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production
<br />

#### cell start/stop/status/restart

    $ angel cell :mode :cmd(start|stop|status|restart)
      -> cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; {:cmd}

* `{:cmd}` has the value of configuration[start|stop|status|restart]

<br />

#### cell upgrade

    $ angel cell upgrade :mode
      -> cd {cwd}
      -> git fetch
      -> git checkout {branch}
      -> git pull {origin} {branch}
      -> cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production
      -> angel cell restart :mode
<br />

#### cell uninstall

    $ angel cell uninstall :mode
      -> rm -rf {cwd}
<br />

## pre-requirements

* git
* ssh
* nvm*
* npm*

# Thanks to

## organic-angel
https://github.com/outbounder/organic-angel

## shellreactions-exec
https://github.com/outbounder/shellreactions-exec

## reactions
https://github.com/vbogdanov/reactions

## jasmine-node
https://github.com/mhevery/jasmine-node