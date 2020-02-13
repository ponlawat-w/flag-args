# flag-args
Command line arguments reader from specified flags, with readline prompt when value is not specified.

## 1) Arguments Reader

### Initialisation
```js
// Initialise from all function objects
const FlagArgs = require('flags-args-readline');
const args = FlagArgs.readArgs(['-f', '--file', '-t', '--target']);

// Initialise from only `readArgs` object
const { readArgs } = require('flags-args-readline');
const args = readArgs(['-f', '--file', '-t', '--target']);
```

### Methods

#### 1. `has(params: string[]|string): bool`
Return `true` if there is value of that given name.

**Examples**
```js
/* COMMAND LINE:
  node test.js --target ./data.txt -a
*/

const args = readArgs(['-t', '--target', '-a']);
args.has('-t');               // false
args.has('--target');         // true
args.has(['-t', '--target']); // true
args.has('-a');               // false
```

#### 2. `get(params: string[]|string): string`
Return value of specified argument name.

**Examples**
```js
/* COMMAND LINE:
  node test.js --source ./data.txt -t ./out.txt
*/

const args = readArgs(
  ['-s', '--source', '-t', '--target']
);
args.get(['-s', '--source']); // "./data.txt"
args.get(['-t', '--target']); // "./out.txt"
args.get('-t');               // "./out.txt"
args.get('--target');         // undefined
```

#### 3. `getOrReadline(params: string[]|string): string`
If there is value given in command line, return the value. Otherwise, show interactive line reader and read line from user's input, then return the value.

**Examples**
```js
/* COMMAND LINE:
  node test.js -s ./data.txt
*/

const args = readArgs(
  ['-s', '--source', '-t', '--target']
);

temp = args.getOrReadline(['-s', '--source'], 'Where is source file?: ');
// ↑ "./data.txt"

temp = args.getOrReadline(['-t', '--target'], 'Where is target file?: ');
// ↑ Pause program, print "Where is target file?: " and then wait for user to input a line. After user has submit, read the line and return the value.

args.has(['-t', '--target']); // false
// ↑ using `getOrReadline` will not change aruments records in `args`, the value from readline is one-time use.
```

### Accessing Values Directly

**Examples**

```js
/* COMMAND LINE:
  node test.js -t ./out.txt
*/
const args = readArgs(
  ['-t', '--target', '-s', '--source']
);
args.args['-t'];        // "./out.txt"
args.args['--target'];  // undefined
args.args['-s'];        // undefined
args.args['--source'];  // undefined
```

---

## 2) Flags Reader

### Initialisation
```js
// Initialise from all function objects
const FlagArgs = require('flags-args-readline');
const args = FlagArgs.readFlags(['-a', '--all']);

// Initialise from only `readFlags` object
const { readFlags } = require('flags-args-readline');
const args = readFlags(['-a', '--all']);
```

### Methods

#### `has(string[]|string): bool`

Return `true` if there is specified flag given from command line arguments. The logical operator, in case of array, is OR.

**Examples**
```js
/* COMMAND LINE:
  node test.js -a
*/
const flags = readFlags(['-a', '--all']);
flags.has(['-a', '--all']); // true
flags.has('-a');            // true
flags.has('--all');         // false
flags.has('-t');            // false
```

### Accessing Values Directly

**Examples**
```js
/* COMMAND LINE:
  node test.js -a -u -t
*/
const flags = readFlags(['-a', '-u', '-s']);
flags.flags; // ['-a', '-u']
```

---

## Using with `npm` command

Reminding that arguments passed from `npm` commands, such as `npm start` or `npm run`, those arguments belong to `npm`, not the node file. For this reason, to use the library with `npm`, the arguments should be passed after `--` symbol.

**Examples**

```js
const args = parseArgs(['-s', '-t']);
args.get('-s');

// From `npm run my-command -s something`     → undefined
// From `node run my-command -- -s something` → "something"
```

---
