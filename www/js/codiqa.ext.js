// Put your custom code here

var $div={
    pgpaso1:null,
    pgpaso2:null,
    pgpaso3:null,
    pgpaso4:null,
    pgpaso5:null,
    divback:null
}
var navpos=1;
function varini(){
    $div.pgpaso1=$("#pgpaso1");
    $div.pgpaso2=$("#pgpaso2");
    $div.pgpaso3=$("#pgpaso3");
    $div.pgpaso4=$("#pgpaso4");
    $div.pgpaso5=$("#pgpaso5");
    $div.divback=$("#divback");
};
//funcion que redimensiona el tamaño del mapa
function max_height(){
    var h = 45;
    var w = $(window).height();
    //var c = $div.pgpaso1;
    var c_new = w - h;
    //c.height(c_new);
    $div.pgpaso1.attr("style","text-align: center;margin-top:"+(c_new/2-127)+
        "px;");
    //s.height(w-30);
}

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
    	case 4:$div.pgpaso4.show();break;
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