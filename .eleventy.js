module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy({ "src/_root/*.*": "./" });
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/archive");

    eleventyConfig.setDataDeepMerge(true);


    return {
      dir: {
        input: "./src",
        output: "./dist",
        includes: "_includes"
        }
    };
}