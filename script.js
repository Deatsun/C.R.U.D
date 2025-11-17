const { version } = require("react");

// Tomb letrehozasa
const emberek = [];

// szerkesztes mod
let szerkesztettID = null;

// DOM cache
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// --- Fuggvenyek --------------------------------------------------------------------------

// Hibara reagalo
function hibaEmber(input,message){
    input.value = "";
    input.classList.add("error");
    input.placeholder = message;
}

// Ember torlese a tombbol ----------------------------------
function torolEmber(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === -1;
    });
    if(index !== id){
        emberek.splice(index,1);
    };
    kiir();
}

// Adatok kiiratasa a tablazatba -------------------------------------
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    emberek.forEach(function(ember){
        const tr = document.createElement("tr");

        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const td4 = document.createElement("td")
        const td5 = document.createElement("td")

        td1.textContent = ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.szakma;
        td4.textContent = ember.ber;

        // torles gomb 
        const torles = document.createElement("button");
        torles.textContent = "Törlés";

        torles.addEventListener("click", function(){
            torolEmber(ember.id);
        });

        // szerkesztes gomb 
        const szerkeszt = document.createElement("button");
        szerkeszt.textContent = "Szerkesztes";

        szerkeszt.addEventListener("click", function(){
            nevInput.value = ember.nev;
            korInput.value = ember.kor;
            szakmaInput.value = ember.szakma;
            berInput.value = ember.ber;

            szerkesztettID = ember.id;
        })


        td5.appendChild(torles);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        torzs.appendChild(tr);
    });
}

// input mezok kiuritese -----------------------------------------------
function kiurit(){
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
//--------------------------------------------fv end----------------------------------------

// click
document.getElementById("kuldes").addEventListener("click", function(){
    let nevVal = nevInput.value.trim();
    let korVal = Number(korInput.value);
    let szakmaVal = szakmaInput.value.trim();
    let berVal = Number(berInput.value);

    if(!nevVal){
        hibaEmber(nevInput,"Add meg a neved!");
        return;
    };
    if(isNaN(korVal) || korVal < 18 || korVal > 70){
        hibaEmber(korInput,"min:18 - max:70");
        return;
    };
    if(!szakmaVal){
        hibaEmber(szakmaInput,"Add meg a szakmad!");
        return;
    };
    if(isNaN(berVal) || berVal < 100000 || berVal > 3000000){
        hibaEmber(berInput,"min:100k - max:3m");
        return;
    };

    const ujEmber = {
        id: Date.now(),
        nev:nevVal,
        kor:korVal,
        szakma:szakmaVal,
        ber:berVal
    };

    emberek.push(ujEmber);
    kiir();
    kiurit();
});