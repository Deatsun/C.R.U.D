// Tomb az adatoknak.
const emberek = [];

// DOM cache
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// ---- Fuggvenyek ----

    //Hibas adat
function hiba(input, message){
    input.value = "";
    input.classList.add("error");
    input.placeholder = message;
};
    //Adatok kiuritese az inputbol
function urit(){
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
};
    // Ember torlese a listabol
function torolEmber(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === id;
    });
    if(index !== -1){
        emberek.splice(index,1);
        kiir();
    };
};
    // adatok kiiratasa tablazatba
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    emberek.forEach(function(ember){
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");//nev
        let td2 = document.createElement("td");//kor
        let td3 = document.createElement("td");//szakma
        let td4 = document.createElement("td");//ber
        let td5 = document.createElement("td");//muvelet

        let torles = document.createElement("button");
        torles.textContent = "Törles";

        torles.addEventListener("click", function(){
            torolEmber(ember.id);
        });

        td5.appendChild(torles);
        td1.textContent=ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.szakma;
        td4.textContent = ember.ber;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        torzs.appendChild(tr);
    });
};

// --- Click ---
document.getElementById("kuldes").addEventListener("click", function(){
    let _nev = nevInput.value.trim();
    let _kor = Number(korInput.value);
    let _szakma = szakmaInput.value.trim();
    let _ber = Number(berInput.value);

    if(!_nev){
        hiba(nevInput,"Add meg a neved!");
        return;
    };
    if(isNaN(_kor) ||_kor < 18 || _kor > 70){
        hiba(korInput,"min:18 - max:70");
        return;
    };
    if(!_szakma){
        hiba(szakmaInput,"Add meg a szakmad!");
        return;
    };
    if(isNaN(_ber) || _ber < 100000 || _ber > 3000000){
        hiba(berInput,"min:100k - max:3m");
        return;
    };


    const ujEmber = {
        id: Date.now(),
        nev:_nev,
        kor:_kor,
        szakma:_szakma,
        ber:_ber
    };

    emberek.push(ujEmber);
    kiir();
    urit();
});