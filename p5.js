p5 = {};

p5.position = 0;
p5.states = [1, 2, 3, 4, 5];

p5.previous = function() {
  p5.position--;
  p5.currentState = p5.states[p5.position];
  p5.render(p5.currentState);
}

p5.next = function() {
  p5.position++;
  p5.currentState = p5.states[p5.position];
  p5.render(p5.currentState);
}

p5.render = function(state) {
  items = [];
  for (var i = 0; i < state; i++) {
    items.push({});
  }
  var items = d3.select("body").selectAll("li").data(items);
  items.enter().append("li").text("Hello");
  items.exit().remove();
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
