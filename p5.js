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
    
    var supportPropertyChange = function(method) {
      step[method] = function(key, value) {
        step.forward = function() {
          var previousValue = selection[method](key);
          selection.transition().duration(duration)[method](key, value);

          step.back = function() {
            selection[method](key, previousValue);
          }
        }
        return this;
      }
    }

    supportPropertyChange("style");
    supportPropertyChange("attr");

    return this;
  };
  
  p5.steps.push(step);
  return step;
}

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
