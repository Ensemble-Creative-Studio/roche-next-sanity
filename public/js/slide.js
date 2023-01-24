// Select the main element


  var main = document.getElementById("main");
  var scrollAnimationFrame;
  var lastDelta = 0;
  var scrollAmount = 20;
  var scrollVelocity = 0;
  var timeStamp = 0;
  var ease = 0.1;
// Set the scroll speed for mouse wheel
var mouseWheelSpeed = 10;

// Set the scroll speed for trackpad
var trackpadSpeed = 200;

// Add event listener for mouse wheel scroll
main.addEventListener("wheel", (event) => {
  // Get the current scroll position
  var currentScroll = main.scrollLeft;

  // Check if the event is from a trackpad or mouse wheel
  if (event.deltaMode === 0) {
                  lastDelta = event.deltaY;
                  console.log(event.deltaY)
                  if (!scrollAnimationFrame) {
                      scrollAnimationFrame = requestAnimationFrame(() => {
                          if (main) {
                            if (event.deltaY != 150 && event.deltaY != -150 )
                            main.scrollLeft -= lastDelta;
                            if (event.deltaY == 150){
                              main.scrollTo({ left: currentScroll + event.deltaY*4, behavior: "smooth" });
                              currentScroll = currentScroll + event.deltaY
                            }
                            if (event.deltaY == -150){
                              main.scrollTo({ left: currentScroll + event.deltaY*4, behavior: "smooth" });
                              currentScroll = currentScroll + event.deltaY
                            }
                          }
                          lastDelta = 0;
                          scrollAnimationFrame = undefined;
                      });
                  }
              } else {

    if (event.deltaY > 0) {
    
      main.scrollTo({ left: currentScroll + event.deltaY*100, behavior: "smooth" });
    } else {
      // Scroll left
      main.scrollTo({ left: currentScroll + event.deltaY*100, behavior: "smooth" });
    }
  }
//   else if (event.deltaY < -50) {
//     main.scrollTo({ left: currentScroll - (event.deltaY / 2), behavior: "smooth" });
//   }
});


