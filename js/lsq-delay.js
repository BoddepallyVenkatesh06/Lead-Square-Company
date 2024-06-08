const autoLoadDuration = 10; //In Seconds
const eventList = ["mouseover","mousemove","mousedown","mouseup","click","keydown","wheel", "touchmove", "touchstart", "touchend"];
const autoLoadTimeout = setTimeout(runScripts, autoLoadDuration * 1000);
const autoLoadTimeoutStyle = setTimeout(runStyle, autoLoadDuration * 1000);

eventList.forEach(function(event) {
    window.addEventListener(event, triggerScripts, { passive: true })
});

function triggerScripts() {
    runScripts();
    runStyle()
    clearTimeout(autoLoadTimeout);
    eventList.forEach(function(event) {
         window.removeEventListener(event, triggerScripts, { passive: true });
    });
}

function runScripts() {
      document.querySelectorAll("script[delay-scripts]").forEach(function(scriptTag) {
      scriptTag.setAttribute("src", scriptTag.getAttribute("delay-scripts"));
    });
}
function runStyle() {
      document.querySelectorAll("link[delay-style]").forEach(function(scriptTag) {
      scriptTag.setAttribute("href", scriptTag.getAttribute("delay-style"));
    });
}