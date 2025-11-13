// --- Tömb
let emberek = []; 

// --- DOM CACHING

const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// --- Függvények

function urites() {
    nevInput.value = "";
    korInput.value = "";
    szakmaInput.value = "";
    berInput.value = "";

    nevInput.classList.remove("error");
    korInput.classList.remove("error");
    szakmaInput.classList.remove("error");
    berInput.classList.remove("error");

    nevInput.placeholder = "";
    korInput.placeholder = "";
    szakmaInput.placeholder = "";
    berInput.placeholder = "";
}

function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    emberek.forEach(function(ember){
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        td1.textContent = ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.szakma;
        td4.textContent = ember.ber;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        torzs.appendChild(tr);
    })
}

function hiba(input, message){
    input.value = "";
    input.classList.add("error");
    input.placeholder = message;
}
 // --- click
document.getElementById("kuldes").addEventListener("click", function(){
    const nev = nevInput.value.trim();
    const kor = Number(korInput.value);
    const szakma = szakmaInput.value.trim();
    const ber = Number(berInput.value);

    if(!nev){
        hiba(nevInput, "Add meg a nevet!");
        return;
    }

    if(isNaN(kor) || kor < 18 || kor > 70){
        hiba(korInput, "18-70 közötti kort adj meg!");
        return;
    }

    if(!szakma){
        hiba(szakmaInput, "Kérlek add meg a szakmádat!");
        return;
    }

    if(isNaN(ber) || ber < 100000 || ber > 3000000){
        hiba(berInput, "Kérlek 100.000ft és 3.000.000ft összeget adj meg!");
        return;
    }

    const ujEmber = {
        id: Date.now(),
        nev: nev,
        kor: kor,
        szakma: szakma,
        ber: ber
    }
    emberek.push(ujEmber);
    kiir()
    urites();

});