var numbers = document.querySelectorAll('.numbers'),
  operations = document.querySelectorAll('.operation'),
  decimalBtn = document.getElementById('decimal'),
  ce = document.getElementById('ce'),
  result = document.getElementById('result'),
  display = document.getElementById('display'),
  MemoryCurrentNumber = 0,
  MemoryNewNumber = false,
  MemoryPendingOperation = '',
  shiftIsPressed = false;

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function(e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function(e) {
    operation(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

ce.addEventListener('click', clear);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operation(op) {
  var localOperationMemory = display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    display.value = ' ';
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === 'x') {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '÷') {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
}

function decimal() {
  var localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }

  display.value = localDecimalMemory;
}

function clear() {
  display.value = '0';
  MemoryNewNumber = true;
}

// Numbers keydown

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 49) {
    numberPress(1);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 50) {
    numberPress(2);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 51) {
    numberPress(3);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 52) {
    numberPress(4);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 53) {
    numberPress(5);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 54) {
    numberPress(6);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 55) {
    numberPress(7);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 56 && !e.shiftKey) {
    numberPress(8);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 57) {
    numberPress(9);
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 48) {
    numberPress(0);
  }
});

// operations keydown

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 191) {
    operation('÷');
  }
});

window.addEventListener('keydown', function(e) {
  // Для Enter
  if (e.keyCode === 13) {
    operation('=');
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 16) {
    shiftIsPressed = true;
    e.preventDefault();
  }
});

window.addEventListener('keyup', function(e) {
  if (e.keyCode == 16) {
    shiftIsPressed = false;
    e.preventDefault();
  }
});

window.addEventListener('keydown', function(e) {
  // Для равно
  if (!shiftIsPressed && e.keyCode === 187) {
    operation('=');
  }
});

window.addEventListener('keydown', function(e) {
  if (shiftIsPressed && e.keyCode === 56) {
    e.preventDefault();
    operation('x');
  }
});

window.addEventListener('keydown', function(e) {
  if (shiftIsPressed && e.keyCode === 187) {
    operation('+');
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 189) {
    operation('-');
  }
});

// delete keydown

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 46) {
    clear();
  }
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 8) {
    clear();
  }
});
