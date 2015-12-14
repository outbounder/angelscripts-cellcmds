# angelscripts cellcmds v0.2.2

Angel Scripts for local or remote cell process management

## usage

### 1. create `myproject/cell.json`

    {
      "name": "myproject",
      "remote": "ssh user@remoteAddr",
      "sourceNode": ". ~/.nvm/nvm.sh ; nvm use v0.10.24",
      "cwd": "~/app",
      "main": "index.js",
      "source": "git url",
      "branch": "master",
      "origin": "origin",
      "start": "{sourceNode}; cd {cwd}; node ./node_modules/.bin/angel app start app.js",
      "stop": "{sourceNode}; cd {cwd}; node ./node_modules/.bin/angel app stop app.js",
      "restart": "{sourceNode}; cd {cwd}; node ./node_modules/.bin/angel app restart app.js",
      "status": "{sourceNode}; cd {cwd}; node ./node_modules/.bin/angel app status app.js",
      "build": "{sourceNode}; cd {cwd}; node ./scripts/build.js",
      "install": "mkdir -p {cwd} ; cd {cwd} ; git clone {source} . ; {sourceNode} ; npm install",
      "upgrade": "git fetch {origin} ; git checkout {branch} ; git pull {origin} {branch} ; npm install --production ; {build} ; {stop} && {start}",
      "upgrade-without-build": "git fetch {origin} ; git checkout {branch} ; git pull {origin} {branch} ; npm install --production ; {stop} && {start}"
      "uninstall": "rm -rf {cwd}"
    }

#### `remote` property

Once present all commands will be executed using the following pattern: `{remote} '{command}'`

#### `{placeholders}`

Every placeholder is replaced with its corresponding value from the same json object. This is useful when different commands need to contain same instructions or to refer to the same values.

#### `start`, `stop`, ... commands

`cell.json` file contain both common variables and common commands. Commands can be invoked from command line using `angel cell {command}` pattern. In the example `cell.json` cell management responsibility is deffered via commands to [angelscripts-nodeapps](https://github.com/outbounder/angelscripts-nodeapps) using [organic-angel](https://github.com/outbounder/organic-angel) as script/task runner.

### 2. include scripts and use `cell.json` commands

    $ cd myproject
    $ npm install organic-angel --save
    $ npm install angelscripts-cellcmds --save

    # provide ./cell.json data & commands

    $ node ./node_modules/.bin/angel cell install ./cell.json
    $ node ./node_modules/.bin/angel cell start ./cell.json
    $ node ./node_modules/.bin/angel cell upgrade ./cell.json

### 3. production

#### use `forever` or `pm2` instead of `angelscripts-nodeapps` for production cells

* Install `forever` or `pm2` on remote hosts *

#### `cell.json` with [forever](https://github.com/nodejitsu/forever)

    {
      ...
      "start": "forever --sourceDir {cwd} -a -l {cwd}/{main}.out --minUptime 5000 --spinSleepTime 2000 start {main}",
      "stop": "forever stop {main}",
      "restart": "forever restart {main}",
      ...
    }

#### `cell.json` with [pm2](https://github.com/Unitech/pm2)

    {
      ...
      "start": "pm2 start {main} --name {name}",
      "stop": "pm2 stop {name}",
      "restart": "pm2 restart {name}"
      ...
    }
