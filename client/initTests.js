
// Polyfill rAF for the tests so that react doesn't complain
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });