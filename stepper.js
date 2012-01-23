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
    back: function() {},
    before: function() {},
    after: function() {},
    duration: 500
  };

  var publicStep = {
    _impl: step
  };
  
  publicStep.forward = function(forward) {
    step.forward = forward;
  }

  publicStep.back = function(back) {
    step.back = back;
  }

  publicStep.then = function() {
    var nextStep = stepper.step();
    step.after = function() {
      stepper.position++;
      nextStep._impl.forward();
    }
    nextStep._impl.before = function() {
      step.back();
      stepper.position--;
    };
    return nextStep;
  }
  
  publicStep.duration = function(overrideDuration) {
    duration = overrideDuration;
    return publicStep;
  }
  
  publicStep.animate = function(selection) {
    var supportPropertyChange = function(method) {
      publicStep[method] = function(key, value) {
        step.forward = function() {
          var previousValue = selection[method](key);
          selection.transition()
            .duration(duration)[method](key, value)
            .each("end", step.after);

          step.back = function() {
            selection[method](key, previousValue);
            step.before();
          }
        }
        return this;
      }
    }

    supportPropertyChange("style");
    supportPropertyChange("attr");

    return publicStep;
  };
  
  stepper.steps.push(step);
  return publicStep;
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
