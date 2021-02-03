// Named Export - Have as many as needed.
// Default Export - Has no name. Only have one.

const message = "Some message from myModule.js";

const name = "Nick";

const location = "Phoenix";

const getGreeting = (name) => {
  return `Welcome to the course ${name}`;
};

export { message, name, getGreeting, location as default };
