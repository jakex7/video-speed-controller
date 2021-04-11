import './popup.css';
import noUiSlider from "nouislider";
import 'nouislider/distribute/nouislider.css';

const superSlider = document.getElementById("superSlider");
const buttons = document.querySelectorAll("button");
const speedValue = document.querySelector("h3");

noUiSlider.create(superSlider, {
  start: [1],
  range: {
    min: 0.25,
    max: 5
  },
  step: 0.25,
  start: 1,
  pips: {
    mode: 'values',
    values: [0, 1, 2, 3, 4, 5],
    density: 5,
    stepped: true
  }
})

const speedStorage = {
  get: cb => {
    chrome.storage.local.get(['speed'], res => {
      cb(res);
    })
  },
  set: (value, cb) => {
    chrome.storage.local.set({speed: value}, () => {
      cb(value);
    });
  }
}

const restoreSpeedValue = () => {
  speedStorage.get(speed => {
    if(typeof speed.speed === 'undefined') {
      updateValue(["1.00"]);
    } else {
      updateValue([speed.speed])
      superSlider.noUiSlider.set(speed.speed);
      // add active to button
      buttons.forEach(button => {
        if(button.dataset.value === speed.speed) 
          button.classList.add("active");
        else 
          button.classList.remove("active");
      })

      // update text value
      speedValue.innerText = speed.speed;
    }
  })
}

const updateValue = (e) => {
  const value = e[0];
  speedStorage.set(value, () => {
    console.log("New speed is: " + value)
    // update button active (if its 1, 2, 3)
    buttons.forEach(button => {
      console.log(button)
      if(button.dataset.value == value) 
        button.classList.add("active");
      else 
        button.classList.remove("active");
    })
    // update text value
    speedValue.innerText = value

    //try to send it to contentScript
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'SPEED',
          payload: {
            speed: value,
          },
        },
        response => {
          console.log('Current speed value passed to contentScript file');
        }
      );
    });
  })
}

const handleButtonClick = e => {
  const value = e.target.dataset.value;
  updateValue([value])
  superSlider.noUiSlider.set(value);
}



buttons.forEach(button => {
  button.addEventListener("click", handleButtonClick)
})
superSlider.noUiSlider.on("change", updateValue)
document.addEventListener('DOMContentLoaded', restoreSpeedValue);