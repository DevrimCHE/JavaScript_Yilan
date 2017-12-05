var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var yemx, yemy;
var xler = new Array();
var yler = new Array();
var boyut = 3;
var yon = 2;
var yemdegeri = 1;
var yemSayac = 0;
var yemRenk = "#DAA520";
var renkSayac = 0;
var score = document.getElementById("score")
var puan = 0;

xler[0] = 20;
yler[0] = 20;

cerceveCiz();
yemHazırla();

function update() 
{
    ctx.beginPath();
    ctx.clearRect(10, 10, canvas.width-20, canvas.height-20);
    ctx.rect(yemx, yemy, 10, 10);//Yem Çizimi
    ctx.fillStyle = yemRenk;
    ctx.fill();
    takipEt();
    
    for (var i = 0 ; i < boyut ; i++)//Yılanın Tüm Kutularını Çizmek
    {
        ctx.beginPath();
        ctx.rect(xler[i], yler[i], 10, 10);
        if (i %2 == 0)
        {
            ctx.fillStyle = "#9ACD32";
        }
        else
        {
            ctx.fillStyle = "#7FFF00";
        }
        
        ctx.fill();
        ctx.closePath();
    }
    ctx.closePath(); 
    //yem e degdimi
    if(xler[0] == yemx && yler[0] == yemy)
    {
        boyut+= yemdegeri;
        yemSayac++;
        puan += 10 * yemdegeri;
        yemHazırla();
        if (  yemSayac >= 10)
        {
            yemRenkDegis(renkSayac);
            yemdegeri++;
            yemSayac=0;
        }
    }
    //Kenarlara degdimi
    if(xler[0] < 10 || xler[0] > canvas.width-20 || yler[0] > canvas.height-20 || yler[0] < 10)
    {
        restart();
    }
    //yılana degdimi
    for(var i = 1 ; i <=boyut; i++)
    {
        if(xler[0] == xler[i] && yler[0] == yler[i])
        {
            boyut = i;
            puan = 10*boyut;
        }
    }
    score.innerHTML = "Puan : "+ puan;       
}
function cerceveCiz()
{
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4682B4";
    ctx.fill();
    ctx.closePath();
}
function takipEt()
{
    for(var i = xler.length ; i > 0 ; i--)
    {
        xler[i] = xler[i-1];
        yler[i] = yler[i-1];
    }
    switch(yon) 
    {
        case 1:
            yler[0] -= 10;
            break;
        case 2:
            xler[0] += 10;
            break;
        case 3:
            yler[0] += 10;
        break;
        case 4:
            xler[0] -= 10;
        break;
    }
}
document.onkeydown = checkKey;
function checkKey(e) 
{    
    e = e || window.event;

    if (e.keyCode == '38') {
        if( yon != 3)
        yon = 1;
    }
    else if (e.keyCode == '40') {
        if( yon != 1)
        yon = 3;
    }
    else if (e.keyCode == '37') {
        if( yon != 2)
        yon = 4;
    }
    else if (e.keyCode == '39') {
        if( yon != 4)
        yon = 2;
    }
    else if (e.keyCode == '27')
    {
        alert("Esc' ye Basınca Oyun Durmuyor Gerizekalı");
    }
    else if (e.keyCode == '82')
    {
        restart();
    }
}
function restart()
{
    yemx, yemy;
    xler = new Array();
    yler = new Array();
    boyut = 3;
    yon = 2;
    yemdegeri = 1;
    yemSayac = 0;
    renkSayac = 0;
    yemRenk = "#DAA520";
    xler[0] = 20;
    yler[0] = 20;
    puan = 0;
    score.innerHTML = "Puan : "+ puan;

    cerceveCiz();
    yemHazırla();
}

function yemHazırla()
{
    yemx = getRandomInt((canvas.width *0.1)-5,5)* 10;
    yemy = getRandomInt((canvas.height *0.1)-5,5) * 10;
    for(var i = 0 ; i <=boyut; i++)
    {
        if(yemx == xler[i] && yemy == yler[i])
        {
            yemHazırla();
            return;
        }
    }
}
function yemRenkDegis()
{
    renkSayac++;
    switch(renkSayac%5) 
    {
        case 0:
            yemRenk = "#DAA520";
        break;
        case 1:
            yemRenk = "#663399"
            break;
        case 2:
            yemRenk = "#FF6347";
            break;
        case 3:
            yemRenk = "#708090";
        break;
        case 4:
        yemRenk = "#008080";
    break;
        
    }
}
function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
setInterval(update, 100);
/*
Delpih
-Veri tabanından veri çekip grafik çizdirmek
-Quickreport a veri tabanından yazı yazmak
*/