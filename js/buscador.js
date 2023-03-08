$(document).ready(function()
{
   var cajaBuscadorSOL = '<form role="form"><div class="form-group"><div id="btn_buscar_menusol" class="btn_buscar_menusol" data-toggle="tooltip" data-placement="center" title="Solo escribe y tu b&uacute;squeda se actualizar&aacute; autom&aacute;ticamente"><div class="ic_search"></div></div><input type="text" data-toggle="tooltip" data-placement="center" title="Buscar en Tr&aacute;mites en L&iacute;nea" class="form-control" id="txt-search" placeholder="Buscar en Tr&aacute;mites en L&iacute;nea" autocomplete="off"><div id="limpiar_busqueda" data-toggle="tooltip" data-placement="center" title="Limpiar b&uacute;squeda"><div class="ic_eraser"></div></div><div class="clearfix"></div></div></form><div id="filter-records"></div>';
   $( "#buscar" ).prepend($(cajaBuscadorSOL));
			
	var arraymenuSOL = [];

	arraymenuSOL = menuSOL.opciones.sort(function (a, b) {
		 return a.padre - b.padre;
	});

	var arrayTitulos = [];
	var contadorTitulos = 0;

	$( "#menu-lateral li.main" ).each(function( index ) {
	  arrayTitulos[contadorTitulos] = $(this).attr("id").replace("padre_", "") + "__" + $(this).find("a.arrow-click").text();
	  contadorTitulos++;
	});

	var replaceStr = "";
	var StrJson = "";
	var IDtituloActual = "";
	var arrayIDPadre = [];
	var countItemsPadre = 0;
	showResults();

	$('#txt-search').keyup(function(){
			var searchField = $(this).val().toLowerCase();

			if(searchField === '')  {
				 $('#filter-records').html('');
				 $('#filter-records').hide();
				 $('#limpiar_busqueda').hide();
				 return;
			}

			//console.log(menuSOL);

			if(searchField.length > 2){

			$.each(menuSOL.opciones, function(key, val){
					StrJson = val.texto.toLowerCase();
					StrJson = convierteAcentos(StrJson);
					if ((StrJson.search(regex) != -1)) { 

						 if((val.nivel) == "2")
						 {
								 arrayIDPadre[countItemsPadre] = val.id;
						 }
						 if((val.nivel) == "3")
						 {
								 arrayIDPadre[countItemsPadre] = val.padre;
						 }
						 if(((val.nivel) == "4") || ((val.nivel) == "5") || ((val.nivel) == "6"))
						 {
								 arrayIDPadre[countItemsPadre] = val.origen;
						 }
						 countItemsPadre++;
					}
			});

			arrayIDPadre.sort();

			var itemsNivel2 = remove_duplicates_es6(arrayIDPadre);

			function remove_duplicates_es6(arr){
				 var names = arr;
				 var uniqueNames = [];
				 $.each(names, function(i, el){
					  if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
				 });
				 return uniqueNames;
			}

			replaceStr = eliminaAcentos(searchField);
			searchField = replaceStr;

			var regex = new RegExp(searchField, "i");
			var output = '<div class="cerrar_busqueda" data-toggle="tooltip" data-placement="center" title="Cerrar buscador"><div class="ic_close_search"></div></div><p class="titulo"><b>Resultados:</b></p><div class="clearfix"></div><div class="cajaul"><ul>';
			var outputTitulo = "";
			var outputLI = "";
			var outputUL = "";
			var outputAUX = "";
			var idTitulo;
			var swExist = 0;
			var swExistAUX = 0;
			var heightSelected = 0;

			function ifNum(ifstrnum) {
		 		if($.isNumeric(ifstrnum)){
		 			ifstrnum = "http://www.sii.cl/servicios_online/" + ifstrnum;
		 		}
		 		return(ifstrnum);
			}
			function ifNum2(ifstrnum2) {
		 		if($.isNumeric(ifstrnum2.trim().slice(0,4))){
		 			ifstrnum2 = "http://www.sii.cl/servicios_online/" + ifstrnum2;
		 			return(ifstrnum2);
		 		}else{
		 			if(((ifstrnum2.trim().slice(0,4)) != "http") && ((ifstrnum2.trim().slice(0,4)) != "www."))
		 			{
		 				ifstrnum2 = "http://www.sii.cl/servicios_online/" + ifstrnum2;
		 			}
		 			return(ifstrnum2);
		 		}
			}

			for(i = 0; i < itemsNivel2.length; i++)
			{

					$.each(arrayTitulos, function(index,value) {
							idTitulo = value.split("__");
							if(itemsNivel2[i] == idTitulo[0])
							{
								 outputTitulo = '<li class="items subtitulo_menu">' + idTitulo[1] + '</li>';
							}
					});

					$.each(menuSOL.opciones, function(key, val){
							StrJson = val.texto.toLowerCase();
							StrJson = convierteAcentos(StrJson);
							if ((StrJson.search(regex) != -1)) { 

								 if((val.id != "3241") && (val.id != "1026")){

										 if((val.nivel) == "2"){
												 if(itemsNivel2[i] == val.id){
														 if(val.url != ""){
																 outputLI += '<li class="items">';   
																 outputLI += '<a href="'+ val.url +'" target="_self">';
																 outputLI += '<p>' + val.texto + '</p>'
																 outputLI += '</a>';
																 outputLI += '</li>';
																 swExist = 1;
														 }else{
																 outputLI += '<li class="items">';   
																 outputLI += '<a href="'+ ifNum(val.id) + '-.html" target="_self">';
																 outputLI += '<p>' + val.texto + '</p>'
																 outputLI += '</a>';
																 outputLI += '</li>';
																 swExist = 1;
														 }
												 }
										 }
										 
										 if((val.nivel) == "3"){
												 if(itemsNivel2[i] == val.padre){
														 if(val.url != ""){
																 outputLI += '<li class="items">';   
																 outputLI += '<a href="'+ val.url +'" target="_self">';
																 outputLI += '<p>' + val.texto + '</p>'
																 outputLI += '</a>';
																 outputLI += '</li>';
																 swExist = 1;
														 }else{
																 outputLI += '<li class="items">';   
																 outputLI += '<a href="http://www.sii.cl/servicios_online/'+ val.padre + '-' + val.id + '.html" target="_self">';
																 outputLI += '<p>' + val.texto + '</p>'
																 outputLI += '</a>';
																 outputLI += '</li>';
																 swExist = 1;
														 }
												 }
										 }

										 if(((val.nivel) == "4") || ((val.nivel) == "5") || ((val.nivel) == "6")){
												 if(itemsNivel2[i] == val.origen){
														 if(val.url != ""){
																 if(outputTitulo != ""){
																		 outputLI += '<li class="items">';   
																		 outputLI += '<a href="'+ val.url +'" target="_self">';
																		 outputLI += '<p>' + val.texto + '</p>'
																		 outputLI += '</a>';
																		 outputLI += '</li>';
																		 swExist = 1;
																 }else{
																		outputAUX += '<li class="items">';   
																		outputAUX += '<a href="'+ ifNum2(val.url) +'" target="_self">';
																		outputAUX += '<p>' + val.texto + '</p>'
																		outputAUX += '</a>';
																		outputAUX += '</li>';
																		swExistAUX = 1;
																 }
														 }
												 }
										 }

								 }

							}
					});

					if(swExist == 1){
						 outputUL += outputTitulo + outputLI;
					}
					swExist = 0;
					outputLI = "";
					outputTitulo = "";
			}

			if(swExistAUX == 1){
			outputUL = outputUL + '<p class="subtitulo_menu">Otras coincidencias</p>' + outputAUX;
			}
			output += outputUL + '</ul></div><div class="clearfix"></div>';
			$('#filter-records').html(output);
			$('#limpiar_busqueda').show();
			showResults();

			if((($("#filter-records ul li").length)) == 0){
				 $("#filter-records ul").append('<p class="subtitulo_menu">Sin resultados</p>');
				 $('#limpiar_busqueda').show();
			}

			}else{
				 $('#filter-records').html('');
				 $("#filter-records").append('<div class="cerrar_busqueda"><div class="ic_close_search"></div></div><p class="titulo"><b>Resultados:</b></p><div class="clearfix"></div><div class="cajaul"><ul><p class="subtitulo_menu">Sin resultados</p></ul></div><div class="clearfix"></div>');
				 $('#limpiar_busqueda').show();
				 return;
			}

		  var posY = 0;
		  var hsizeDom = window.innerHeight;
		  var position = $('#filter-records').offset();
		  posY = hsizeDom - position.top;
	  $('#filter-records').css("height",posY - 50);

	});

	$("#txt-search").keydown(function(e) {
		 if(e.keyCode == "40"){
			$( "#filter-records ul li" ).focus();
		 }
	});

    $(document).on('click', 'div[class^="cerrar_busqueda"]', function() {
		 $('#txt-search').val('');
		 $('#filter-records').hide();
		 $('#limpiar_busqueda').hide();
	});
	$(document).on('click', 'div[id^="limpiar_busqueda"]', function() {
		 $('#txt-search').val('');
		 $('#filter-records').hide();
		 $('#limpiar_busqueda').hide();
	});

	function showResults() {
		 if((($('#txt-search').val()) == "") || (($('#txt-search').val()) == null)){
			  $('#filter-records').hide();
			  $('#limpiar_busqueda').hide();
		 }else{
			  $('#filter-records').show();
			  $('#limpiar_busqueda').show();
		 }
	}

	function convierteAcentos(str) {
			str = str.replace(/&aacute;/g, 'a');
			str = str.replace(/&eacute;/g, 'e');
			str = str.replace(/&iacute;/g, 'i');
			str = str.replace(/&oacute;/g, 'o');
			str = str.replace(/&uacute;/g, 'u');
			return str;
	}

	function eliminaAcentos(str) {
			str = str.replace(/Ã¡/g, 'a');
			str = str.replace(/Ã©/g, 'e');
			str = str.replace(/Ã­/g, 'i');
			str = str.replace(/Ã³/g, 'o');
			str = str.replace(/Ãº/g, 'u');
			return str;
	}

	var mhover = 0;
	var gtl_href = "";
	var gtl_target = "";

	function menuHover()
	{
	  $("#filter-records ul li").removeClass('selected');
	  $("#filter-records ul li").eq(mhover).addClass('selected');

	}
	menuHover();

	function gotoUrlList()
	{
			gtl_href = $("#filter-records ul li.selected a").attr("href");
			if(gtl_href != null){
			window.location.href = gtl_href;
			}
	}

	var isMobile = 0;
	var isMobileAp;
	var sizeWDom = "";

	function posBusqueda()
	{
		 sizeWDom = window.innerWidth;
		 if(parseInt(sizeWDom) < 768)
		 {
			isMobile = 1;
		 }else{
			isMobile = 0;
		 }
		
		if(isMobile != isMobileAp){
			if(isMobile == 1){
				$("#buscar").insertBefore(".col-sm-9.contenido");
				isMobileAp = 1;
			}else{
				$("#buscar").insertBefore("#menu-lateral");
				isMobileAp = 0;
			}
		}
	}


	function execPostResize()
	{
			posBusqueda();
			var posRes = 0;
			var sizeHDom = window.innerHeight;
			var positionFilter = $('#filter-records').offset();
			posRes = sizeHDom - positionFilter.top;
			$('#filter-records').css("height",posRes - 50);
			$('#filter-records .cajaul ul').css("height",posRes - 50);
	}
				
	var ua = navigator.userAgent;
	var isAndroid = /(android)/i.test(navigator.userAgent);

	if(isAndroid){
			$(window).bind( 'orientationchange', function(e){
					setTimeout(function(){
						execPostResize();
					},500);
			});
	}else{
			window.addEventListener("resize", function() {
					execPostResize();
			});
	}

	posBusqueda();
	
	var sumaheightSelected = -10;
	var arrayHeightLi = [];
	arrayHeightLi[0] = -10;

	$(window).on("keyup", function(e){
		 if(e.keyCode == 40)
		 {

			 if(mhover < $("#filter-records ul li").length - 1)
			 {
				 mhover++;
				 menuHover();
				 if((arrayHeightLi[mhover] != "") && (arrayHeightLi[mhover] == null)){
					  heightSelected = $("#filter-records .cajaul ul li.selected").outerHeight();
					  if(($("#filter-records .cajaul ul li.selected").hasClass("subtitulo_menu"))){
							heightSelected = heightSelected + 13;
					  }
					  sumaheightSelected = sumaheightSelected + heightSelected;
					  arrayHeightLi[mhover] = sumaheightSelected;
				 }
				 $("#filter-records").scrollTop(arrayHeightLi[mhover]);
			 }
		 }
		 else if(e.keyCode == 38)
		 {
			 if(mhover > 0)
			 {
				  mhover--;
				  menuHover();
				  var container = $("#filter-records"),
						scrollTo = $("#filter-records .cajaul ul li.selected");

				 container.animate({
					scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 20
				 }, 0, function() {
				 });
			 }
		 }
	});

	$(window).on("keydown", function(event){
		 if(event.keyCode == 13)
		 {
			event.preventDefault();
			gotoUrlList();
			return false;
		 }
	});
			
});



