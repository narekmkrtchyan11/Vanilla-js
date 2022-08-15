const firstCurrency = document.getElementById("firstCurrency");
const secondCurrency = document.getElementById("secondCurrency");
const firstAmount = document.getElementById("firstAmount");
const secondAmount = document.getElementById("secondAmount");
const rateText = document.getElementById("rateText");
const swapBtn = document.querySelector(".swapBtn");

calculate(firstAmount, secondAmount, secondCurrency);

function calculate(firstAmount, secondAmount, secondCurrency) {
    fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency.value}`)
    .then(response => response.json())
    .then(data => {
        const rate = data.rates[secondCurrency.value];
        const count = firstAmount.value;
        secondAmount.value = `${(count * rate)}`;
        updateRateText(rate, secondCurrency)
    });
}

function updateRateText (rate, secondCurrency) {
    rateText.innerText = `1 ${firstCurrency.value} = ${rate} ${secondCurrency.value}`;
}

function swapRate(firstCurrency,secondCurrency) {
    const current = firstCurrency.value;
    firstCurrency.value = secondCurrency.value;
    secondCurrency.value = current;
    calculate(firstAmount, secondAmount, secondCurrency);
}

firstCurrency.addEventListener("change", () => {
    calculate(firstAmount, secondAmount, secondCurrency)
});

secondCurrency.addEventListener("change", () => {
    calculate(firstAmount, secondAmount, secondCurrency)
});

firstAmount.addEventListener("change", () => {
    calculate(firstAmount, secondAmount, secondCurrency)
});

swapBtn.addEventListener("click", () => {
    swapRate(firstCurrency,secondCurrency)
});

