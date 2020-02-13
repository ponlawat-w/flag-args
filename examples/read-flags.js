const readFlags = require('../read-flags');

const flags = readFlags(['-a', '--all']);

if (flags.has(['-a', '--all'])) {
  console.log('All');
  // Print "All" if either -a or --all is passed
} else {
  console.log('No all');
  // Print "No all" if neither -a nor --all is passed
}
