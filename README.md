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

    $ angel cell :mode install
      -> mkdir -p {cwd}
      -> cd {cwd}
      -> git clone {source} ./
      -> git checkout {branch}
      -> cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production
<br />

    $ angel cell :mode :cmd(start|stop|status|restart)
      -> cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; {:cmd}

* `:cmd` is the property from configuration.json

<br />

    $ angel cell :mode upgrade
      -> cd {cwd}
      -> git fetch
      -> git checkout {branch}
      -> git pull {origin} {branch}
      -> cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production
      -> angel cell :mode restart
<br />


    $ angel cell :mode uninstall
      -> rm -rf {cwd}
<br />

## pre-requirements

* git
* ssh
* nvm*
* npm*