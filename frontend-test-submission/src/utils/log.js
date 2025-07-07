import axios from 'axios';

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post('http://20.244.55.144/evaluation-service/logs', {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message,
    });
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
};

export default log;
