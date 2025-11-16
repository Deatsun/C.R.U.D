//1. Lepes, tomb letrehozasa, amibe a kinyert adatokat taroljuk.
const emberek = [];

// 2. lepes, DOM cache, a konnyebb letisztultabb adatok kezelesehez.
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

//3. lepes Fuggvenyek letrehozasa.

    //Hibas adat eseten:
function hiba(input,message){
    input.value = "";
    input.classList.add("error"); //hozza adjuk az "error" claast, majd css-ben dolgozunk rajta.
    input.placeholder = message; //ide irjuk ki a hibat
};

    //Az inputmezok kiuritese
function kiurit(){
    nevInput.value = "";
    korInput.value = "";
    szakmaInput.value = "";
    berInput.value = "";

    nevInput.classList.remove("error");
    korInput.classList.remove("error");
    szakmaInput.classList.remove("error");
    berInput.classList.remove("error"); //eltavolitjuk az error classt, ha esetleg hozza kellett volna adni.

    nevInput.placeholder = "";
    korInput.placeholder ="";
    szakmaInput.placeholder = "";
    berInput.placeholder = "";
};

    //Egy ember torlese a tablazatbol (tombbol), id alapjan.
function torolEmber(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === id;
    });
    if(index !== -1){
        emberek.splice(index,1);
        kiir();
    };
};

    //Az adatok vegigjarasa es kiiratasa tablazatba.
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = ""; //kiuritjuk, hogy ne duplikalodjon a kovetkezo kiirataskor.

    emberek.forEach(function(ember){
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        const torol = document.createElement("button");
        torol.textContent = "Torles";

        torol.addEventListener("click", function(){
            torolEmber(ember.id);
        });

        td1.textContent = ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.szakma;
        td4.textContent = ember.ber;
        td5.appendChild(torol);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        torzs.appendChild(tr);
    });
};

// kuldes gomb kattintasa
document.getElementById("kuldes").addEventListener("click", function(){
    let nevVal = nevInput.value.trim();
    let korVal = Number(korInput.value);
    let szakmaVal = szakmaInput.value.trim();
    let berVal = Number(berInput.value);

    if(!nevVal){
        hiba(nevInput,"Add meg a neved!");
        return;
    };
    if(isNaN(korVal) || korVal < 18 || korVal > 70){
        hiba(korInput,"min:18 - max:70");
        return;
    };
    if(!szakmaVal){
        hiba(szakmaInput,"Add meg a szakmad!");
        return;
    };
    if(isNaN(berVal) || berVal < 100000 || berVal > 3000000){
        hiba(berInput,"min:100k - max:3m");
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