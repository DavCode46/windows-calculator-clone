// Espera a que el contenido del documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  const resultDisplay = document.getElementById("result-display");
  const operationDisplay = document.getElementById("operation-display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = ""; 
  let currentOperation = ""; 
  let previousResult = ""; 
  let lastOperation = false; //boolean utilizado para saber cuando se realizó una operación y 
                            // al pulsar el próximo botón se resetee la pantalla 

  // Función para realizar operaciones especiales 
  const specialOperation = (operator) => {
    if (isNaN(parseFloat(resultDisplay.textContent))) {
      resultDisplay.textContent = "Err!!"; 
    } else {
      switch (operator) {
        case "%":
          currentOperation = `(${currentInput})${operator}`;
          resultDisplay.textContent = parseFloat(resultDisplay.textContent) / 100;
          break;
        case "π":
          currentOperation = `(${currentInput})${operator}`;
          resultDisplay.textContent = parseFloat(resultDisplay.textContent) * Math.PI;
          break;
        case "1/x":
          currentOperation = `(${currentInput})${operator}`;
          resultDisplay.textContent = 1 / parseFloat(resultDisplay.textContent);
          break;
        case "^":
          currentOperation = `(${currentInput})${operator}`;
          resultDisplay.textContent = Math.pow(parseFloat(resultDisplay.textContent), 2);
          break;
        case "√":
          currentOperation = `(${currentInput})${operator}`;
          resultDisplay.textContent = Math.sqrt(parseFloat(resultDisplay.textContent));
          break;
        case "abs":
          currentOperation = `(${currentInput})${operator}`;
          resultDisplay.textContent = -parseFloat(resultDisplay.textContent);
          break;
        case "=":
          try {
            currentOperation = `(${currentInput})`;
            previousResult = eval(currentOperation);
            resultDisplay.textContent = previousResult;
          } catch (error) {
            resultDisplay.textContent = "Err!!"; 
          }
          break;
      }
      operationDisplay.textContent = currentOperation;
      currentInput = resultDisplay.textContent;
      lastOperation = true;
    }
  };

  // Función para manejar los números y otros operadores
  const numberOperator = (buttonValue) => {
    if (lastOperation || resultDisplay.textContent === "Err!!") {
      resultDisplay.textContent = buttonValue;
      lastOperation = false;
    } else {
      resultDisplay.textContent += buttonValue;
    }
    currentInput = resultDisplay.textContent;
  };

  // Objeto que mapea los valores de los botones a las funciones correspondientes
  const buttonHandlers = {
    "%": () => specialOperation("%"),
    "π": () => specialOperation("π"),
    "1/x": () => specialOperation("1/x"),
    "^": () => specialOperation("^"),
    "√": () => specialOperation("√"),
    "abs": () => specialOperation("abs"),
    "=": () => specialOperation("="),
    "c": () => {
      resultDisplay.textContent = "";
      currentInput = "";
      currentOperation = "";
      operationDisplay.textContent = "";
      lastOperation = false;
    },
    "return": () => {
      currentInput = currentInput.slice(0, -1);
      resultDisplay.textContent = currentInput;
    },
    default: (buttonValue) => numberOperator(buttonValue),
  };

  // Agrega un evento de clic a cada botón del array
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonValue = button.value;
      const handler = buttonHandlers[buttonValue] || buttonHandlers.default;
      handler(buttonValue);
    });
  });
});
