module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ["Android >= 4.0", "iOS >= 7"],
    // },
    "postcss-pxtorem": {
      // rootValue({ file }) {
      //   return file.indexOf("vant") !== -1 ? 37.5 : 75;
      // },
      rootValue: 37.5,
      propList: ["*"],
    },
  },
};
