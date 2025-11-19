// tomb letrehozasa
const emberek = [];

// valtozo letrehozasa, a kesobbi szerkeszteshez.
let szerkesztID = null;

// DOM cache - az egyszerubb adathasznalathoz.
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// Fuggvenyek ------------------------

//kiurites az inputmezokbol
function kiurit(){
    nevInput.value = "";
    korInput.value = "";
    szakmaInput.value = "";
    berInput.value = "";

    nevInput.classList.remove("error"); //le kell szedni az error class-t ha esetleg egy hibas adat miatt felkerulne
    korInput.classList.remove("error");
    szakmaInput.classList.remove("error");
    berInput.classList.remove("error");

    nevInput.placeholder = "";
    korInput.placeholder = "";
    szakmaInput.placeholder = "";
    berInput.placeholder = "";

    szerkesztID = null //vissza allitjuk a szerkesztes modot, mert nem biztos, hogy szerkeszteni akarunk legkozelebb
};

// Hibas input adat eseten.
function hibaEmber(input,message){
    input.value = "";
    input.classList.add("error"); // hozza adjuk az error class-t, amit css-ben mar megformaztunk
    input.placeholder = message;
};

//Ha torolni szeretnenk egy objektumot a tombbol.
function torolEmber(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === id;
    });
    if(index !== -1){ //ha valoban van ilyen id.
        emberek.splice(index,1);
        kiir(); // meghivjuk a kiir fuggvenyt, amit kesobb hozunk letre, hogy ismet kiirja a tombot, a valtozatatasokkal.
    };
};

//ha szerkszteni akarunk egy objektumot
function szerkesztEmber(id){
    const kember = emberek.find(function(ember){
        return ember.id === id; 
    });
    if(!kember){
        return;
    }

    nevInput.value = kember.nev; //kirjuk az inputba a szerkeszteni kivant objektum adatait.
    korInput.value = kember.kor;
    szakmaInput.value = kember.szakma;
    berInput.value = kember.ber;

    szerkesztID = id;
};

//kiiratas tablazatba
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

// click esemeny
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
    if(isNaN(berVal) ||berVal <= 0 || berVal > 10000000){
        hibaEmber(berInput,"Helytelen osszeget adtal meg!");
        return;
    };

    if(szerkesztID === null){
        const ujEmber = {
            id:Date.now(),
            nev:nevVal,
            kor:korVal,
            szakma:szakmaVal,
            ber:berVal
        };
        emberek.push(ujEmber);
    }
    else{
        const index = emberek.findIndex(function(ember){
           return szerkesztID === ember.id;
        });
        if(index !== -1){
             emberek[index].nev = nevVal;
            emberek[index].kor = korVal;
            emberek[index].szakma = szakmaVal;
            emberek[index].ber = berVal;
        }
    };
    kiir();
    kiurit();
});