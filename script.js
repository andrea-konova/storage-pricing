const storageNumber = document.querySelector('.item__number-storage'),
  transferNumber = document.querySelector('.item__number-transfer'),
  storageInput = document.getElementById('storage-input'),
  transferInput = document.getElementById('transfer-input'),
  bbPrice = document.getElementById('bb-price'),
  bnPrice = document.getElementById('bn-price'),
  scPrice = document.getElementById('sc-price'),
  vlPrice = document.getElementById('vl-price'),
  bnInput = document.querySelector('.bn-input'),
  scInput = document.querySelector('.sc-input');

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
  } else {
    bbPrice.innerHTML = minPrice.toFixed(2);
  }
}

const calculateBn = () => {
  const selected = document.querySelector('input[name="storage-type"]:checked').value;

  let maxPrice = 10;
  let newPrice = (storageInput.value * selected + transferInput.value * 0.01).toFixed(2);

  if (newPrice > maxPrice) {
    bnPrice.innerHTML = maxPrice.toFixed(2);
  } else {
    bnPrice.innerHTML = newPrice;
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
}

const calculateVl = () => {
  let minPrice = 5;
  let newPrice = (storageInput.value * 0.01 + transferInput.value * 0.01).toFixed(2);

  if (newPrice > minPrice) {
    vlPrice.innerHTML = newPrice;
  } else {
    vlPrice.innerHTML = minPrice.toFixed(2);
  }
}

const calculateAll = () => {
  calculateBb();
  calculateBn();
  calculateSc();
  calculateVl();
}


window.addEventListener('DOMContentLoaded', () => {
  checkStorageValue();
  checkTransferValue();
  calculateAll();
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
  }
});

scInput.addEventListener('click',  (e) => {
  if (e.target.className === 'input' || e.target.className === 'label') {
    calculateSc();
  }
});