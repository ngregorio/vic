var objSesion = new Object();

jQuery(document).ready(function() {
    
    objSesion.token = getCookie("TOKEN");

    // lista desplegable en cabecera con mouseover
    $('#main-menu li.dropdown').hover(function(){
        $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeIn(0);
        }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeOut(0);
    });

    // ULTIMA SESION
    var a_cross_domain_url = 'https://zeusr.sii.cl/cgi_AUT2000/AutTknData.cgi' + "?rnd=" + Math.random();
    var readerSessionSII = store('siilastsesion');
    var leerTokenData = false;
    if (typeof readerSessionSII !== "undefined" && readerSessionSII !== null && readerSessionSII != "") {
        var sesionTokenLast = getCookie("TOKEN");
        if (sesionTokenLast == readerSessionSII.token && sesionTokenLast != "") {
            respuestaUltimaVisitaRest(readerSessionSII.lastConexion);
        } else {
            leerTokenData = true;
        }
    } else {
        leerTokenData = true;
    }
    if (leerTokenData == true) {
        $.ajax({
            url: a_cross_domain_url,
            type: "post",
            dataType: "jsonp",
            jsonp: "callback",
            success: function(json) {
                //console.log(json);
                //console.log("ready!");
                
            },
            complete: function() {
                //alert( "success" );
                var jsonString = JSON.stringify(objSesion);
                //console.log(jsonString);
                store('siilastsesion', jsonString);
              }
        });
    }
    $("#my-menu").mmenu({
        "navbars": [{
            "position": "top",
            "content": ["searchfield"]
        }, {
            "position": "bottom",
            "content": ["<a data-target='#mm-0' href='http://homer.sii.cl/' class='mm-next mm-fullsubopen'><i class='fa fa-home' aria-hidden='true'></i> Inicio</a> <a href='#' id='closeMenu'><i class='fa fa-sign-out fa-flip-horizontal' aria-hidden='true'></i> Cerrar</a>"]
        }]
    }, {
        offCanvas: {
            pageSelector: "#my-wrapper"
        }
    });
    var API = $("#my-menu").data("mmenu");
    $("#abrirMenu").click(function() {
        $("#my-menu").show();
        API.open();
    });
    $("#closeMenu").click(function() {
        API.close();
    });
    $(".header").click(function() {
        API.close();
    });
    $('#my-menu').data('mmenu').bind('opened', function() {
        $('#abrirMenu').html("<i class='fa fa-sign-out fa-flip-horizontal' aria-hidden='true'></i>");
    });
    $('#my-menu').data('mmenu').bind('close', function() {
        $("#my-menu").hide();
        $('#abrirMenu').html('<span class="sr-only">Mostrar menu</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>');
    });
    $(".arrow-click").on("click", function() {
        $(this).find("span").first().toggleClass("glyphicon-menu-down");
        $(this).find("span").first().toggleClass("glyphicon-menu-up");
        var tag = $(this).parent().prop("tagName").toLowerCase();
        if (tag == "h4") {
            $temp = "#" + $(this).parent().parent().parent().parent().attr("id") + " h4 a span";
            $($temp).attr("class", "glyphicon pull-right glyphicon-menu-down");
            if ($(this).hasClass("collapsed")) {
                $(this).find("span").attr("class", "glyphicon pull-right glyphicon-menu-up");
            }
        }
    });
    if ($("#carousel")) {
        $("#carousel").swiperight(function() {
            $(this).carousel('prev');
        });
        $("#carousel").swipeleft(function() {
            $(this).carousel('next');
        });
    }
    if ($('.multiple-items').length) {
        $('.multiple-items').slick({
            infinite: true,
            lazyLoad: 'ondemand',
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 2500,
            responsive: [{
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
    }
    $('#main-menu li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeIn(0);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeOut(0);
    });
});

function respuestaUltimaVisitaRest(textVisita) {
   if (typeof textVisita != "undefined"){
      document.getElementById('lastConexion').innerHTML = textVisita;
      document.getElementById('lastConexionMovil').innerHTML = textVisita;
      document.getElementById('sinAutenticacion').style.display = 'none';
      document.getElementById('conAutenticacion').style.display = 'block';
      document.getElementById('sinAutenticacionMovil').style.display = 'none';
      document.getElementById('conAutenticacionMovil').style.display = 'block';
      document.getElementById('cerrar-sesion').style.display = 'block';
   }
}

function my_callback(respuesta) {
    objSesion.lastConexion = respuesta.value;
    respuestaUltimaVisitaRest(respuesta.value);
}

var store = function store(key, value) {
    var lsSupport = false;
    if (localStorage) {
        lsSupport = true;
    }
    if (typeof value !== "undefined" && value !== null) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        if (lsSupport) {
            localStorage.setItem(key, value);
        } else {
            createCookie(key, value, 30);
        }
    }
    if (typeof value === "undefined") {
        if (lsSupport) {
            data = localStorage.getItem(key);
        } else {
            data = readCookie(key);
        }
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = data;
        }
        return data;
    }
    if (value === null) {
        if (lsSupport) {
            localStorage.removeItem(key);
        } else {
            createCookie(key, '', -1);
        }
    }

    function createCookie(key, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = key + "=" + value + expires + "; path=/";
    }

    function readCookie(key) {
        var nameEQ = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0, max = ca.length; i < max; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
	
    /*si no está consola se crea para IE*/
    if (typeof console === "undefined"){
        console={};
        console.log = function(){};
    }
	
};
