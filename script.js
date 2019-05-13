var numbers = document.querySelectorAll('.numbers'),
  operations = document.querySelectorAll('.operation'),
  decimalBtn = document.getElementById('decimal'),
  ce = document.getElementById('ce'),
  result = document.getElementById('result'),
  display = document.getElementById('display'),
  c = document.getElementById('c'),
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

ce.addEventListener('click', function(e) {
  clear(e.srcElement.id);
});
c.addEventListener('click', function(e) {
  clear(e.srcElement.id);
});

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
    }
    // else if (MemoryPendingOperation === '√') {
    //   MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
    // }
    else {
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

function clear(id) {
  if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  } else {
    display.value = '0';
    MemoryNewNumber = true;
  }
}

window.addEventListener('keydown', function(e) {
  // Numbers keydown
  if (e.keyCode === 49 || e.keyCode === 97) {
    numberPress(1);
  } else if (e.keyCode === 50 || e.keyCode === 98) {
    numberPress(2);
  } else if (e.keyCode === 51 || e.keyCode === 99) {
    numberPress(3);
  } else if (e.keyCode === 52 || e.keyCode === 100) {
    numberPress(4);
  } else if (e.keyCode === 53 || e.keyCode === 101) {
    numberPress(5);
  } else if (e.keyCode === 54 || e.keyCode === 102) {
    numberPress(6);
  } else if (e.keyCode === 55 || e.keyCode === 103) {
    numberPress(7);
  } else if ((e.keyCode === 56 && !e.shiftKey) || e.keyCode === 104) {
    numberPress(8);
  } else if (e.keyCode === 57 || e.keyCode === 105) {
    numberPress(9);
  } else if (e.keyCode === 48 || e.keyCode === 96) {
    numberPress(0);
    // operations keydown
  } else if (e.keyCode === 191 || e.keyCode === 111) {
    operation('÷');
    // Для Enter
  } else if (e.keyCode === 13 || e.keyCode === 13) {
    operation('=');
  } else if (e.keyCode == 16) {
    shiftIsPressed = true;
    e.preventDefault();
  } else if (e.keyCode == 16) {
    shiftIsPressed = false;
    e.preventDefault();
    // Для равно
  } else if (!shiftIsPressed && e.keyCode === 187) {
    operation('=');
  } else if ((shiftIsPressed && e.keyCode === 56) || e.keyCode === 106) {
    e.preventDefault();
    operation('x');
  } else if ((shiftIsPressed && e.keyCode === 187) || e.keyCode === 107) {
    operation('+');
  } else if (e.keyCode === 189 || e.keyCode === 109) {
    operation('-');
    // delete keydown
  } else if (e.keyCode === 46) {
    clear('c');
  } else if (e.keyCode === 8) {
    clear('ce');
  }
});
