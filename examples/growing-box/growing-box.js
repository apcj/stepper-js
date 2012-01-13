d3.select(window).on("load", function() {
  var block = d3.select("div");

  p5.step().animate(block).style("width", "200px");
  p5.step().animate(block).style("width", "300px");
  p5.step().animate(block).style("height", "300px");
  p5.step().animate(block).style("width", "500px");
  p5.step().animate(block).duration(2000).style("height", "500px");
});
