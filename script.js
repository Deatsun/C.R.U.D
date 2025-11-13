let emberek = [];


let kuldes = document.getElementById("kuldes").addEventListener("click", function(){

    let name = document.getElementById("nev").value;
let kor = Number(document.getElementById("kor").value);
let szakma = document.getElementById("szakma").value;
let ber = Number(document.getElementById("ber").value);

const ujember = {
    id:Date.now(),
    nev:name,
    age:kor,
    job:szakma,
    sallary:ber
};

emberek.push(ujember);
kirajzol();
urites();
});

function kirajzol(){
    const torzs = document.getElementById("torzs");
    torzs.innerHTML = "";

    emberek.forEach(function(ember){
        const tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        td1.appendChild(document.createTextNode(ember.nev));
        td2.appendChild(document.createTextNode(ember.age));
        td3.appendChild(document.createTextNode(ember.job));
        td4.appendChild(document.createTextNode(ember.sallary));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        torzs.appendChild(tr);
    })
};

function urites(){
    document.getElementById("nev").value = "";
    document.getElementById("kor").value = "";
    document.getElementById("szakma").value = "";
    document.getElementById("ber").value = "";
};