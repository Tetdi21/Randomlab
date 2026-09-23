const colorPreview = document.getElementById("colorPreview");

const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const hslValue = document.getElementById("hslValue");

const generateBtn = document.getElementById("generateBtn");
const copyButtons = document.querySelectorAll(".copy-btn");


/* ================= HEX <-> RGB <-> HSL HELPERS ================= */

function randomHex(){

    const letters = "0123456789ABCDEF";
    let hex = "#";

    for(let i = 0; i < 6; i++){
        hex += letters[Math.floor(Math.random() * 16)];
    }

    return hex;

}


function hexToRgb(hex){

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return { r, g, b };

}


function rgbToHsl(r, g, b){

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if(max === min){

        h = 0;
        s = 0;

    }else{

        const d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch(max){

            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

            case g:
                h = (b - r) / d + 2;
                break;

            case b:
                h = (r - g) / d + 4;
                break;

        }

        h /= 6;

    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };

}


/* ================= GENERATE COLOR ================= */

function generateColor(){

    const hex = randomHex();
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);

    colorPreview.style.background = hex;

    hexValue.value = hex;
    rgbValue.value = `rgb(${r}, ${g}, ${b})`;
    hslValue.value = `hsl(${h}, ${s}%, ${l}%)`;

}


/* ================= GENERATE BUTTON ================= */

generateBtn.addEventListener(
    "click",
    generateColor
);


/* ================= COPY BUTTONS ================= */

copyButtons.forEach((btn) => {

    btn.addEventListener("click", async () => {

        const targetId = btn.getAttribute("data-target");
        const targetInput = document.getElementById(targetId);

        if(!targetInput.value){
            return;
        }

        try{

            await navigator.clipboard.writeText(
                targetInput.value
            );

            const original = btn.textContent;
            btn.textContent = "Copied!";

            setTimeout(() => {
                btn.textContent = original;
            }, 1500);

        }catch(error){

            alert("Failed to copy value.");

        }

    });

});


/* ================= INITIAL COLOR ================= */

generateColor();