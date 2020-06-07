module.exports = {
  all: async (req, res, next) => {
    console.log("Hello products");
  },
  get: async (req, res, next) => {
    console.log("Hello signup");
  },
  create: async (req, res, next) => {
    console.log("Hello secret");
  },
  update: async (req, res, next) => {
    console.log("Hello secret");
  },
  delete: async (req, res, next) => {
    console.log("Hello secret");
  },
};
