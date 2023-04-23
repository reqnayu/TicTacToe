function qs(element) {
  return document.querySelector(element);
}

function qAll(element) {
  return document.querySelectorAll(element);
}

function vis(element, boolean) {
  if (boolean !== undefined) {
    element.classList.toggle("d-none", boolean);
  } else {
    element.classList.toggle("d-none");
  }
}

function capitalize(input) {
  if (!input) return "";
  const string = input.split("-");
  let output = [];
  for (let i = 0; i < string.length; i++) {
    output.push(string[i][0].toUpperCase() + string[i].slice(1));
  }
  output = output.join(" ");
  return output;
}

const debounce = (cb, delay = 1000) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const throttle = (cb, delay = 500) => {
  let shouldWait = false;

  return (...args) => {
    if (shouldWait) return;

    cb(...args)
    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay)
  }
}

const toggleScroll = (bool) => {
  if (bool) {
    window.addEventListener("wheel", wheelTouchBlock, { passive: false });
    window.addEventListener("keydown", keyScrollBlock, { passive: false });
    window.addEventListener("touchmove", wheelTouchBlock, { passive: false });
    return;
  }
  if (!bool) {
    window.removeEventListener("wheel", wheelTouchBlock, { passive: false });
    window.removeEventListener("keydown", keyScrollBlock, { passive: false });
    window.removeEventListener("touchmove", wheelTouchBlock, {
      passive: false,
    });
  }
};

const keyScrollBlock = (e) => {
  if (e.key == "ArrowDown" || e.key == "ArrowUp") e.preventDefault();
  return;
};

const wheelTouchBlock = (e) => {
  e.preventDefault();
};

const currency = (input) => {
    return input.toFixed(2).toString().replace('.',',') + " €";
}

const getInputType = () => {
  try {
    let helper = document.createEvent("TouchEvent");
    helper = null;
    return "touch";
  } catch (error){
    return "mouse";
  }
}

const addWindowCloser = (element) => {
  vis(element, false);
  window.addEventListener("mousedown", handler = () =>{
    if (element.contains(event.target)) return;
    vis(element, true);
    window.removeEventListener("mousedown", handler);
  })
}

const gbc = element => element.getBoundingClientRect();

const log = console.log;
