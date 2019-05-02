$(document).ready(function() {
  "use strict";
  $(".hexFront, .hexBack").click(function() {
    $(".hexFront")
      .css({ transform: "rotateY(0deg)", opacity: 1 })
      .next()
      .css({ transform: "rotateY(180deg)", opacity: 0 })
    
    $(this)
      .css({ transform: "rotateY(180deg)", opacity: 0 })
      .next()
      .css({ transform: "rotateY(0deg)", opacity: 1 })
      .end().prev()
      .css({ transform: "rotateY(0deg)", opacity: 1 });
  });
});
