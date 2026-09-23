const diceDisplay = document.getElementById("diceDisplay");
const totalValue = document.getElementById("totalValue");

const diceCount = document.getElementById("diceCount");
const diceCountValue = document.getElementById("diceCountValue");

const rollBtn = document.getElementById("rollBtn");


const diceFaces = [
    "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"
];


/* ================= DICE COUNT SLIDER ================= */

diceCount.addEventListener("input", () => {

    diceCountValue.textContent = diceCount.value;

});


/* ================= ROLL DICE ================= */

function rollDice(){

    const count = Number(diceCount.value);

    diceDisplay.innerHTML = "";

    let total = 0;

    for(let i = 0; i < count; i++){

        const value = Math.floor(Math.random() * 6) + 1;

        total += value;

        const die = document.createElement("span");

        die.classList.add("die", "rolling");
        die.textContent = diceFaces[value - 1];

        diceDisplay.appendChild(die);

    }

    totalValue.textContent = total;

    setTimeout(() => {

        document.querySelectorAll(".die").forEach((die) => {
            die.classList.remove("rolling");
        });

    }, 400);

}


/* ================= ROLL BUTTON ================= */

rollBtn.addEventListener(
    "click",
    rollDice
);


/* ================= INITIAL ROLL ================= */

rollDice();