const tabButtons = document.querySelectorAll(".tab-btn");

const textInput = document.getElementById("textInput");
const inputLabel = document.getElementById("inputLabel");

const qrOutput = document.getElementById("qrOutput");
const barcodeOutput = document.getElementById("barcodeOutput");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");


let currentMode = "qr";
let qrInstance = null;


/* ================= MODE SWITCH ================= */

tabButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        currentMode = btn.getAttribute("data-mode");

        if(currentMode === "qr"){

            inputLabel.textContent = "Text or Link";
            textInput.placeholder = "https://example.com";

            qrOutput.style.display = "flex";
            barcodeOutput.style.display = "none";

        }else{

            inputLabel.textContent = "Text or Numbers";
            textInput.placeholder = "1234567890";

            qrOutput.style.display = "none";
            barcodeOutput.style.display = "block";

        }

    });

});


/* ================= GENERATE QR ================= */

function generateQr(value){

    qrOutput.innerHTML = "";

    qrInstance = new QRCode(qrOutput, {

        text: value,
        width: 220,
        height: 220,
        colorDark: "#0F172A",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H

    });

}


/* ================= GENERATE BARCODE ================= */

function generateBarcode(value){

    try{

        JsBarcode(barcodeOutput, value, {

            format: "CODE128",
            lineColor: "#0F172A",
            width: 2,
            height: 90,
            displayValue: true,
            background: "#FFFFFF"

        });

    }catch(error){

        alert("Invalid input for barcode. Try letters/numbers without special symbols.");

    }

}


/* ================= GENERATE BUTTON ================= */

generateBtn.addEventListener("click", () => {

    const value = textInput.value.trim();

    if(!value){
        alert("Please enter some text or a link first!");
        return;
    }

    if(currentMode === "qr"){
        generateQr(value);
    }else{
        generateBarcode(value);
    }

});


/* ================= DOWNLOAD PNG ================= */

downloadBtn.addEventListener("click", () => {

    if(currentMode === "qr"){

        const canvas = qrOutput.querySelector("canvas");

        if(!canvas){
            alert("Generate a QR code first!");
            return;
        }

        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

    }else{

        if(!barcodeOutput.getAttribute("width")){
            alert("Generate a barcode first!");
            return;
        }

        // Convert SVG to PNG via canvas
        const svgData = new XMLSerializer().serializeToString(barcodeOutput);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();

        img.onload = () => {

            const canvas = document.createElement("canvas");
            canvas.width = barcodeOutput.width.baseVal.value;
            canvas.height = barcodeOutput.height.baseVal.value;

            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const link = document.createElement("a");
            link.download = "barcode.png";
            link.href = canvas.toDataURL("image/png");
            link.click();

            URL.revokeObjectURL(url);

        };

        img.src = url;

    }

});


/* ================= INITIAL STATE ================= */

barcodeOutput.style.display = "none";