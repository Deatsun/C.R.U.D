// Tomb letrehozasa az objektumok tarolasa vegett.
let emberek = []; //"let" - A LocalStorage miatt.

// Valtozo letrehozasa, az objektum szerkesztese vegett.(valtozhat)
let szID = null;

// DOM cache - A konnyebb adatformazashoz.
const nevInput = document.getElementById("nev");
const korInput = document.getElementById("kor");
const szakmaInput = document.getElementById("szakma");
const berInput = document.getElementById("ber");

// Betoltes LocalStorage-bol indulaskor
const mentett = localStorage.getItem("emberek");
if(mentett){
    emberek = JSON.parse(mentett);
    kiir();
};


//------------------------ Fuggvenyek ----------------------------------------------
    //-Mentes LocalStorage-ba.
    function mentesLocal(){
        localStorage.setItem("emberek",JSON.stringify(emberek));
    }

    //-Inputmezok kiuritese
    function kiurit(){
        nevInput.value = "";
        korInput.value = "";
        szakmaInput.value = "";
        berInput.value = "";

        nevInput.classList.remove("error") //le kell szednunk az error classt, mert kesobb, hibas/hianyos inputhoz hozza kell adnunk az "errort".
        korInput.classList.remove("error");
        szakmaInput.classList.remove("error");
        berInput.classList.remove("error");

        nevInput.placeholder = ""; //az error class altal letrejott uzenetet a felhasznalonak, eltuntetjuk a placeholderbol.
        korInput.placeholder = "";
        szakmaInput.placeholder = "";
        berInput.placeholder = "";

        szID = null; //Ha nem szerkesztunk, vissza allitjuk az szID-t.
    };


    //-Hibas/hianyos input mezo.
    function hibaEmber(input,message){
        input.value = "";
        input.classList.add("error"); //A korabban emlitett, "error" class, css-ben van megadva a stilus.
        input.placeholder = message;
    };


    //Ha torolni szeretnenk egy objektumot a tombbol.
    function torolEmber(id){
        const index = emberek.findIndex(function(ember){
            return ember.id === id;
        });
        if(index !== -1){
            emberek.splice(index,1);
            mentesLocal(); 
            kiir(); //A torles vegeztevel, ismet megjelenitjuk a teljes tablazatot.(kiir)
        };
    };


    //Ha szerkeszteni szeretnenk egy objektumot.
    function szerkesztEmber(id){
        const kember = emberek.find(function(ember){
            return ember.id === id;
        });
        if(!kember){ //Csekely esely van ra, de ha nem letezne az adott id.(biztositas);
            return;
        }
        nevInput.value = kember.nev; //Kiiratjuk a szerkeszteni kivant objektum adatait, vissza az inputmezobe.
        korInput.value = kember.kor;
        szakmaInput.value = kember.szakma;
        berInput.value = kember.ber;

        szID = id; //Jelezzuk, hogy nem uj objektumot adunk a tombbhoz, hanem ugyan azt modositjuk.
    };


    //Objektum adatainak kiiratasa egy tablazatba.
    function kiir(){
        const torzs = document.getElementById("torzs");
        torzs.innerHTML = ""; //duplikacio elkerulese vegett, minden hivaskor uritjuk a listat.

        emberek.forEach(function(ember){
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td"); //Muveletek cella.

            td1.textContent = ember.nev;
            td2.textContent = ember.kor;
            td3.textContent = ember.szakma;
            td4.textContent = ember.ber;

            //Torles gomb letrehozasa.
            const torles = document.createElement("button");
            torles.textContent = "Torles";

            torles.addEventListener("click", function(){
                torolEmber(ember.id);
            });
            td5.appendChild(torles);

            //Szerkesztes gomb letrehozasa.
            const szerkesztes = document.createElement("button");
            szerkesztes.textContent = "Szerkesztes";

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

// --------------------------------------- FV.END -----------------------------------------------------

// "Kuldes" gomb lenyomasa (click)
document.getElementById("kuldes").addEventListener("click", function(){

    let nevVal = nevInput.value.trim(); //Kinyerjuk az adatokat az adott DOM-bol.
    let korVal = Number(korInput.value);
    let szakmaVal = szakmaInput.value.trim();
    let berVal = Number(berInput.value);

        //Hibas adatok eseten, figyelmeztetjuk a felhasznalot.
    if(!nevVal){ 
        hibaEmber(nevInput,"Add meg a neved!");
        return; //Hogy hibas adat eseten, ne fusson tovabb a "mentes" logika.
    };
    if(isNaN(korVal) || korVal < 18 || korVal > 70){
        hibaEmber(korInput,"min:18 - max:70");
        return;
    };
    if(!szakmaVal){
        hibaEmber(szakmaInput,"Add meg a szakmad!");
        return;
    };
    if(isNaN(berVal) || berVal <= 0 || berVal > 10000000){
        hibaEmber(berInput,"Helytelen osszeget adtal meg!");
        return;
    }

    //Ha atjutott az adat a szuresen, belepunk egy elagazasba, hogy megvizsgaljuk, hogy most szerkesztunk, vagy uj objektumot hozunk letre.
    if(szID === null){

        const ujEmber = { //Letrehozzuk az objektumot.
            id: Date.now(), //Egyedi id-t kap.
            nev: nevVal,
            kor: korVal,
            szakma: szakmaVal,
            ber: berVal
        };
        emberek.push(ujEmber); //Hozza adjuk a tombbhoz a kesz objektumot.
        mentesLocal(); //Hogy elmentse a bongeszo.
    }
    else{//Ha az szID egy meglevo id-ra mutat, akkor kezdodik a szerkesztes.
        const index = emberek.findIndex(function(ember){
            return ember.id === szID;
        });
        if(index !== -1){
            emberek[index].nev = nevVal;
            emberek[index].kor = korVal;
            emberek[index].szakma = szakmaVal;
            emberek[index].ber = berVal;
            mentesLocal();
        };
    };
    kiir();
    kiurit();
});
