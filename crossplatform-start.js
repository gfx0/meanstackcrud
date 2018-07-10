var exec = require('child_process').exec;
var os = require('os');
function logError(error, stdout, stderr) { console.log(''+error); }
var osType = os.type();
console.log('Detecting platform automatically...');
if (osType === 'Linux' || osType == 'Darwin') {
    console.log('' + (osType === 'Linux') ? 'Linux detected.' : 'MacOS detected.' );
    exec("sudo node index.js", logError);
} else if (osType === 'Windows_NT') {
    console.log('Windows detected.');
    exec("node index.js", logError);
} else {
    console.log('Failed to detect operating system...')
    throw new Error('Unsupported OS found: ' + osType);
}