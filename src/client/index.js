import Bounce from 'bounce.js';

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function skurtLogo() {
  let width = window.innerWidth;
  let skurt = new Bounce()
    .skew({
      from: { x: 0 },
      to: { x: 20 }
    }).translate({
      from: { x: 0 },
      to: { x: width },
      duration: 500,
      bounces: 4
    }).translate({
      from: { x: 0 },
      to: { x: width * -2 },
      duration: 1,
      delay: 500
    }).translate({
      from: { x: 0 },
      to: { x: width },
      duration: 200,
      delay: 501
    }).skew({
      from: { x: 0},
      to: { x: -20 },
      delay: 702,
      bounces: 5
    });

  return skurt;
}

function grandTwirl() {
  let twirl = new Bounce();
  twirl.scale({
    from: { x: 0.1, y: 0.1 },
    to: { x: 1, y: 1 },
    stiffness: 1,
    bounces: 4,
    duration: 1500,
    delay: 100
  }).rotate({
    from: 0,
    to: 360,
    duration: 1500,
    delay: 200,
    bounces: 2
  });

  return twirl;
}

let animations = [
  skurtLogo,
  grandTwirl
];

document.getElementById('logo').addEventListener('click', function(e) {
  let animation = animations[getRandomInt(0, animations.length)];
  animation().applyTo(e.target);
});




