// logging-middleware/validator.js

const { VALID_STACKS, VALID_LEVELS, VALID_PACKAGES } = require('./constants');

function validateLogInput(stack, level, pkg, message) {
  if (!VALID_STACKS.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }

  if (!VALID_LEVELS.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }

  const validPkgs = VALID_PACKAGES[stack];
  if (!validPkgs.includes(pkg)) {
    throw new Error(`Invalid package: ${pkg} for stack: ${stack}`);
  }

  if (!message || typeof message !== 'string') {
    throw new Error(`Invalid message: must be a non-empty string`);
  }
}

module.exports = validateLogInput;
