const game = document.getElementById('game');
const bread = document.getElementById('bread');
const stack = document.getElementById('stack');
const ingredients = ['lettuce', 'tomato', 'cheese', 'patty'];

const audio = new Audio('audio/crunch-munch-100545.mp3');

function onIngredientCaught() {
  audio.currentTime = 0;
  audio.play();
}

let breadX = 120;
let stackHeight = 0;
let gameInterval = null;

// start/stop buttons
document.getElementById('gamebutton').addEventListener('click', startGame);
document.getElementById('stopbutton').addEventListener('click', stopGame);

// scroll to top
document.getElementById('button2').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// scroll to game
document.getElementById('button1').addEventListener('click', function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// to start
function startGame() {
  // Reset game state
  stack.innerHTML = '';
  stackHeight = 0;
  breadX = 120;
  bread.style.left = breadX + 'px';
  stack.style.left = breadX + 'px';

  if (gameInterval) clearInterval(gameInterval);

  // start spawning
  gameInterval = setInterval(spawnIngredient, 1000);
}

// for moving bread left and right
document.addEventListener('keydown', function (e) {
  if (e.key === 'a' && breadX > 0) breadX -= 20;
  if (e.key === 'd' && breadX < 1300) breadX += 20;
  bread.style.left = breadX + 'px';
  stack.style.left = breadX + 'px';
});

// buttons to move left and right if keyboard can't be used
document.getElementById('touchleft').addEventListener('click', function () {
  if (breadX > 0) breadX -= 20;
  bread.style.left = breadX + 'px';
  stack.style.left = breadX + 'px';
});

document.getElementById('touchright').addEventListener('click', function () {
  if (breadX < 1300) breadX += 20;
  bread.style.left = breadX + 'px';
  stack.style.left = breadX + 'px';
});

const ingredientBottom = ingredient.offsetTop + ingredient.offsetHeight;
const breadTop = bread.offsetTop;

// stack on top of bread
if (ingredientBottom >= breadTop) {
  const ingredientLeft = ingredient.offsetLeft;
  const ingredientRight = ingredientLeft + ingredient.offsetWidth;
  const breadLeft = bread.offsetLeft;
  const breadRight = breadLeft + bread.offsetWidth;

  if (ingredientRight >= breadLeft && ingredientLeft <= breadRight) {
    // no-op
  }
}

// spawn ingredient
function spawnIngredient() {
  const type = ingredients[Math.floor(Math.random() * ingredients.length)];
  const ing = document.createElement('div');
  ing.className = `ingredient ${type}`;
  ing.textContent = type;
  ing.style.left = Math.floor(Math.random() * 1300) + 'px';
  ing.style.top = '0px';
  game.appendChild(ing);

  let fall = setInterval(function () {
    let top = parseInt(ing.style.top);
    if (top >= 900) {
      let ingX = parseInt(ing.style.left);
      if (Math.abs(ingX - breadX) < 40) {
        onIngredientCaught();
        const layer = document.createElement('div');
        layer.className = `ingredient ${type}`;
        layer.textContent = type;
        layer.style.bottom = stackHeight + 'px';
        layer.style.left = '0px';
        layer.style.position = 'absolute';
        stack.appendChild(layer);
        stackHeight += 20;
      }
      ing.remove();
      clearInterval(fall);
    } else {
      ing.style.top = top + 5 + 'px';
    }
  }, 50);
}

// stop spawning
function stopGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
    console.log("Game stopped.");
  }
}


