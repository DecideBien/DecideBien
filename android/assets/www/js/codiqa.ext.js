// Put your custom code here

var $div={
    pgpaso1:null,
    pgpaso2:null,
    pgpaso3:null,
    pgpaso4:null,
    pgpaso5:null,
    divback:null,
    iosslider:null
}
var navpos=1;
function varini(){
    $div.pgpaso1=$("#pgpaso1");
    $div.pgpaso2=$("#pgpaso2");
    $div.pgpaso3=$("#pgpaso3");
    $div.pgpaso4=$("#pgpaso4");
    $div.pgpaso5=$("#pgpaso5");
    $div.divback=$("#divback");
    $div.iosslider=$("#iosslider");
};
//funcion que redimensiona el tamaño del mapa
var max_lista;
function max_height(){
    var h = 45;
    var w = $(window).height();
    var wi = $(window).width();
    //var c = $div.pgpaso1;
    var c_new = w-h;
    //c.height(c_new);
    if (c_new>300 && navpos===1){
        $div.pgpaso1.attr("style","text-align: center;margin-top:"+(c_new/2-147)+
        "px;");
    }
    max_lista=wi-175;
    $("div#page1 div.ui-content div#pgpaso3 ul li div.listatext").width(wi-175);
    $("div#page1 div.ui-content div#pgpaso3 ul li div.listatop").width(wi-175);
    $("div#page1 div.ui-content div#pgpaso3 ul li div.listabottom").width(wi-175);
    var rel=0;
    if (wi>w){
        rel=w/wi;
    }else{
        rel=wi/w;
    }
    $('.container').height(c_new);
    $('.iosSlider .slider .item .itembody').height(c_new-80);
}
function max_height2(){
    var wi = $(window).width();
    max_lista=wi-175;
    $("div#page1 div.ui-content div#pgpaso3 ul li div.listatext").width(wi-175);
    $("div#page1 div.ui-content div#pgpaso3 ul li div.listatop").width(wi-175);
    $("div#page1 div.ui-content div#pgpaso3 ul li div.listabottom").width(wi-175);
}
$(window).resize(function() {
    max_height();
});

$(document).ready(function(){
    $('#page1').on("pageshow", function () {
        console.log("pageshow");
    });
    varini();
    max_height();
});

//mostrar=quiere mostrar boton activo/desactivo
function navegar(option){
	$div.pgpaso1.hide();
    $div.pgpaso2.hide();
    $div.pgpaso3.hide();
    $div.pgpaso4.hide();
    $div.pgpaso5.hide();
    switch(option){
    	case 1:$div.pgpaso1.show();break;
    	case 2:$div.pgpaso2.show();break;
    	case 3:$div.pgpaso3.show();break;
    	case 4:$div.pgpaso4.show();cargarslide();break;
    	case 5:$div.pgpaso5.show();break;
    }
    if (option===1){
    	$div.divback.hide();
    }else{
    	$div.divback.show();
    }
    navpos=option;
}
function volver(){
	navpos--;
	navegar(navpos);
}

function marcarbotton(option){
	$div.pgpaso1.removeClass('ui-btn-active');
    $div.pgpaso2.removeClass('ui-btn-active');
    $div.pgpaso3.removeClass('ui-btn-active');
    $div.pgpaso4.removeClass('ui-btn-active');
    $div.pgpaso5.removeClass('ui-btn-active');
    switch(option){
    	case 1:$div.pgpaso1.addClass('ui-btn-active');break;
    	case 2:$div.pgpaso2.addClass('ui-btn-active');break;
    	case 3:$div.pgpaso3.addClass('ui-btn-active');break;
    	case 4:$div.pgpaso4.addClass('ui-btn-active');break;
    	case 5:$div.pgpaso5.addClass('ui-btn-active');break;
    }
}

function onBackKeyDown() {
    console.log("backbuton");
    if (navpos>1){
        volver();
    }
}

var db = window.openDatabase("decidebiendb.sqlite", "2.0", "Decidebien", 1000000);
db.transaction(u_create, errorCB, successCB);
function u_create(tx) {//tx.executeSql('DROP TABLE IF EXISTS user');
    //tx.executeSql('DROP TABLE IF EXISTS user');
    tx.executeSql('SELECT name, sql FROM sqlite_master WHERE name = "program" AND sql LIKE "%i_id%"', [], 
        function (tx, results) {
        var len = results.rows.length;
        if (len===0){
            db_create(tx);
        }else{
            //u_load();
        }
        console.log("columnas de user="+len);
    }, function (){
        db_create(tx);
    });
}
function errorCB(e){
    console.log("error="+e.message);
}

function successCB(){
    console.log("exito");
}

var user={
    ins:0,
    area:0,
    carrera:0,
    txtins:null,
    txtcar:null
}
function listarareas(option){
    var tmplist='=1 ';
    user.ins=option;
    navegar(2);
    switch (option){
        case 1:tmplist=' BETWEEN 3 AND 5 ';break;
        case 2:tmplist='=2 ';break;
        case 3:tmplist='=1 ';break;
    }
    db.transaction(function(tx){
        tx.executeSql('SELECT DISTINCT a.a_id, a.a_name FROM programa t, Institucion i, area_conocimiento a, carrera c '+
            'WHERE i.t_id'+tmplist+
            'AND t.i_id=i.i_id '+
            'AND a.a_id=c.a_id '+
            'AND c.c_id=t.c_id ORDER BY 2 ASC', [], 
        function (tx, results) {
            var len = results.rows.length;
            $('#selectmenu1').empty();
            for (var i=0; i<len; i++){
                //console.log("load area: "+results.rows.item(i).a_id);
                $('#selectmenu1').append($('<option>', { 
                    value: results.rows.item(i).a_id,
                    text : results.rows.item(i).a_name 
                }));
            }
            $('#selectmenu1').val(results.rows.item(0).a_id).change();
        },errorCB);
    }, errorCB, successCB);
}
$( "#selectmenu1" ).change(function() {
    console.log($( "#selectmenu1" ).val());
    listarcarreras($( "#selectmenu1" ).val());
});
function listarcarreras(area){
    var tmplist='=1 ';
    user.area=area;
    switch (user.ins){
        case 1:tmplist=' BETWEEN 3 AND 5 ';break;
        case 2:tmplist='=2 ';break;
        case 3:tmplist='=1 ';break;
    }
    db.transaction(function(tx){
        tx.executeSql('SELECT DISTINCT c.c_id, c.c_name FROM programa t, Institucion i, area_conocimiento a, carrera c '+
            'WHERE i.t_id'+tmplist+
            'AND t.i_id=i.i_id '+
            'AND a.a_id=c.a_id '+
            'AND c.c_id=t.c_id '+
            'AND a.a_id='+area+' ORDER BY 2 ASC', [], 
        function (tx, results) {
            var len = results.rows.length;
            $('#selectmenu2').empty();
            for (var i=0; i<len; i++){
                //console.log("load carrera: "+results.rows.item(i).c_id);
                $('#selectmenu2').append($('<option>', { 
                    value: results.rows.item(i).c_id,
                    text : results.rows.item(i).c_name 
                }));
            }
            $('#selectmenu2').val(results.rows.item(0).c_id).change();
        },errorCB);
    }, errorCB, successCB);
}
function listarUniversidades(){
    var carrera=$( "#selectmenu2" ).val();
    user.txtcar=$( "#selectmenu2 option:selected" ).text();
    var tmplist='=1 ';
    navegar(3);
    user.carrera=carrera;
    switch (user.ins){
        case 1:tmplist=' BETWEEN 3 AND 5 ';break;
        case 2:tmplist='=2 ';break;
        case 3:tmplist='=1 ';break;
    }
    db.transaction(function(tx){
        tx.executeSql('SELECT DISTINCT i.i_id, i.i_name, t.anios_acreditacion, '+
            'i.i_anios_acreditacion AS ia FROM programa t, Institucion i, area_conocimiento a, carrera c '+
            'WHERE i.t_id'+tmplist+
            'AND t.i_id=i.i_id '+
            'AND a.a_id=c.a_id '+
            'AND c.c_id=t.c_id '+
            'AND a.a_id='+user.area+" AND c.c_id="+carrera, [], 
        function (tx, results) {
            var len = results.rows.length;
            $('#uluniversidades').empty();
            addcarrerahead($( "#selectmenu2 option:selected" ).text());
            for (var i=0; i<len; i++){
                //console.log("load universidad: "+results.rows.item(i).i_id);
                adduniversidad(results.rows.item(i).i_name, 
                    results.rows.item(i).anios_acreditacion, 
                    results.rows.item(i).ia,
                    results.rows.item(i).i_id);
            }
            max_height2();
        },errorCB);
    }, errorCB, successCB);
}

function adduniversidad(universidad, anios, ia, uid){
    var tmpanios="-vacio";
    var tmpacred="-NO";
    var tmpia="no-";
    if (anios>0){
        if (anios>4){
            tmpanios="-lleno";
        }else{
            tmpanios="";
        }
        tmpacred="";
    }
    if (ia!=null && ia>0){
        tmpia="";
    }
    $('#uluniversidades').append('<li data-theme="c" onclick="mostrarinfo('+uid+');">'+
              '<div class="listatop" style="width:'+max_lista+'px;"></div>'+
              '<div class="listatoph"></div>'+
              '<div class="listabottom" style="width:'+max_lista+'px;"></div>'+
              '<div class="listabottomh"></div>'+
              '<div class="listatext" style="width:'+max_lista+'px;">'+
                universidad+'<br>'+
                '<span style="font-size: 10px;">$100,000</span>'+
              '</div>'+
              '<div class="listaiconos">'+
                '<img src="css/img/acreditacion-carrera'+tmpacred+'2.png" style="width: 29px;margin-top: 3px;">'+
                '<img src="css/img/anos-de-acreditacion'+tmpanios+'2.png" style="margin-top: -2px;">'+
                '<img src="css/img/'+tmpia+'acreditacion-u2.png" style="width: 33px;">'+
              '</div>'+
            '</li>').listview('refresh');
}
function addcarrerahead(carrera){
    $('#uluniversidades').append('<li data-role="list-divider" role="heading"'+
     ' style="background-color: white;text-align: center;height: 38px;">'+
              '<div class="listatext" style="margin-top: 1px;">'+
                '<span style="color: #006600;font-size: 18px;">'+carrera+'</span>'+
              '</div>'+
              '<div class="listaiconos" style="margin-top: -19px;">'+
                '<img src="css/img/simbologia.JPG" style="width: 126px;'+
                'margin-top: 3px;margin-right: -8px;">'+
              '</div>'+
            '</li>').listview('refresh');
}
function mostrarinfo(uid){
    navegar(4);
    var tmplist='=1 ';
    switch (user.ins){
        case 1:tmplist=' BETWEEN 3 AND 5 ';break;
        case 2:tmplist='=2 ';break;
        case 3:tmplist='=1 ';break;
    }
    db.transaction(function(tx){
        tx.executeSql('SELECT DISTINCT i.i_name, c.c_name, t.anios_acreditacion, i.i_anios_acreditacion AS ia,'+
                't.p_porc_empleabilidad, t.p_sal_inf, t.p_sal_sup, t.p_porc_desercion, '+
                't.p_duracion_real, t.p_porc_alum_sub, t.p_arancel_anual, '+
                'i.i_porc_municipal, i.i_porc_subvencionado, i.i_porc_pagado '+
            'FROM programa t, Institucion i, area_conocimiento a, carrera c '+
            'WHERE i.t_id'+tmplist+
            'AND t.i_id=i.i_id '+
            'AND a.a_id=c.a_id '+
            'AND c.c_id=t.c_id '+
            'AND a.a_id='+user.area+
            ' AND c.c_id='+user.carrera+
            ' AND i.i_id='+uid, [], 
        function (tx, results) {
            var len = results.rows.length;
            user.txtins=results.rows.item(0).i_name;
            llenardatos(results.rows.item(0).ia,results.rows.item(0).anios_acreditacion,
                results.rows.item(0).p_porc_empleabilidad,results.rows.item(0).p_sal_inf,
                results.rows.item(0).p_sal_sup,results.rows.item(0).p_porc_desercion,
                results.rows.item(0).p_duracion_real,results.rows.item(0).p_porc_alum_sub,
                results.rows.item(0).p_arancel_anual,results.rows.item(0).i_porc_municipal,
                results.rows.item(0).i_porc_subvencionado,results.rows.item(0).i_porc_pagado);
        },errorCB);
    }, errorCB, successCB);
}
            
function slideChange(args) {                
                $('.selectors .item').removeClass('selected');
                $('.selectors .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
}

function cargarslide(){
    $('.iosSlider').iosSlider({
                    snapToChildren: true,
                    desktopClickDrag: true,
                    keyboardControls: true,
                    navNextSelector: $('.next'),
                    navPrevSelector: $('.prev'),
                    navSlideSelector: $('.selectors .item'),
                    onSlideChange: slideChange,
                    responsiveSlideContainer:true
                });
    $('i').hide();
}
function llenardatos(ia,ca,pe,si,ss,pd,dr,as,aa,ipm,ips,ipp){
    var iacreditado="No acreditada";
    var itxtacreditado="Institucion acreditada x ";
    var ctxtacreditado="Carrera acreditada x ";
    if (ia!=null && ia>0){
        iacreditado="Acreditada";
        if (ia>1){
            itxtacreditado+=ia+" años";
        }else{
            itxtacreditado+="1 año";
        }
    }else{
        itxtacreditado="Institución no acreditada";
    }
    if (ca>0){
        if (ca>1){
            ctxtacreditado+=ca+" años";
        }else{
            ctxtacreditado+="1 año";
        }
    }else{
        ctxtacreditado="Carrera no acreditada";
    }
    var tmpsal="Sin datos";
    if(si===ss){
        switch(si){
            case 400000:tmpsal="< $400,000";break;
            case 2000000:tmpsal="> $2,000,000";break;
        }
    }else{
        tmpsal="$"+si+"    -    $"+Math.round((si+ss)/2)+"    +    $"+ss;
    }
    //backgroundImage.onload = function() {
          // Once the image has finished loading, draw the 
          // image and then the text.
          DrawScreen(ia,ca,dr,ipm,ips,ipp);
          DrawText(((si+ss)/2),(100-pd),pd,ia,ca,pe);
          DrawText1(iacreditado,itxtacreditado,ctxtacreditado);
          DrawText2(pe,tmpsal);
          DrawText3(dr,pd);
          DrawText4(aa,as);
          makeimg();
      //  };
}
var canvas = $("#canvas")[0];
var canvas1 = $("#canvas1")[0];
var canvas2 = $("#canvas2")[0];
var canvas3 = $("#canvas3")[0];
var canvas4 = $("#canvas4")[0];
var context = canvas.getContext('2d');
var context1 = canvas1.getContext('2d');
var context2 = canvas2.getContext('2d');
var context3 = canvas3.getContext('2d');
var context4 = canvas4.getContext('2d');
var backgroundImage = new Image();
var backgroundImage1 = new Image();
var backgroundImage2 = new Image();
var backgroundImage3 = new Image();
var backgroundImage4 = new Image();
var img={
    insacred:new Image(),
    caracred:new Image(),
    anoacred:new Image(),
    tick:new Image(),
    tickno:new Image(),
    checkn:new Image(),
    checknno:new Image(),
    sem3:new Image(),
    sem6:new Image(),
    sem10:new Image()
};

backgroundImage.src = "css/img/infografia.jpg";
backgroundImage1.src = "css/img/contrato-tipo-grafiscopio-2-05.jpg";
backgroundImage2.src = "css/img/contrato-tipo-grafiscopio-2-06.jpg";
backgroundImage3.src = "css/img/contrato-tipo-grafiscopio-2-07.jpg";
backgroundImage4.src = "css/img/contrato-tipo-grafiscopio-2-08.jpg";

img.insacred.src = "css/img/acreditacion-u.png";
img.caracred.src = "css/img/acreditacion-carrera.png";
img.anoacred.src = "css/img/anos-de-acreditacion.png";
img.tick.src = "css/img/tick.png";
img.tickno.src = "css/img/tickno.png";
img.checkn.src = "css/img/checkn.png";
img.checknno.src = "css/img/checknno.png";
img.sem3.src = "css/img/sem3.png";
img.sem6.src = "css/img/sem6.png";
img.sem10.src = "css/img/sem10.png";

function DrawScreen(ia,ca,dr,m1,m2,m3) {
    context.drawImage(backgroundImage, 0, 0);
    context1.drawImage(backgroundImage1, 0, 0);
    context2.drawImage(backgroundImage2, 0, 0);
    context3.drawImage(backgroundImage3, 0, 0);
    context4.drawImage(backgroundImage4, 0, 0);

    context.drawImage(img.insacred, 205, 365, 30,30);
    context.drawImage(img.anoacred, 200, 410, 40,20);
    context.drawImage(img.caracred, 205, 445, 30,30);
    var tmpimginst;
    var tmpimgcar;
    for (var i=0;i<7;i++){
        if (ia>i){
            tmpimginst=img.tick;
        }else{
            tmpimginst=img.tickno;
        }
        if (ca>i){
            tmpimgcar=img.checkn;
        }else{
            tmpimgcar=img.checknno;
        }
        if (i<4){
            context1.drawImage(tmpimginst, (90+i*50), 260, 60,60);
            context1.drawImage(tmpimgcar, (90+i*50), 420, 60,60);
        }else{
            context1.drawImage(tmpimginst, (65+(i-3)*50), 300, 60,60);
            context1.drawImage(tmpimgcar, (65+(i-3)*50), 480, 60,60);
        }
    }
    for (var i=0;i<Math.round(dr);i++){
        if (i<11){
            context3.drawImage(img.sem10, 18+i*30, 500);
        }else{
            context3.drawImage(img.sem10, 18+(i-11)*30, 405);
        }
    }
    var lastend = 0;
          var data = [m1,m2,m3];
          var myTotal = 0;
          var myColor = ['#ff9934','#1d7f2a','#4d4d41'];

          for(var e = 0; e < data.length; e++)
          {
            myTotal += data[e];
          }

          for (var i = 0; i < data.length; i++) {
            context4.fillStyle = myColor[i];
            context4.beginPath();
            context4.moveTo(270,480);
            context4.arc(270,480,100,lastend,lastend+(Math.PI*2*(data[i]/myTotal)),false);
            context4.lineTo(270,480);
            context4.fill();
            lastend += Math.PI*2*(data[i]/myTotal);
          }
}

function DrawText(salario,pt,pd,ia,ca,ep) {
    context.fillStyle = "white";
    context.font = "40px arial";
    context.textBaseline = 'top';
    context.fillText("$"+salario, 115, 270);
    context.fillText(pt+"%", 80, 130);
    context.font = "20px arial";
    context.fillText(ca, 295, 420);
    context.fillText(ca, 300, 345);
    context.fillText("anos", 285, 365);
    context.fillStyle = "black";
    context.fillText("anos", 285, 470);
    context.font = "30px arial";
    context.fillText(ep+"%", 260, 80);
    context.fillText(pd+"%", 260, 210);
}
function DrawText1(ia,ita,cta) {
          context1.textAlign = 'center';
          context1.fillStyle = "white";
          context1.font = "italic 32px arial";
          context1.textBaseline = 'top';
          context1.fillText(ia, 200, 137);
          context1.font = "italic 26px arial";
          context1.fillText(user.txtins, 200, 20);
          context1.fillStyle = "#339933";
          context1.fillText(ita, 200, 370);
          context1.fillStyle = "#ff9933";
          context1.fillText(cta, 200, 550);
          context1.font = "italic 22px arial";
          context1.fillStyle = "white";
          context1.fillText(user.txtcar, 200, 60);
}

      function DrawText2(pe,salario) {
          context2.textAlign = 'center';
          context2.textBaseline = 'top';
          context2.fillStyle = "white";
          context2.font = "italic 26px arial";
          context2.fillText(user.txtins, 200, 20);
          context2.font = "italic 22px arial";
          context2.fillText(user.txtcar, 200, 60);
          context2.font = "italic 20px arial";
          context2.fillText(salario, 210, 490);
          context2.fillStyle = "black";
          context2.font = "italic 48px arial";
          context2.fillText(pe+"%", 200, 130);
      }
      function DrawText3(dr,pd) {
          context3.textAlign = 'center';
          context3.textBaseline = 'top';
          context3.fillStyle = "white";
          context3.font = "italic 26px arial";
          context3.fillText(user.txtins, 200, 20);
          context3.font = "italic 22px arial";
          context3.fillText(user.txtcar, 200, 60);
          context3.fillStyle = "black";
          context3.font = "italic bold 30px arial";
          context3.fillText(dr+" semestres", 200, 465);
          context3.font = "italic 48px arial";
          context3.fillText(pd+"%", 283, 120);
      }
function DrawText4(arancel,as) {
          context4.textAlign = 'center';
          context4.textBaseline = 'top';
          context4.fillStyle = "white";
          context4.font = "italic 26px arial";
          context4.fillText(user.txtins, 200, 20);
          context4.font = "italic 22px arial";
          context4.fillText(user.txtcar, 200, 60);
          context4.font = "italic bold 30px arial";
          context4.fillText("$"+arancel, 200, 255);
          context4.font = "italic 24px arial";
          context4.fillText("ARANCEL ANUAL", 200, 290);
          context4.fillStyle = "black";
          context4.font = "italic 50px arial";
          context4.fillText(as+"%", 90, 165);
          context4.font = "italic 20px arial";
          context4.textAlign = 'left';
          context4.fillText("Municipal", 50, 430);
          context4.fillText("Subvención", 50, 485);
          context4.fillText("Particular", 50, 540);
      }
function makeimg(){
    var dataURL = canvas.toDataURL();
    $('#canvasimg').attr('src',dataURL);
    dataURL = canvas1.toDataURL();
    $('#canvasimg1').attr('src',dataURL);
    dataURL = canvas2.toDataURL();
    $('#canvasimg2').attr('src',dataURL);
    dataURL = canvas3.toDataURL();
    $('#canvasimg3').attr('src',dataURL);
    dataURL = canvas4.toDataURL();
    $('#canvasimg4').attr('src',dataURL);
}


function uploadimg(){
    FB.init({
              appId: '1406365156264636',
              nativeInterface: CDV.FB,
              useCachedDialogs: false
          });
      
          FB.getLoginStatus(checkstatus);
      
}

        function uploadPhoto(imageURI, servurl) {
            var options = new FileUploadOptions();
            options.fileKey="source";
            options.fileName="Decidebien.png";
            options.mimeType="image/png";

            var params = {};
            params.message = "Probando Decide bien";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(servurl), win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }