const uuidList = document.getElementById("uuidList");

const uuidCount = document.getElementById("uuidCount");
const uuidCountValue = document.getElementById("uuidCountValue");

const generateBtn = document.getElementById("generateBtn");
const copyAllBtn = document.getElementById("copyAllBtn");


let currentUuids = [];


/* ================= COUNT SLIDER ================= */

uuidCount.addEventListener("input", () => {

    uuidCountValue.textContent = uuidCount.value;

});


/* ================= GENERATE UUID V4 ================= */

function createUuidV4(){

    if(crypto.randomUUID){
        return crypto.randomUUID();
    }

    // Fallback kalau crypto.randomUUID tidak tersedia
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        (c) => {

            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);

            return v.toString(16);

        }
    );

}


/* ================= RENDER LIST ================= */

function renderUuidList(){

    uuidList.innerHTML = "";

    currentUuids.forEach((uuid) => {

        const row = document.createElement("div");
        row.classList.add("uuid-row");

        const input = document.createElement("input");
        input.type = "text";
        input.readOnly = true;
        input.value = uuid;

        const btn = document.createElement("button");
        btn.classList.add("copy-btn");
        btn.textContent = "Copy";

        btn.addEventListener("click", async () => {

            try{

                await navigator.clipboard.writeText(uuid);

                const original = btn.textContent;
                btn.textContent = "Copied!";

                setTimeout(() => {
                    btn.textContent = original;
                }, 1500);

            }catch(error){

                alert("Failed to copy UUID.");

            }

        });

        row.appendChild(input);
        row.appendChild(btn);

        uuidList.appendChild(row);

    });

}


/* ================= GENERATE ================= */

function generateUuids(){

    const count = Number(uuidCount.value);

    currentUuids = [];

    for(let i = 0; i < count; i++){
        currentUuids.push(createUuidV4());
    }

    renderUuidList();

}


/* ================= GENERATE BUTTON ================= */

generateBtn.addEventListener(
    "click",
    generateUuids
);


/* ================= COPY ALL BUTTON ================= */

copyAllBtn.addEventListener(
    "click",
    async () => {

        if(currentUuids.length === 0){
            return;
        }

        try{

            await navigator.clipboard.writeText(
                currentUuids.join("\n")
            );

            const original = copyAllBtn.textContent;
            copyAllBtn.textContent = "Copied All!";

            setTimeout(() => {
                copyAllBtn.textContent = original;
            }, 1500);

        }catch(error){

            alert("Failed to copy UUIDs.");

        }

    }
);


/* ================= INITIAL GENERATE ================= */

generateUuids();