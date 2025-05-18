//Fetching Currency Exchange API
const URL_BASE = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;

//Global Variables
const dropDown = document.querySelectorAll(".dropDown select");
const baseCurrency = document.querySelector(".from select");
const targetCurrency = document.querySelector(".to select");
const excButton = document.querySelector(".msg-container button");
const amount = document.querySelector("form input");
const msg = document.querySelector(".msg");

//Creating dropdown by selecting each dropdown
for (const select of dropDown) {
    //Adding countries currencies in the dropdown list
    for (const currencyCode in countryList) {
        // console.log(currencyCode,countryList[currencyCode]); checked!!

        //Creating new option and storing the currency codes in the list
        let newOption = document.createElement('option');
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;

        //Fixing our currency in dropdown initially
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    };

    //Adding an event listener that changes the country Flag wrt currency code
    select.addEventListener("change", (element) => {
        // console.log(element);    returns the clicked event
        // console.log(element.target);  returns the select (from/to)
        // console.log(element.target.value); returns the currency code
        updateFlag(element.target);
    });
};

//Creating function to update flag
const updateFlag = (e) => {
    //Getting country code
    let flag = e.value;
    let countryCode = countryList[flag];

    let Img = e.parentElement.querySelector("img");
    Img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

//Adding Event to Exchange Rate button and to call exchangeRate function
//To prevent re-loading of page when clicking on the button
excButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
});

//To call ExchangeRate function when the page initially loads
document.addEventListener("load", () => {
    updateExchangeRate();
});

//Creating updateExchangeRate function
const updateExchangeRate = async () => {
    let response = await fetch(`${URL_BASE}/${baseCurrency.value.toLowerCase()}.json`);
    let data = await response.json();
    let rate = data[baseCurrency.value.toLowerCase()][targetCurrency.value.toLowerCase()];
    // console.log(rate);   checked!! Printing exchange rate successfully.

    //Calculating Exchange Rate
    let amtValue = amount.value;
    let finalAmount = amtValue * rate;

    //Changing the msg text and printing final exchange
    msg.innerText = `${amtValue} ${baseCurrency.value} = ${finalAmount} ${targetCurrency.value}`;
};