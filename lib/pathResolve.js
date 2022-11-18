const path = require('path');

function pathResolve(inputPath) {
    if (path.isAbsolute(inputPath) === false) {
        inputPath = path.resolve(inputPath);
    }
    return inputPath;
}

module.exports = pathResolve;