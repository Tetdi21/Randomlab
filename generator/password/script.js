const password = document.getElementById("password");

const length = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");

const lowercase = document.getElementById("lowercase");

const numbers = document.getElementById("numbers");

const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");

const copyBtn = document.getElementById("copyBtn");

const strengthFill = document.getElementById("strengthFill");

const strengthLabel = document.getElementById("strengthLabel");


/* ================= LENGTH ================= */

length.addEventListener("input", () => {

    lengthValue.textContent = length.value;

});


/* ================= STRENGTH CALCULATION ================= */

function calculateStrength(pass, options){

    if(!pass){
        return { score: 0, label: "—", className: "" };
    }

    let poolSize = 0;

    if(options.uppercase) poolSize += 26;
    if(options.lowercase) poolSize += 26;
    if(options.numbers) poolSize += 10;
    if(options.symbols) poolSize += 22;

    // Estimasi entropy: log2(poolSize ^ length)
    const entropy = pass.length * Math.log2(poolSize || 1);

    let variety = 0;

    if(options.uppercase) variety++;
    if(options.lowercase) variety++;
    if(options.numbers) variety++;
    if(options.symbols) variety++;

    let score, label, className;

    if(entropy < 40 || variety === 1){
        score = 25;
        label = "Lemah";
        className = "weak";
    }else if(entropy < 60 || variety === 2){
        score = 50;
        label = "Sedang";
        className = "medium";
    }else if(entropy < 80 || variety === 3){
        score = 75;
        label = "Kuat";
        className = "strong";
    }else{
        score = 100;
        label = "Sangat Kuat";
        className = "very-strong";
    }

    return { score, label, className };

}


function updateStrengthUI(pass){

    const options = {
        uppercase: uppercase.checked,
        lowercase: lowercase.checked,
        numbers: numbers.checked,
        symbols: symbols.checked
    };

    const { score, label, className } = calculateStrength(pass, options);

    strengthFill.style.width = score + "%";
    strengthFill.className = "strength-fill " + className;

    strengthLabel.textContent = label;
    strengthLabel.className = "strength-label " + className;

}


/* ================= GENERATE PASSWORD ================= */

function generatePassword(){

    let characters = "";


    if(uppercase.checked){

        characters +=
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    }


    if(lowercase.checked){

        characters +=
            "abcdefghijklmnopqrstuvwxyz";

    }


    if(numbers.checked){

        characters +=
            "0123456789";

    }


    if(symbols.checked){

        characters +=
            "!@#$%^&*()_+-=[]{}<>?/";

    }


    /* No option selected */

    if(characters === ""){

        alert(
            "Please select at least one option!"
        );

        return;

    }


    let result = "";


    for(
        let i = 0;
        i < Number(length.value);
        i++
    ){

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );


        result +=
            characters[randomIndex];

    }


    password.value = result;

    updateStrengthUI(result);

}



/* ================= GENERATE BUTTON ================= */

generateBtn.addEventListener(
    "click",
    generatePassword
);



/* ================= COPY BUTTON ================= */

copyBtn.addEventListener(
    "click",
    async () => {

        if(!password.value){

            return;

        }


        try{

            await navigator.clipboard.writeText(
                password.value
            );

            copyBtn.textContent = "Copied!";


            setTimeout(() => {

                copyBtn.textContent = "Copy";

            },1500);


        }catch(error){

            alert(
                "Failed to copy password."
            );

        }

    }
);



/* ================= INITIAL PASSWORD ================= */

generatePassword();