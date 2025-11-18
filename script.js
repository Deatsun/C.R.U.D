//1. lepeskent letrehozom a tombot, amibe az objektumokat fogom tarolni
const emberek = [];

//letrehozom azt a valtozot, ami kesobb eldontni, hogy szerkeszteni kell, vagy uj embert letrehozni
let szerkesztID = null; //let-el hozom létre, mert később változhat.



// DOM cache, a könnyebb-rugalmasabb adatkezeles vegett
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// Most kovetkezik a fuggvenyek letrehozasa

//KIURITES - ezzel a fuggvennyel uritjuk ki az input mezobol az adatokat.
function kiurit(){
    nevInput.value = "";
    korInput.value = "";
    szakmaInput.value = "";
    berInput.value = "";

    nevInput.classList.remove("error") //csak abban az esetben szukseges, ha van letrehozva valami class, pl hiba esten, amit hozza adunk
    korInput.classList.remove("error");
    szakmaInput.classList.remove("error");
    berInput.classList.remove("error");

    nevInput.placeholder = ""; // mivel egy hiba eseten a placeholderbe irunk a felhasznalonak, ezt is uriteni kell!
    korInput.placeholder = "";
    szakmaInput.placeholder = "";
    berInput.placeholder = "";

    szerkesztID = null; // hogy "kilepjen a szerkesztesbol"
}


//HIBA - ha a felhasznalo hibasan, vagy uresen toltotte ki az inputokat, ezzel jelezzuk fele
function hibaEmber(input,message){

    input.value = "";
    input.classList.add("error");
    input.placeholder = message; // az uzenet a placeholderben jelenik meg.
}

//TORLES - ha a felhasznalo torolni szeretne egy objektumot a tombbol
function torolEmber(id){
    const index = emberek.findIndex(function(ember){
        return ember.id === id; //kinyerjuk az adott embernek az indexet a tombbol
    });
    if(index !== -1){ //ha tenyleg van olyan index, akkor toroljuk
        emberek.splice(index,1);
        kiir(); //meghivjuk a kesobb letrehozott kiir fuggvenyt, hogy ismet kiirja az objektumokat a tablzatba, "frissitve"
    };
}

//SZERKESZTES - ha a felhasznalo szerkeszteni szertne a mar eltarolt objektumon
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

    szerkesztID = id;
};

//KIIR - adatok kiiratasa egy tablazatba
function kiir(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = ""; // kiuritjuk minden hivaskor a tbody-t, hogy ne duplikalodjanak az objektumok.

    emberek.forEach(function(ember){
        const tr = document.createElement("tr"); //minden futaskor letrehozunk egy uj sort, es abba uj cellakat.

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td"); //muvelet cella

        td1.textContent = ember.nev;
        td2.textContent = ember.kor;
        td3.textContent = ember.szakma;
        td4.textContent = ember.ber;


        //toroles gomb letrehozasa

        const torol = document.createElement("button");
        torol.textContent = "torol";

        torol.addEventListener("click", function(){
            torolEmber(ember.id);
        });

        td5.appendChild(torol);

        //szerkesztes gomb letrehozasa
        const szerkesztes = document.createElement("button");
        szerkesztes.textContent = "szerkesztes";

        szerkesztes.addEventListener("click", function(){
            szerkesztEmber(ember.id);
        })
        td5.appendChild(szerkesztes);




        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        torzs.appendChild(tr);

    })
}

// kuldes gomb lenyomasa
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
    if(isNaN(berVal) || berVal <= 0 || berVal > 3000000){
        hibaEmber(berInput,"min:0 - max:3000000");
        return;
    };

    if(szerkesztID === null){
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
        return ember.id === szerkesztID;
       });
       if(index !== -1){
        emberek[index].nev = nevVal;
        emberek[index].kor = korVal;
        emberek[index].szakma = szakmaVal;
        emberek[index].ber = berVal;
       }
    }
    kiir();
    kiurit();
});