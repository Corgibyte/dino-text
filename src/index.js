import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './css/styles.css';
import $ from 'jquery';
import DinoService from './js/dino-service.js';

$("#inputForm").submit((event) => {
  event.preventDefault();
  const words = $("#wordsInput").val();
  const paragraphs = $("#paraInput").val();
  let dinoPromise = DinoService.getDinos(words,paragraphs);
  dinoPromise.then(function(response) {
    const responseJSON = JSON.parse(response);
    outputDinos(responseJSON);
  });
});

function outputDinos(response) {
  let htmlString = "";
  for (let i = 0; i < response.length; i++) {
    htmlString = htmlString.concat(`<p id='paragraph${i}'>${response[i].join(" ")}</p>`);
  }
  $("#output").html(htmlString);
}

function getAnimation() {
  const rand = Math.floor(Math.random() * 3);
  const animations = ["lightSpeedInRight", "slideInRight", "flip"];
  return animations[rand];
}

$("#output").on("click", "p", function() {
  animateCSS(this.id, getAnimation())
    .then(animateCSS("output", "fadeOut"))
    .then(function() {
      $("#output").html("");
    });
});

/* eslint-disable no-unused-vars */
const animateCSS = (element, animation, prefix = 'animate__') => {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector("#" + element);
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});    
  });
};
/* eslint-enable no-unused-vars */