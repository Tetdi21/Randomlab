const loremOutput = document.getElementById("loremOutput");

const modeSelect = document.getElementById("modeSelect");
const countRange = document.getElementById("countRange");
const countValue = document.getElementById("countValue");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");


const loremWords = [
    "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit",
    "sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore",
    "magna","aliqua","enim","ad","minim","veniam","quis","nostrud",
    "exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo",
    "consequat","duis","aute","irure","in","reprehenderit","voluptate",
    "velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint",
    "occaecat","cupidatat","non","proident","sunt","culpa","qui","officia",
    "deserunt","mollit","anim","id","est","laborum"
];


/* ================= MODE / RANGE LIMITS ================= */

function updateRangeLimits(){

    const mode = modeSelect.value;

    if(mode === "paragraphs"){
        countRange.min = 1;
        countRange.max = 10;
        if(Number(countRange.value) > 10) countRange.value = 10;
    }else if(mode === "sentences"){
        countRange.min = 1;
        countRange.max = 20;
    }else{
        countRange.min = 5;
        countRange.max = 200;
        if(Number(countRange.value) < 5) countRange.value = 5;
    }

    countValue.textContent = countRange.value;

}

modeSelect.addEventListener("change", updateRangeLimits);


countRange.addEventListener("input", () => {

    countValue.textContent = countRange.value;

});


/* ================= HELPERS ================= */

function randomWord(){

    return loremWords[
        Math.floor(Math.random() * loremWords.length)
    ];

}


function capitalize(word){

    return word.charAt(0).toUpperCase() + word.slice(1);

}


function generateSentence(){

    const length = Math.floor(Math.random() * 10) + 6;

    let words = [];

    for(let i = 0; i < length; i++){
        words.push(randomWord());
    }

    let sentence = words.join(" ");

    sentence = capitalize(sentence) + ".";

    return sentence;

}


function generateParagraph(){

    const sentenceCount = Math.floor(Math.random() * 4) + 4;

    let sentences = [];

    for(let i = 0; i < sentenceCount; i++){
        sentences.push(generateSentence());
    }

    return sentences.join(" ");

}


/* ================= GENERATE ================= */

function generateLorem(){

    const mode = modeSelect.value;
    const count = Number(countRange.value);

    let result = "";

    if(mode === "paragraphs"){

        let paragraphs = [];

        for(let i = 0; i < count; i++){
            paragraphs.push(generateParagraph());
        }

        result = paragraphs.join("\n\n");

    }else if(mode === "sentences"){

        let sentences = [];

        for(let i = 0; i < count; i++){
            sentences.push(generateSentence());
        }

        result = sentences.join(" ");

    }else{

        let words = [];

        for(let i = 0; i < count; i++){
            words.push(randomWord());
        }

        result = capitalize(words.join(" ")) + ".";

    }

    loremOutput.value = result;

}


/* ================= GENERATE BUTTON ================= */

generateBtn.addEventListener(
    "click",
    generateLorem
);


/* ================= COPY BUTTON ================= */

copyBtn.addEventListener(
    "click",
    async () => {

        if(!loremOutput.value){
            return;
        }

        try{

            await navigator.clipboard.writeText(
                loremOutput.value
            );

            const original = copyBtn.textContent;
            copyBtn.textContent = "Copied!";

            setTimeout(() => {
                copyBtn.textContent = original;
            }, 1500);

        }catch(error){

            alert("Failed to copy text.");

        }

    }
);


/* ================= INITIAL GENERATE ================= */

updateRangeLimits();
generateLorem();