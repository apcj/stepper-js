p5 = {};

p5.position = -1;
p5.steps = [];

p5.previous = function() {
  if (p5.position >= 0) {
    p5.steps[p5.position].back();
    p5.position--;
  }
}

p5.next = function() {
  if (p5.position < p5.steps.length - 1) {
    p5.position++;
    p5.steps[p5.position].forward();
  }
}

p5.step = function() {
  var step = {
    forward: function() {},
    back: function() {}
  };
  
  step.animate = function(selection) {
    var duration = 500;
    step.duration = function(overrideDuration) {
      duration = overrideDuration;
      return step;
    }
    
    step.style = function(key, value) {
      step.forward = function() {
        var previousValue = selection.style(key);
        selection.transition().duration(duration).style(key, value);

        step.back = function() {
          selection.style(key, previousValue);
        }
      }
      return this;
    }
    return this;
  };
  
  p5.steps.push(step);
  return step;
}

d3.select(window).on("load", function() {
  var block = d3.select("div");

  p5.step().animate(block).style("width", "200px");
  p5.step().animate(block).style("width", "300px");
  p5.step().animate(block).style("height", "300px");
  p5.step().animate(block).style("width", "500px");
  p5.step().animate(block).duration(2000).style("height", "500px");
});


// p5.step().animate(table).style("top", (h - table.node().clientHeight) + "px");
// p5.step().animate(table).style("top", "0px");
// p5.step().animate(table).style("top", "30px")
//   .together().animate(table.select(".headers")).style("top", "30px");
// 
// window.animationNext = function() {
//   table.transition().duration(2000).style("top", (h - table.node().clientHeight) + "px");
//   window.animationNext = function() {
//     table.transition().duration(1000).style("top", "0px");
//     window.animationNext = function() {
//       table.transition().duration(1000).style("top", "30px");
//       table.select(".headers").transition().duration(1000).style("opacity", 1);
//       window.animationNext = null;
//     };
//   };
// }

d3.select(window).on("keydown", function() {
  switch (d3.event.keyCode) {
    case 39: // right arrow
    case 32: // space
    case 34: { // page down
      p5.next();
      break;
    }
    case 37: // left arrow
    case 33: { // page up
      p5.previous();
      break;
    }
    default: return;
  }
  d3.event.preventDefault();
});
