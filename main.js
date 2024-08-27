// Get obj keys as arr
const arrOfKeys = Object.keys(countryNames);
// Get obj Values as arr
const arrOfValues = Object.values(countryNames);

// First Selection (Input'From')
arrOfValues.map((i, y) => {
    inputSelection.innerHTML += `<option value="${arrOfKeys[y]}">${arrOfKeys[y]} || ${i}</option>`;
});
// Second Selection (Output'To')
arrOfValues.map((i, y) => {
    outputSelection.innerHTML += `<option value="${arrOfKeys[y]}">${arrOfKeys[y]} || ${i}</option>`;
});

// Function to Rest Flags
// Why Didnt i make it arrow Function ? Because i will need to use it again in switch functio so i dont have to repeat it again
function flagRest() {
    // Flag1
    let flag1src = inputSelection.value.slice(0, 2);
    flag1.src = `https://flagsapi.com/${flag1src}/shiny/32.png`;
    // Flag2
    let flag2src = outputSelection.value.slice(0, 2);
    flag2.src = `https://flagsapi.com/${flag2src}/shiny/32.png`;
    // I used slice because the link work with first 2 Chr
}

// Function When Selection Value Changes Change The flag
inputSelection.addEventListener("change", flagRest);
outputSelection.addEventListener("change", flagRest);

// Switch Function ==> Switches Values not postion
switchCurrency.addEventListener("click", () => {
    let temp1 = inputSelection.value;
    inputSelection.value = outputSelection.value;
    outputSelection.value = temp1;
    // IDK why Reset function Dont work After Changing Values
    flagRest();
});

// Convert
btn.addEventListener("click", () => {
    fetch(
        `https://v6.exchangerate-api.com/v6/3d435106b9c19e2a020c64a5/latest/${inputSelection.value}`
    )
        // Convert to js
        .then((res) => res.json())
        .then((obj) => {
            // Get Obj
            let arrOfObj = obj;
            // Get Base Currency
            let base = arrOfObj.conversion_rates[`${outputSelection.value}`];
            // Write Last Update to user
            let Lastupdate = arrOfObj.time_last_update_utc.slice(0, 16);
            update.innerHTML = `Last update : ${Lastupdate}`;
            return base;
        })
        .then((Base) => {
            let numberOfCurrency;
            // Checks if number Of currency (Input) is Empty => Defult Value = 1 IF not Value = User Input
            inputCurrency.value == ""
                ? (numberOfCurrency = 1)
                : (numberOfCurrency = inputCurrency.value);
            // Calc The Conversion
            let money = Base * numberOfCurrency;
            // Console log For Testing ^^
            console.log(
                `Base : ${Base} \nNumber of Currency : ${numberOfCurrency} \nThe Money Is : ${money}`
            );
            // Write The Result to user
            result.innerHTML = `${numberOfCurrency} ${
                inputSelection.value
            } = ${money.toFixed(2)} ${outputSelection.value}`;
        });
});
