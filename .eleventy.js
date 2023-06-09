module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy({ "src/_root/*.*": "./" });
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/papers");
    eleventyConfig.addPassthroughCopy("src/program.js");
    eleventyConfig.addPassthroughCopy("src/program.csv");
    eleventyConfig.addPassthroughCopy("node_modules/d3-dsv/dist/d3-dsv.min.js");
    eleventyConfig.addPassthroughCopy("src/archive");
    eleventyConfig.addPassthroughCopy("src/submissions");

    eleventyConfig.setDataDeepMerge(true);


    return {
      dir: {
        input: "./src",
        output: "./dist",
        includes: "_includes"
        }
    };
}