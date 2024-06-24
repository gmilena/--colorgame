// Elementos // 
const squares = document.querySelectorAll(".square");
const message = document.getElementById('message');
const messageGame = document.getElementById('message-game');
const colorDisplay = document.getElementById('colorDisplay');
const title = document.getElementById('h1');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');

const bodyColorB = getComputedStyle(document.body).backgroundColor;

// inicializacion de las variables // 
let colors = [];
let pickedColor;
let numSquares = 6;

// Función inicial // 
function init() {
  setupModeButtons();
  setupSquares();
  reset(numSquares);
}

// Modos de juego // 
function setupModeButtons() {
  modeButtons.forEach(button => {
      button.addEventListener('click', function() {
          modeButtons.forEach(btn => btn.classList.remove('selected'));
          this.classList.add('selected');
          numSquares = (this.textContent === "FÁCIL") ? 3 : 6;
          reset(numSquares);
      });
  });
}

// Botón para resetear el juego // 
resetButton.addEventListener('click', function() {
    reset(numSquares);
    this.textContent = "Nuevos Colores";
    message.textContent = ""
});

// Inicializar cuadros de colores //
function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener("click", function() {
          const clickedColor = this.style.backgroundColor;
          if (clickedColor === pickedColor) {
              message.textContent = "¡Correcto!";
              changeColors(pickedColor);
              title.style.backgroundColor = pickedColor;
              resetButton.textContent = "¿Otra vez?";
              messageGame.textContent = ""
          } else {
              message.textContent = "Intentalo nuevamente";
              this.style.backgroundColor = bodyColorB;
          }
      });
  }
}

// Función reset // 
function reset(numColors) {
  title.style.backgroundColor = bodyColorB; 
  colors = generateRandomColors(numColors);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos Colores";
  message.textContent = "";
  messageGame.textContent = "Adivina el color!"
  
  for (let i = 0; i < squares.length; i++) {
      if(colors[i]) {
          squares[i].style.display = "block";
          squares[i].style.backgroundColor = colors[i];
      } else {
          squares[i].style.display = "none";
      }
  }
}

// Función para generar un color random // 
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Función para generar un arreglo de colores // 
function generateRandomColors(num) {
    const arrColors = [];
    for (let i = 0; i < num; i++) {
        arrColors.push(randomColor());
    }
    return arrColors;
}

// Función para elegir un color random del arreglo // 
function pickColor() {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Función para cambiar los colores de las tarjetas //
function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = color;
  }
}

init();
