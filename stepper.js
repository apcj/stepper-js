stepper = {};

stepper.position = -1;
stepper.steps = [];

stepper.previous = function() {
  if (stepper.position >= 0) {
    stepper.steps[stepper.position].back();
    stepper.position--;
  }
}

stepper.next = function() {
  if (stepper.position < stepper.steps.length - 1) {
    stepper.position++;
    stepper.steps[stepper.position].forward();
  }
}

stepper.step = function() {
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
  
  stepper.steps.push(step);
  return step;
}

d3.select(window).on("keydown", function() {
  switch (d3.event.keyCode) {
    case 39: // right arrow
    case 32: // space
    case 34: { // page down
      stepper.next();
      break;
    }
    case 37: // left arrow
    case 33: { // page up
      stepper.previous();
      break;
    }
    default: return;
  }
  d3.event.preventDefault();
});
