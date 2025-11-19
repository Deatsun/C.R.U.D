// CRUD

const emberek = [];

let szID = null;

// dom cache
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// fuggvenyek

//input mezo uritese
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

    szID = null;
};

//Hibas adat eseten az inputban
function hibaEmber(input,message){
    input.value = "";
    input.classList.add("error");
    input.placeholder = message;
};

//objektum torlese a tablazatbol
function torolEmber(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === id;
    });
    if(index !== -1){
        emberek.splice(index,1);
        kiir();
    };
};

//objektum szerkesztese a tombben
function szerkesztEmber(id){
    const kember = emberek.find(function(ember){
        return ember.id === id;
    });
    if(!kember){
        return;
    }
    nevInput.value = kember.nev;
    korInput.value = kember.kor;
    szakmaInput.value = kember.szakma;
    berInput.value = kember.ber;

    szID = id;
};

//objektum kiiratasa tombbe.
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    emberek.forEach(function(ember){
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");

        td1.textContent = ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.szakma;
        td4.textContent = ember.ber;

        //torles gomb
        const torles = document.createElement("button");
        torles.textContent = "torles";

        torles.addEventListener("click", function(){
            torolEmber(ember.id);
        });
        td5.appendChild(torles);

        //szerkesztes gomb
        const szerkesztes = document.createElement("button");
        szerkesztes.textContent = "szerkesztes";

        szerkesztes.addEventListener("click", function(){
            szerkesztEmber(ember.id);
        });
        td5.appendChild(szerkesztes);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        torzs.appendChild(tr);
    });
};

// click esemeny "kuldes"
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
    if(isNaN(berVal) || berVal <= 0 ||berVal > 10000000){
        hibaEmber(berInput,"Helytelen osszeget adtal meg!");
        return;
    };

    if(szID === null){
        const ujEmber = {
            id: Date.now(),
            nev:nevVal,
            kor:korVal,
            szakma:szakmaVal,
            ber:berVal
        };
        emberek.push(ujEmber);
    }
    else{
        const index = emberek.findIndex(function(ember){
            return ember.id === szID;
        })
        if(index !== -1){
            emberek[index].nev = nevVal;
            emberek[index].kor = korVal;
            emberek[index].szakma = szakmaVal;
            emberek[index].ber = berVal;
        };
    };
    kiir();
    kiurit();
})