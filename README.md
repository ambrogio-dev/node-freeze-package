# Freeze Package

Freeze dependencies in package.json - for deploy stability reason

[![NPM Version](http://img.shields.io/npm/v/freeze-package.svg?style=flat)](https://www.npmjs.org/package/freeze-package)
[![NPM Downloads](https://img.shields.io/npm/dm/freeze-package.svg?style=flat)](https://www.npmjs.org/package/freeze-package)

[![JS Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm-dl/freeze-package.png)](https://nodei.co/npm/freeze-package/)

### Install

````bash
npm install -g freeze-package
````

### Usage

#### 1. Freeze

Freeze current packages rewriting package.json with fixed dependencies versions (then deploy it and simply run *"npm install"* or *"npm upgrade"*)

````bash
cd /my-node-project/
freeze-package freeze
````

If **package.src.json** not exists, will be created from current **package.json**, as source for further upgrade; **package.src.json** will be never overridden, so manage it manually: if you run *"freeze-package freeze"* twice, you will loose **package.src.json** content.

#### 2. Upgrade

````bash
cd /my-node-project/
freeze-package upgrade
````

Exec *"npm upgrade"* from **package.src.json** and freeze packages versions, so **package.json** will be implicitly upgraded from current dependencies versions.

#### Example - Freeze

From starting **package.json**
````json
...
"dependencies": {
  "express": "4.x",
  "fs-extra": "x",
  "commander": "x"
},
...
````

Then run
````bash
freeze-package freeze
````
**package.json** will be
````json
"dependencies": {
  "express": "4.13.4",
  "fs-extra": "0.26.5",
  "commander": "2.9.0"
},
````
and will be created **package.src.json** as
````json
"dependencies": {
  "express": "4.x",
  "fs-extra": "x",
  "commander": "x"
},
````

#### Example - Upgrade
From previous scenario, supposing fs-extra was upgraded in npm repo to newer version, running
````bash
freeze-package upgrade
````
will upgrade **package.json** as
````json
"dependencies": {
  "express": "4.13.4",
  "fs-extra": "0.26.6",
  "commander": "2.9.0"
},
````
**package.src.json** will not be touched
````json
"dependencies": {
  "express": "4.x",
  "fs-extra": "x",
  "commander": "x"
},
````

## License

The MIT License (MIT)

Copyright (c) 2016 Ambrogio srl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
