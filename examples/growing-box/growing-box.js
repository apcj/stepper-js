d3.select(window).on("load", function() {
  var block = d3.select("div");

  stepper.step().animate(block).style("width", "200px");
  stepper.step().animate(block).style("width", "300px");
  stepper.step().animate(block).style("height", "300px");
  stepper.step().animate(block).style("width", "500px");
  stepper.step().animate(block).duration(2000).style("height", "500px");
});
