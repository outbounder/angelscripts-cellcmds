# angelscripts cellcmds v1.2.0

Angel Scripts for local or remote simple cells management

## usage

```
$ angel cell {command} {cellPath}
```

### 1. create `myproject/dna/_production/cell.json`

    {
      "name": "myproject",
      "remote": "ssh user@remoteAddr",
      "sourceNode": ". ~/.nvm/nvm.sh && nvm use v0.10.24",
      "cwd": "~/app",
      "main": "index.js",
      "source": "git url",
      "branch": "master",
      "origin": "origin",
      "start": "&{sourceNode} && cd &{cwd} && ...",
      "stop": "&{sourceNode} && cd &{cwd} && ...",
      "restart": "&{sourceNode} && cd &{cwd} && ...",
      "status": "&{sourceNode} && cd &{cwd} && ...",
      "build": "&{sourceNode} && cd &{cwd} && ...",
      "install": "mkdir -p &{cwd} && cd &{cwd} && git clone &{source} . && &{sourceNode} && npm install",
      "upgrade": "git fetch &{origin} && git checkout &{branch} && git pull &{origin} &{branch} && npm install --production && &{build} && &{stop} && &{start}",
      "upgrade-without-build": "git fetch &{origin} && git checkout &{branch} && git pull &{origin} &{branch} && npm install --production && &{stop} && &{start}"
      "uninstall": "rm -rf &{cwd}"
    }

#### `remote` property

Once present all commands will be executed using the following pattern: `{remote} '{command}'`

#### placeholders

cellcmds internally loads cell.json parsed as part of a single DNA inmemory structure using [organic-dna-loader](https://github.com/outbounder/organic-dna-loader) -> [organic-dna-resolve](https://github.com/camplight/organic-dna-resolve)

Therefore one can use organic-dna-resolve's features. For example:

* reference a property from the current (container) branch

  ```
  // cell.json
  {
    "variable1": "value1"
    "command1": "echo &{variable1}"
  }
  ```

* in place reference a value from another dna branch

  ```
  // dna/secrets.json
  {
    "variable1": "a secret"
  }

  // dna/_production/cell.json
  {
    "command1": "echo @{secrets.variable1}"
  }
  ```

#### `start`, `stop`, ... commands

`cell.json` file contain both common variables and common commands.
Commands can be invoked from command line using `angel cell {command} {cellPath}` pattern.

Commands can be array of strings which will be concatenated via `&&` for example:

```
// cell.json
{
  "variable1": "value1"
  "variable2": "value2"
  "command1": [
    "sub-command1 &{variable1}",
    "sub-command2 &{variable2}"
  ]
}
```

#### `cellPath` cli argument

It is a special argument which can be either:

* relative file path to cell.json, ie `./dna/_production/cell.json`
* relative dna path to cell's dna, ie `_production.cell`

### 2. include scripts and use `cell.json` commands

```
$ cd myproject
$ npm install organic-angel --save
$ npm install angelscripts-cellcmds --save

// provide ./dna/_prodction/cell.json content & execute commands

$ node ./node_modules/.bin/angel cell install ./dna/_production/cell.json
$ node ./node_modules/.bin/angel cell start ./dna/_production/cell.json
$ node ./node_modules/.bin/angel cell upgrade ./dna/_production/cell.json
```

### 3. production

#### use `forever` or `pm2` instead of `angelscripts-nodeapps` for production cells

* Install `forever` or `pm2` on remote hosts *

#### `cell.json` with [forever](https://github.com/nodejitsu/forever)

    {
      ...
      "start": "forever --sourceDir &{cwd} -a -l &{cwd}/&{main}.out --minUptime 5000 --spinSleepTime 2000 start &{main}",
      "stop": "forever stop &{main}",
      "restart": "forever restart &{main}",
      ...
    }

#### `cell.json` with [pm2](https://github.com/Unitech/pm2)

    {
      ...
      "start": "pm2 start &{main} --name &{name}",
      "stop": "pm2 stop &{name}",
      "restart": "pm2 restart &{name}"
      ...
    }
