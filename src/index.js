// ================ TEMPLATE IMPORT ===============

import heroTemplate from "./handlebars/hero.hbs";
import aboutTemplate from "./handlebars/about.hbs";

// ================ STYLE IMPOER ==================

import "./sass/main.scss";
import seed from "./assets/images/seed.png";
import soybean from "./assets/images/soybean.png";
import sesam from "./assets/images/sesam.png";
import wheat from "./assets/images/wheat.png";
import corn from "./assets/images/corn.png";
import pack from "./assets/images/package.png";

// =================== MAIN PARAMS ======================

const refs = {
  heroContainer: document.querySelector(".hero-container"),
  aboutContainer: document.querySelector(".about-container"),
};

const rangesValues = {
  soy: {
    currentValue: 0,
    maxValue: 100,
  },
  sesam: {
    currentValue: 0,
    maxValue: 100,
  },
  wheat: {
    currentValue: 0,
    maxValue: 100,
  },
  corn: {
    currentValue: 100,
    maxValue: 100,
  },
};

const calculateValues = (name, value = 0) => {
  const { soy, sesam, wheat, corn } = rangesValues;
  rangesValues[name].currentValue = parseInt(value);

  switch (name) {
    case "soy": {
      if (soy.currentValue > soy.maxValue) {
        soy.currentValue = soy.maxValue;
      }
      sesam.maxValue = 100 - (soy.currentValue + wheat.currentValue);
      wheat.maxValue = 100 - (soy.currentValue + sesam.currentValue);
      console.log(
        `Sesam max: ${sesam.maxValue} || Wheat max: ${wheat.maxValue}`
      );

      break;
    }
    case "sesam": {
      if (sesam.currentValue > sesam.maxValue) {
        sesam.currentValue = sesam.maxValue;
      }
      soy.maxValue = 100 - (sesam.currentValue + wheat.currentValue);
      wheat.maxValue = 100 - (soy.currentValue + sesam.currentValue);
      console.log(`Soy max: ${soy.maxValue} || Wheat max: ${wheat.maxValue}`);
      break;
    }
    case "wheat": {
      wheat.currentValue =
        wheat.maxValue < wheat.currentValue
          ? wheat.maxValue
          : wheat.currentValue;

      sesam.maxValue = 100 - (soy.currentValue + wheat.currentValue);
      soy.maxValue = 100 - (sesam.currentValue + wheat.currentValue);
      console.log(`Soy max: ${soy.maxValue} || Sesam max: ${sesam.maxValue}`);
      break;
    }
  }

  corn.currentValue =
    100 - soy.currentValue - sesam.currentValue - wheat.currentValue;
};

// =================== Renders ==================

const renderValues = () => {
  refs.soyValue.innerText = `${rangesValues.soy.currentValue}%`;
  refs.rangeSoy.value = rangesValues.soy.currentValue;

  refs.sesamValue.innerText = `${rangesValues.sesam.currentValue}%`;
  refs.rangeSesam.value = rangesValues.sesam.currentValue;

  refs.wheatValue.innerText = `${rangesValues.wheat.currentValue}%`;
  refs.rangeWheat.value = rangesValues.wheat.currentValue;

  refs.cornValue.innerText = `${rangesValues.corn.currentValue}%`;
  refs.rangeCorn.value = rangesValues.corn.currentValue;
};

// =================== HANDLERS ==================

const handleOnRangeInput = (e) => {
  calculateValues(e.target.name, e.target.value);
  renderValues();
};

// =================== EVENTS =====================

const initRangesEvents = function () {
  refs.rangesList.addEventListener("input", handleOnRangeInput);
};

// =================== INIT ========================

const initRangesOutput = function () {
  refs.rangeSoy = document.querySelector(".range.soy");
  refs.rangeSesam = document.querySelector(".range.sesam");
  refs.rangeWheat = document.querySelector(".range.wheat");
  refs.rangeCorn = document.querySelector(".range.corn");

  refs.soyValue = document.querySelector(".seed-percent.soy");
  refs.sesamValue = document.querySelector(".seed-percent.sesam");
  refs.wheatValue = document.querySelector(".seed-percent.wheat");
  refs.cornValue = document.querySelector(".seed-percent.corn");
};

const init = function () {
  // main init
  refs.heroContainer.insertAdjacentHTML("beforeend", heroTemplate({ seed }));
  refs.aboutContainer.insertAdjacentHTML(
    "beforeend",
    aboutTemplate({ soybean, sesam, wheat, corn, pack })
  );
  refs.rangesList = document.querySelector(".constructor-list");

  // init events
  initRangesOutput();
  initRangesEvents();
};

init();
