#!/usr/bin/env node
'use strict'

var childProcess = require('child_process')
var fs = require('fs-extra')
var args = require('commander')

args
  .version('0.1.0')
  .option('freeze', 'freeze curret packages versions')
  .option('upgrade', 'exec "npm upgrade" and freeze packages versions')
  .parse(process.argv)

// missing arguments
if (!args.freeze && !args.upgrade) {
  args.help()
  process.exit(-1)
}

var _freeze = function () {
  childProcess.exec('npm list -production -depth=0 -json', function (err, stdout, stderr) {
    if (err) {
      console.error('error npm list', err)
      process.exit(-1)
    }
    var _copy = function () {
      fs.readFile('./package.json', 'utf8', function (err, data) {
        if (err) {
          console.error('error reading package.json', err)
          process.exit(-1)
        }
        var _package = JSON.parse(data)
        _package.dependencies = _packs.dependencies
        fs.writeFile('./package.json', JSON.stringify(_package, null, '  '), function (err) {
          if (err) {
            console.error('error write package.json', err)
            process.exit(-1)
          }
          console.log('wrote frozen package.json')
        })
      })
    }

    var _packs = JSON.parse(stdout)
    for (let pack in _packs.dependencies) {
      _packs.dependencies[pack] = _packs.dependencies[pack].version
    }
    // backup current package.json in package.src.json
    fs.stat('./package.src.json', function (err, stats) {
      if (err) {
        console.error('package.src.json does not exists')
      }
      if (!stats || !stats.isFile()) {
        console.log('missing package.src.json, will be copied from package.json')
        fs.copy('./package.json', './package.src.json', function (err) {
          if (err) {
            console.error('error copy orig package.json into package.src.json', err)
            process.exit(-1)
          }
          console.log('copied package.json => package.src.json')
          _copy()
        })
      } else {
        _copy()
      }
    })
  })
}

var _upgrade = function (callback) {
  fs.copy('./package.src.json', './package.json', function (err) {
    if (err) {
      console.error('error copy orig package.json', err)
      process.exit(-1)
    }
    console.log('copied package.src.json => package.json')

    childProcess.exec('npm upgrade', function (err, stdout, stderr) {
      if (err) {
        console.error('error npm upgrade', err)
        process.exit(-1)
      }
      callback()
    })
  })
}

if (args.freeze)
  _freeze()
else if (args.upgrade)
  _upgrade(_freeze)
