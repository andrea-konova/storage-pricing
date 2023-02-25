const storageNumber = document.querySelector('.item__number-storage'),
  transferNumber = document.querySelector('.item__number-transfer'),
  storageInput = document.getElementById('storage-input'),
  transferInput = document.getElementById('transfer-input'),
  bbPrice = document.getElementById('bb-price'),
  bnPrice = document.getElementById('bn-price'),
  scPrice = document.getElementById('sc-price'),
  vlPrice = document.getElementById('vl-price'),
  bnInput = document.querySelector('.bn-input'),
  scInput = document.querySelector('.sc-input'),
  chartGraphs = document.querySelectorAll('.chart__graph');

const graphA = document.querySelector('.chart__graph-a'),
  graphB = document.querySelector('.chart__graph-b'),
  graphC = document.querySelector('.chart__graph-c'),
  graphD = document.querySelector('.chart__graph-d');

let a, b, c, d;

const checkStorageValue = () => {
  storageNumber.innerHTML = storageInput.value;
}

const checkTransferValue = () => {
  transferNumber.innerHTML = transferInput.value;
}

const calculateBb = () => {
  let minPrice = 7;
  let newPrice = (storageInput.value * 0.005 + transferInput.value * 0.01).toFixed(2);

  if (newPrice > minPrice) {
    bbPrice.innerHTML = newPrice;
    a = Number(newPrice);
  } else {
    bbPrice.innerHTML = minPrice.toFixed(2);
    a = Number(minPrice);
  }
}

const calculateBn = () => {
  const selected = document.querySelector('input[name="storage-type"]:checked').value;

  let maxPrice = 10;
  let newPrice = (storageInput.value * selected + transferInput.value * 0.01).toFixed(2);

  if (newPrice > maxPrice) {
    bnPrice.innerHTML = maxPrice.toFixed(2);
    b = Number(maxPrice.toFixed(2));
  } else {
    bnPrice.innerHTML = newPrice;
    b = Number(newPrice);
  }
}

const calculateSc = () => {
  const selected = document.querySelector('input[name="type"]:checked').value;

  let newPrice;
  let newSelected;
  let transferValue;

  if (storageInput.value <= 75) {
    newSelected = selected * 0;
  } else {
    newSelected = selected
  }

  if (transferInput.value <= 75) {
    transferValue = 0;
  } else {
    transferValue = 0.02;
  }

  newPrice = ((storageInput.value - 75) * newSelected + (transferInput.value - 75) * transferValue).toFixed(2);
  scPrice.innerHTML = newPrice;

  if (newPrice > 0) {
    c = Number(newPrice);
  } else {
    c = Number(0);
  }

}

const calculateVl = () => {
  let minPrice = 5;
  let newPrice = (storageInput.value * 0.01 + transferInput.value * 0.01).toFixed(2);

  if (newPrice > minPrice) {
    vlPrice.innerHTML = newPrice;
    d = newPrice;
  } else {
    vlPrice.innerHTML = minPrice.toFixed(2);
    d = minPrice;
  }
}

const createChart = () => {
  let maxNumber = Math.max(a, b, c, d);

  let widthA = Math.round((a * 200) / maxNumber);
  let widthB = Math.round((b * 200) / maxNumber);
  let widthC = Math.round((c * 200) / maxNumber);
  let widthD = Math.round((d * 200) / maxNumber);

  graphA.style.width = `${widthA}px`;
  graphB.style.width = `${widthB}px`;
  graphC.style.width = `${widthC}px`;
  graphD.style.width = `${widthD}px`;
}

const paintChart = () => {
  let minNumber = Math.min(a, b, c, d);

  const bgGray = '#747e9f';
  const bgBlue = '#D881F8';

  switch (minNumber) {
    case a:
      graphA.style.backgroundColor = bgBlue;
      graphB.style.backgroundColor = bgGray;
      graphC.style.backgroundColor = bgGray;
      graphD.style.backgroundColor = bgGray;
      break;
    case b:
      graphA.style.backgroundColor = bgGray;
      graphB.style.backgroundColor = bgBlue;
      graphC.style.backgroundColor = bgGray;
      graphD.style.backgroundColor = bgGray;
      break;
    case c:
      graphA.style.backgroundColor = bgGray;
      graphB.style.backgroundColor = bgGray;
      graphC.style.backgroundColor = bgBlue;
      graphD.style.backgroundColor = bgGray;
      break;
    case d:
      graphA.style.backgroundColor = bgGray;
      graphB.style.backgroundColor = bgGray;
      graphC.style.backgroundColor = bgGray;
      graphD.style.backgroundColor = bgBlue;
      break;
    default:
      break;
  }
}

const rangeInput = () => {
  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
  }
}

const calculateAll = () => {
  calculateBb();
  calculateBn();
  calculateSc();
  calculateVl();
  createChart();
  paintChart();
}


window.addEventListener('DOMContentLoaded', () => {
  checkStorageValue();
  checkTransferValue();
  calculateAll();
  rangeInput();
});

storageInput.addEventListener('input', () => {
  checkStorageValue();
  calculateAll();
});

transferInput.addEventListener('input', () => {
  checkTransferValue();
  calculateAll();
});

bnInput.addEventListener('click', (e) => {
  if (e.target.className === 'input' || e.target.className === 'label') {
    calculateBn();
    createChart();
    paintChart();
  }
});

scInput.addEventListener('click',  (e) => {
  if (e.target.className === 'input' || e.target.className === 'label') {
    calculateSc();
    createChart();
    paintChart();
  }
});