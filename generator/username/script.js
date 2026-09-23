const username = document.getElementById("username");
const copyBtn = document.getElementById("copyBtn");

const seedName = document.getElementById("seedName");
const lengthRange = document.getElementById("lengthRange");
const lengthValue = document.getElementById("lengthValue");
const addNumber = document.getElementById("addNumber");

const generateBtn = document.getElementById("generateBtn");


/* ================= TRAINING DATA ================= */
/* Campuran nama fantasy & istilah tech, dipakai buat "melatih" Markov Chain */

const trainingWords = [
    "aiden","zephyr","nova","orion","luna","kairos","phoenix","raven",
    "storm","blaze","nyx","vex","onyx","echo","drift","frost","ember",
    "shade","wraith","cipher","quartz","sable","talon","rune","vortex",
    "nimbus","zenith","lumen","aether","skye","draven","solace","vale",
    "wren","astra","cinder","pyre","halcyon","marrow","thorne","ashen",
    "briar","moss","fable","glint","haze","ivory","jinx","kestrel",
    "lyric","mira","noct","opal","pixel","quill","rogue","silas",
    "terra","umbra","vesper","willow","xeno","yara","zara","byte",
    "circuit","daemon","ether","flux","glitch","hex","ion","jolt",
    "kilo","loop","matrix","neon","octane","pulse","quark","radix",
    "sync","turbo","uplink","volt","warp","yield","zone","varek",
    "korrin","lysandra","thal","medira","voss","kael","serath","nadir",
    "orin","vantis","selune","rythe","calyx","dorian","veyra","isolde"
];


/* ================= BUILD MARKOV CHAIN (order 2, character level) ================= */

function buildMarkovChain(words, order){

    const chain = {};
    const starts = [];

    words.forEach((raw) => {

        const word = raw.toLowerCase();

        if(word.length <= order){
            return;
        }

        starts.push(word.slice(0, order));

        for(let i = 0; i <= word.length - order; i++){

            const key = word.slice(i, i + order);
            const next = word[i + order] || null; // null = akhir kata

            if(!chain[key]){
                chain[key] = [];
            }

            chain[key].push(next);

        }

    });

    return { chain, starts };

}

const ORDER = 2;
const markov = buildMarkovChain(trainingWords, ORDER);


/* ================= GENERATE FROM CHAIN ================= */

function generateFromChain(startKey, minLen, maxLen){

    let current = startKey;
    let result = current;

    let safety = 0;

    while(result.length < maxLen && safety < 100){

        safety++;

        const options = markov.chain[current];

        if(!options || options.length === 0){
            break;
        }

        const next = options[Math.floor(Math.random() * options.length)];

        if(next === null){

            if(result.length >= minLen){
                break;
            }else{
                // terlalu pendek, coba mulai lagi dari titik acak
                current = markov.starts[
                    Math.floor(Math.random() * markov.starts.length)
                ];
                result = current;
                continue;
            }

        }

        result += next;
        current = result.slice(-ORDER);

    }

    return result;

}


function capitalize(str){

    if(!str){
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);

}


/* ================= LENGTH SLIDER ================= */

lengthRange.addEventListener("input", () => {

    lengthValue.textContent = lengthRange.value;

});


/* ================= GENERATE USERNAME ================= */

function generateUsername(){

    const targetLength = Number(lengthRange.value);
    const seed = seedName.value.trim();

    let base = "";

    if(seed){

        // Pakai seed sebagai awalan, lanjutkan pakai Markov Chain
        const seedLower = seed.toLowerCase();
        let startKey = seedLower.slice(-ORDER);

        if(!markov.chain[startKey]){
            // Kalau 2 huruf terakhir seed nggak dikenal chain, mulai dari titik acak
            startKey = markov.starts[
                Math.floor(Math.random() * markov.starts.length)
            ];
        }

        const remainingMin = Math.max(targetLength - seedLower.length, 0);
        const remainingMax = Math.max(targetLength, seedLower.length + 2);

        const generatedTail = generateFromChain(
            startKey,
            seedLower.length + remainingMin,
            remainingMax
        );

        // Ambil bagian setelah overlap awal supaya nggak duplikat huruf
        const tail = generatedTail.length > ORDER
            ? generatedTail.slice(ORDER)
            : "";

        base = capitalize(seedLower) + tail;

    }else{

        const startKey = markov.starts[
            Math.floor(Math.random() * markov.starts.length)
        ];

        const generated = generateFromChain(startKey, targetLength - 2, targetLength + 2);

        base = capitalize(generated);

    }

    if(addNumber.checked){

        const number = Math.floor(Math.random() * 900) + 10;
        base += number;

    }

    username.value = base;

}


/* ================= GENERATE BUTTON ================= */

generateBtn.addEventListener(
    "click",
    generateUsername
);


/* ================= COPY BUTTON ================= */

copyBtn.addEventListener(
    "click",
    async () => {

        if(!username.value){
            return;
        }

        try{

            await navigator.clipboard.writeText(username.value);

            copyBtn.textContent = "Copied!";

            setTimeout(() => {
                copyBtn.textContent = "Copy";
            }, 1500);

        }catch(error){

            alert("Failed to copy username.");

        }

    }
);


/* ================= INITIAL USERNAME ================= */

generateUsername();