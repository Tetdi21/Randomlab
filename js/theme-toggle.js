/* ================= APPLY SAVED THEME (SEBELUM RENDER, HINDARI FLASH) ================= */
/* Script ini di-load sedini mungkin di <head>, sebelum CSS lain */

(function(){

    const savedTheme = localStorage.getItem("randomlab-theme");

    if(savedTheme === "dark"){
        document.documentElement.setAttribute("data-theme", "dark");
    }

})();


/* ================= TOGGLE BUTTON LOGIC ================= */

document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("themeToggle");

    if(!toggleBtn){
        return;
    }

    function updateIcon(){

        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        toggleBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    }

    updateIcon();

    toggleBtn.addEventListener("click", () => {

        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        if(isDark){
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("randomlab-theme", "light");
        }else{
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("randomlab-theme", "dark");
        }

        updateIcon();

    });

});