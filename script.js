// --- Tomb letrehozasa
const emberek = [];

// --- DOM cache
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// ------ Fuggvenyek ------

// Hibas adat
function hiba(input, message){
    input.value = "";
    input.classList.add("error");
    input.placeholder = message;
};

// Torles
function torolEmber(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === id;
    });

    if(index !== -1){
        emberek.splice(index,1);
        kiir();
    }
};

// Input mezok resetelese
function reset(){
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

// Kiiratas
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    emberek.forEach(function(ember){
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td"); // Muvelet oszlop

        // Torles gomb
        let torles = document.createElement("button");
        torles.textContent="Torles";

        torles.addEventListener("click", function(){
            torolEmber(ember.id);
        });

        td1.textContent = ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.szakma;
        td4.textContent = ember.ber;
        td5.appendChild(torles);
        
        


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
    }
    if(isNaN(_kor) || _kor < 18 || _kor > 70){
        hiba(korInput, "min:18 - max:70");
        return;
    }
    if(!_szakma){
        hiba(szakmaInput,"Add meg a szakmad!");
        return;
    }
    if(isNaN(_ber) || _ber < 100000 || _ber > 3000000){
        hiba(berInput, "min:100k - max:3000000");
        return;
    }
// -- Objektum letrehozasa
    const ujEmber = {
        id: Date.now(),
        nev:_nev,
        kor:_kor,
        szakma:_szakma,
        ber:_ber
    };

    //Tombhoz hozzaadas
    emberek.push(ujEmber);
    kiir();
    reset();
    
});