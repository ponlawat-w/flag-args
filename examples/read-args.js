const readArgs = require('../read-args');

const args = readArgs(['-t', '--test', '-a']);

if (args.has(['-t', '--test'])) {
  console.log(`t = ${args.get(['-t', ['--test']])}`);
  // should print "t = {VALUE}", if there is any value passed after -t argument
  // e.g.
  // COMMAND ARGUMENTS: -t 8
  // OUTPUT: t = 8
  // COMMAND ARGUMENTS: --test hello
  // OUTPUT: t = hello
} else {
  console.log('no t passed');
  // Should print "no t passed" if there is no -t given in argument
}

const a = args.getOrReadline('-a', 'What is a? ');
// if there is no argument -a given in command, should ask for it with readline
console.log(`a = ${a}`);
// print "a = {VALUE}"
