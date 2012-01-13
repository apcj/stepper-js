d3.select(window).on("load", function() {
  
  var table = d3.select(".feature");
  
  for (var i = 1; i <= 5; i++) {
    p5.step().animate(table.selectAll(".appear" + i)).duration(300).style("opacity", 1);
  }
});