#!/usr/bin/env node
/*
Run nodeunit tests
Simple node.js script to find all *.test.js files and execute them through nodeunit.
Without arguments, will search recursively through the current directory for tests.
Supply arguments of directories or specific tests to run.
 
Sample Usage:
 
$ ./runtests.js
# will run all tests found in the current directory and any directories below the current.
 
$ ./runtests.js foobar.test.js
# will run foobar.test.js only
 
$ ./runtests.js my_directory
# will find all tests below my_directory and run them
 
$ ./runtests.js foobar.test.js my_directory
# will run both foobar.test.js and all tests below my_directory
 
*/
 
//require.paths.unshift('./vendor/nodeunit/lib');
 
var fs = require('fs'),
    sys = require('sys'),
    args = process.argv,
    foundTests = [],
    start = new Date(),
    end, tests = [], i;
    
global.testing = true;

try {
    var testrunner = require('nodeunit').testrunner;
} catch(e) {
    sys.puts("\033[31m" + 'Cannot find nodeunit module.' + "\033[39m");
    sys.puts('You can download submodules for this project by doing:');
    sys.puts('');
    sys.puts('    git submodule init');
    sys.puts('    git submodule update');
    sys.puts('');
    process.exit();
}
 
function readDirectory(files, directory) {
    var index = directory.indexOf("node_modules") ;
    if(index != -1)
    {
        return [];
    }
    var i = files.length,
        file;
 
    while (i--) {
        if (files[i].lastIndexOf('.') !== 0) {
            file = directory + '/' + files[i];
            if (fs.statSync(file).isDirectory()) {
                foundTests.concat(readDirectory(fs.readdirSync(file), file));
            } else if (/\.test\.js$/.test(file)) {
                foundTests.push(file);
            }
        }
    }
    return foundTests;
}
 
if (args.length > 2) {
    args.shift();
    args.shift();
 
    for (i = 0; i < args.length; i++) {
        if (fs.statSync(args[i]).isDirectory()) {
            foundTests = readDirectory(fs.readdirSync(args[i]), args[i]);
            if (tests.length) {
                tests.concat(foundTests);
            } else {
                tests = foundTests;
            }
        } else if (fs.statSync(args[i]).isFile() && /\.test\.js$/.test(args[i])){
            tests.push(args[i]);
        }
    }
} else {
    tests = readDirectory(fs.readdirSync(__dirname), '.');
}
end = new Date();
 
sys.puts("\033[1m" + 'Found ' + tests.length + ' Tests in ' + (end - start) + 'ms' + "\033[22m");
for (i = 0; i < tests.length; i++) {
    sys.puts('    ➞ ' + tests[i]);
}
 
testrunner.run(tests);