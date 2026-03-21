import "@testing-library/jest-dom";

// jsdom doesn't implement scrollTo — stub it for all tests
Element.prototype.scrollTo = () => {};
