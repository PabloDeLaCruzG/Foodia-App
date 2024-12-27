import "dotenv/config";

export default {
  expo: {
    name: "front-foodia",
    slug: "front-foodia",
    version: "1.0.0",
    orientation: "portrait",
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};
