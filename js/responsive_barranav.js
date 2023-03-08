

var swRegVisitas = 0;
var hostMiSII="https://misiir.sii.cl/cgi_misii/siihome.cgi";
//var urlCerrarSesion = "https://api.claveunica.gob.cl/api/v1/accounts/app/logout";
var urlCerrarSesion = "https://zeusr.sii.cl/cgi_AUT2000/autTermino.cgi";


function setCookie(name, value, validez, path, domain){
 var expires = new Date(); 
 expires.setTime(expires.getTime() + (validez*24*60*60*1000)); 
 document.cookie = name+"="+escape(value)+((expires)?";expires="+expires.toGMTString():"")+((path)?";path="+path:"")+((domain)?";domain="+domain:"");
}

function escribeMiga(par){
   if (par==""){
	   document.getElementById("miga").style.borderBottomColor = "transparent";
	   document.getElementById("miga").style.padding = "0px";
	   document.getElementById("miga").innerHTML = "";
   }else {
	   var var_aux = "<li><a href='http://homer.sii.cl/'>Home</a></li>";
	   if (par=="0"){
		   var_aux = var_aux + "<li></li>"
	   }else if (par.indexOf("|")!=-1){
		   var arr_links = new Array()
		   arr_links = par.split("|");
		   for (i=0	;i<arr_links.length;i=i+2){
			  if (i==arr_links.length-2)
				 var_aux = var_aux + "<li class='active'>"+arr_links[i+1]+"</a></li>\n";
			  else
				 var_aux = var_aux + "<li><a href='"+arr_links[i]+"'>"+arr_links[i+1]+"</a></li>\n";
		   }
	   }
   	   document.getElementById("miga").innerHTML = var_aux;
   }
}

function imprimir_compartir(par_imprimir, par_compartir, volver){
   document.write("<p class='barra-opciones'>\n");
   if(volver){
   	document.write("<a href='javascript:history.back(1)'>Volver</a>\n");
   }
   if (par_compartir){
      document.write("	<!-- AddToAny BEGIN -->\n");
      document.write("	<a class='a2a_dd pull-right' href='https://www.addtoany.com/share?linkurl=sii.cl&amp;linkname=Servicios%20de%20impuestos%20internos'>Compartir</a>\n");
      document.write("	<script>\n");
      document.write("	   var a2a_config = a2a_config || {};\n");
      document.write("	   a2a_config.linkname = 'Servicio de Impuestos Internos: ';\n");
      document.write("	   a2a_config.linkurl = '"+window.location.href+"';\n");
      document.write("	   a2a_config.onclick = 1;\n");
      document.write("	   a2a_config.locale = 'es';\n");
      document.write("	   a2a_config.prioritize = ['facebook', 'twitter', 'google_plus', 'whatsapp', 'email'];\n");
      document.write("  </script>\n");
      document.write("	<script async src='https://static.addtoany.com/menu/page.js'></script>\n");
      document.write("	<!-- AddToAny END -->\n");
   }
   if (par_imprimir){
      document.write("	<a class='pull-right hidden-xs' href='javascript:print();'>Imprimir</a>\n");
   }
   document.write("</p>\n");
}

function getCookie(name) {
   var prefix = name + '=';
   var c = document.cookie;
   var nullstring = '';
   var cookieStartIndex = c.indexOf(prefix);
   if (cookieStartIndex == -1) return nullstring;
   var cookieEndIndex = c.indexOf(';', cookieStartIndex + prefix.length);
   if (cookieEndIndex == -1) cookieEndIndex = c.length; return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function imprimeRutEncabezadoMovil(){
	var cook_rut = getCookie('RUT_NS');
	if (cook_rut!=''){
        document.write("Rut: "+cook_rut+"-"+getCookie("DV_NS")+" &nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href='" + urlCerrarSesion + "'>Cerrar Sesi&oacute;n</a>");
	}
}
function imprimeRutEncabezado(){
	var cook_rut = getCookie('RUT_NS');
	if (cook_rut!=''){
        document.write("Rut: "+cook_rut+"-"+getCookie("DV_NS"));
	}
}
function imprimeCerrarSesion(){
   document.write("<a href='" + urlCerrarSesion + "'>Cerrar Sesi&oacute;n</a>");
}
/*
document.write("<link href='https://zeusr.sii.cl/admin/responsive/css/bootstrap-sii.min.css' rel='stylesheet'>\n");
document.write("<link href='https://zeusr.sii.cl/admin/responsive/css/general.css' rel='stylesheet'>\n");
document.write("<link href='https://zeusr.sii.cl/admin/responsive/css/estilos.css' rel='stylesheet'>\n");
*/
function mostrar(par){
	document.write("<!-- CABECERA MOVIL-->\n");
	document.write("<div class='web-sii cabecera Fixed hidden-sm hidden-md hidden-lg'>\n");
	document.write("	<div class='header'>\n");
	document.write("		<nav class='navbar navbar-primary'>\n");
	document.write("			<div class='container'> \n");
	document.write("				<!-- BOTONES MOVIL -->\n");
	document.write("				<div class='navbar-header'>\n");
	document.write("					<button class='navbar-toggle pull-left' type='button' id='abrirMenu'> <span class='sr-only'>Mostrar menu</span> <span class='icon-bar'></span> <span class='icon-bar'></span> <span class='icon-bar'></span></button>\n");
	document.write("					<h1 class='hidden-sm hidden-md hidden-lg'><a href='http://homer.sii.cl/' title='Sii - Servicio de impuestos internos'><img src='https://zeusr.sii.cl/admin/responsive/images/logo.jpg' alt='Sii - Servicio de impuestos internos'></a></h1>\n");
	document.write("					<button aria-expanded='false' data-target='#opciones_movil' data-toggle='collapse' class='navbar-toggle collapsed' type='button'><span aria-hidden='true' class='glyphicon glyphicon-user'></span></button>\n");
/*	document.write("					<button aria-expanded='false' data-target='#buscador' data-toggle='collapse' class='navbar-toggle btn-search collapsed' type='button'><span aria-hidden='true' class='glyphicon glyphicon-search'></span></button>\n");*/
	document.write("					<div class='border'></div>\n");
	document.write("				</div>\n");
	document.write("				<!-- MENU OPCIONES -->\n");
	document.write("				<div id='opciones_movil' class='navbar-collapse collapse' aria-expanded='false'>\n");
	document.write("					<ul class='nav navbar-nav' style='display:block' id='sinAutenticacionMovil'>\n");
	document.write("						<li class='special'> <a href='"+hostMiSII+"'>Ingresar a Mi Sii</a></li>\n");
	document.write("					</ul>\n");
    document.write("					<ul class='nav navbar-nav usuario' style='display:none' id='conAutenticacionMovil'>\n");
    document.write("					   <li>\n");
    document.write("					      <span class='id'>\n");
    document.write("					         <script>imprimeRutEncabezadoMovil();</script><br />\n");
    document.write("					         <span id='lastConexionMovil'></span>\n");
    document.write("					      </span>\n");
    document.write("					   </li>\n");
    document.write("					</ul>\n");
	document.write("				</div>\n");
/*	document.write("				<!-- BUSCADOR MOVIL -->\n");
	document.write("				<div id='buscador' class='navbar-collapse collapse' aria-expanded='false'>\n");
	document.write("					<form role='search' class='navbar-form navbar-right buscador' name='frmM' action='http://search.sii.cl/query.html' target='_blank' onSubmit=\"if(document.frmM.qt.value==''){alert('Por favor, ingrese el patr\u00f3n de b\u00fasqueda.');document.frmM.qt.focus();return false;}\">\n");
    document.write("						<input type='hidden' name='col' value='10intern'>\n");	                                    
	document.write("						<div class='form-group'>\n");
	document.write("							<label for='text-buscador' class='hidden'>Buscador</label>\n");
	document.write("							<input type='text' placeholder='Buscar' class='form-control' id='text-buscador' name='qt'>\n");
	document.write("						</div>\n");
	document.write("						<button class='btn btn-default' type='submit'><span aria-hidden='true' class='glyphicon glyphicon-search'></span> </button>\n");
	document.write("					</form>\n");
	document.write("				</div>\n");*/
	document.write("			</div>\n");
	document.write("		</nav>\n");
	document.write("		<!-- MENU MOVIL -->\n");
	document.write("		<nav id='my-menu' style='display:none;'>\n");
	document.write("			<ul>\n");
   document.write("				  <li><a href='"+hostMiSII+"'>Mi Sii</a></li>\n");
    document.write("             <li><span>Servicios online</span>\n");
    document.write("                  <ul>\n");
    document.write("						<li><span>Clave tributaria y Representantes electr&oacute;nicos</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1943-1945.html'>Clave tributaria</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1943-1946.html'>Representantes electr&oacute;nicos</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>RUT e Inicio de actividades</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1031-1032.html'>Inscripci&oacute;n y obtenci&oacute;n de N&deg; de RUT</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1031-1033.html'>C&eacute;dula RUT electr&oacute;nica (e-RUT)</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1031-1034.html'>Inicio de actividades</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Actualizaci&oacute;n de informaci&oacute;n</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='https://www4.sii.cl/modificacionesiainternetui/'>Actualizar datos de identificaci&oacute;n</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/modificacioncntrui/#/modificadomicilio'>Actualizar domicilio</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/modificacioncntrui/#/modificagiros '>Cambiar/ampliar giro o actividad econ&oacute;mica</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/modificacioncntrui/#/modificasucursal'>Agregar/eliminar sucursales</a></li>\n");
    document.write("                               <li><a href='https://zeusr.sii.cl/cgi_AUT2000/autValidaMovilEmail.cgi'>Cambiar email y/o tel&eacute;fono m&oacute;vil</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1125-1100.html'>Notificaci&oacute;n por correo electr&oacute;nico</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/modificacionesiainternetui/#!/entidad/reorganizacion/seleccionar'>Informar reorganizaciones empresariales</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Peticiones Administrativas y otras Solicitudes</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1140.html'>Peticiones Administrativas</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1091.html'>Reg&iacute;menes tributarios</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-3729.html'>Consultas sobre interpretaci&oacute;n y aplicaci&oacute;n de disposiciones tributarias</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/gabineteAdmInternet/consulta.html?form=ElusionIngreso'>Consultas sobre 26 bis del C&oacute;digo Tributario</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1097.html'>Verificaci&oacute;n de actividad</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-3582.html'>Aviso de venta de veh&iacute;culos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1111.html'>Solicitud de contabilidad computacional</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1158.html'>Impresoras fiscales</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1173.html'>M&aacute;quinas registradoras</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1132.html'>Dar aviso de p&eacute;rdida y/o recuperaci&oacute;n de c&eacute;dula de identidad</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-1145.html'>Certificados a presentar ante Administraciones Tributarias Extranjeras</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1037-3604.html'>Presentaci&oacute;n RAV/RAF y Recurso Jer&aacute;rquico (RJ)</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Autorizaci&oacute;n de Documentos Tributarios</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='https://www4.sii.cl/tibvsui/internet/'>Solicitar Autorizaci&oacute;n de Documentos Tributarios</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/copiaCertificadosBlobstoreInternet/#consulta'>Consultar Certificados Emitidos</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Factura electr&oacute;nica</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-1182.html'>Conozca sobre Factura Electr&oacute;nica</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-1183.html'>Sistema de facturaci&oacute;n gratuito del SII</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-1184.html'>Sistema de facturaci&oacute;n de mercado</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-3256.html'>Registro de Compras y Ventas</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-1185.html'>Consultas DTE</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-3201.html'>Registro de Aceptaci&oacute;n o Reclamo de un DTE</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-1186.html'>Consulta de contribuyentes</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/destacados/factura_electronica/cesion_facturas.html'> Publicaci&oacute;n de Facturas</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1039-3532.html'>Boleta electr&oacute;nica de ventas y servicios</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Boletas de honorarios electr&oacute;nicas</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1040-1287.html'>Emisor de boleta de honorarios</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1040-1309.html'>Boleta de prestaci&oacute;n de servicios de terceros electr&oacute;nica</a></li>\n");
    document.write("                               <li><a href='https://www.previsionsocial.gob.cl/sps/ley-honorarios/'>Cotizaciones previsionales</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/consultaestadof22ui/#!/validarCertificado'>Consulta comprobante cotizaciones</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1040-3752.html'>Beneficio a Trabajadores Independientes</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Libros contables electr&oacute;nicos</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1041-1324.html'>Inscripci&oacute;n Libros Contables Electr&oacute;nicos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1041-1334.html'>Env&iacute;o de Documentos</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Impuestos mensuales</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-3264.html'>Declaraci&oacute;n mensual (F29)</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-3265.html'>Declaraci&oacute;n mensual (F50)</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-3253.html'>Registro de Compras y Ventas</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-3267.html'>Asistente para c&aacute;lculos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-3266.html'>Consulta y seguimiento (F29 y F50)</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/rfiInternet/?opcionPagina=ConsultaGiros'>Consultar y pagar giros</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-3640.html'>Solicitud de devoluciones</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-3744.html'>Impuesto de Timbres y Estampillas (F24 y F24.1)</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-1414.html'>Importador de Libros de Compras y Ventas</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1042-1435.html'>Otras aplicaciones y N&oacute;minas</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Declaraciones juradas</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1043-1451.html'>Declaraciones juradas de IVA</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1043-1518.html'>Declaraciones juradas de Renta</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1043-1562.html'>Declaraci&oacute;n jurada de impuesto de timbres y estampilla</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1043-1576.html'>Declaraciones juradas de bienes ra&iacute;ces</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1043-1584.html'>Registro de inversiones en el extranjero</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Declaraci&oacute;n de renta</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='https://alerce.sii.cl/dior_cgi/ren_mp/REN_MenusRenta.cgi?opcion=11'>Declarar Renta (F22)</a></li>\n");
    document.write("                               <li><a href='https://alerce.sii.cl/dior_cgi/ren_mp/REN_MenusRenta.cgi?opcion=1'>Corregir o rectificar declaraci&oacute;n</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1044-2696.html'>Consulta y seguimiento</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1044-2701.html'>Asistentes para c&aacute;lculos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1044-2712.html'>Declaraci&oacute;n jurada simple de cesi&oacute;n de beneficio de cr&eacute;dito por gastos en educaci&oacute;n, art.55ter.</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/devolucion-anticipada/informacion'>Anticipo Devoluci&oacute;n impuesto a la renta a&ntilde;o tributario 2020</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1044-2718.html'>Bonificaci&oacute;n Ahorro Previsional Voluntario</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Infracciones, Pago de giros y Condonaciones</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1045-3212.html'>Infracciones</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/pagoGiro/'>Pago de Giros</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>T&eacute;rmino de giro</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='https://www4.sii.cl/sistgiInternet/?opc=dec'>Declarar t&eacute;rmino de giro </a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/sistgiInternet/?opc=con'>Consultar declaraci&oacute;n de t&eacute;rmino de giro </a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/consultaTGIInternet/'>Certificado de t&eacute;rmino de giro emitidos antes del 08/08/2016</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Situaci&oacute;n tributaria</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='https://zeus.sii.cl/cvc/vdc/index.html'>Consultar timbraje de documentos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1047-1690.html'>Consultar y revisar situaci&oacute;n tributaria</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1047-1702.html'>Carpeta tributaria electr&oacute;nica</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1047-1714.html'>N&oacute;minas</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Herencias</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='https://www4.sii.cl/dphiDeclaracionesInternet/'>Declarar Impuesto a las herencias Intestadas (F4423)</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/consdphiInternet/'>Consulta certificado de herencias intestadas (F4423)</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Aval&uacute;os y Contribuciones de bienes ra&iacute;ces</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1048-2623.html'>Contribuciones</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1048-3661.html'>Beneficio para el adulto mayor</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1048-3657.html'>Sobretasa modernizaci&oacute;n tributaria</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1048-3665.html'>Transferencias de bienes ra&iacute;ces</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1048-2569.html'>Aval&uacute;os y certificados</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/destacados/reavaluo/'>Reaval&uacute;o de bienes ra&iacute;ces</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1048-2573.html'>Solicitudes y declaraciones</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/aplicaciones_para_entidades_externas.html'>Aplicaciones para entidades externas</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("						<li><span>Tasaci&oacute;n fiscal de veh&iacute;culos</span>\n");
    document.write("							<ul>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1049-3526.html'>Consulta tasaci&oacute;n de veh&iacute;culos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1049-2612.html'>Tasaci&oacute;n de veh&iacute;culos (bajada de datos)</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1049-2618.html'>Impuesto a emisiones contaminantes veh&iacute;culos nuevos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1049-3527.html'>Resoluciones</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/servicios_online/1049-3137.html'>Declaraci&oacute;n de Veh&iacute;culos Motorizados</a></li>\n");
    document.write("							</ul>\n");
    document.write("						</li>\n");
    document.write("                  </ul>\n");
    document.write("             </li>\n");

   document.write("             <li><a href='http://www.sii.cl/ayudas/'>Ayuda</a></li>\n");
    document.write("             <li><span>Contacto</span>\n");
    document.write("                  <ul>\n");
    document.write("						<li><a href='https://zeus.sii.cl/dii_cgi/calidad/contactenos.cgi?tide_codigo=11&opciones_tide=10o11'>Felicitaciones y sugerencias</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/3042-3045.html'>Orientaci&oacute;n y reclamos</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/3042-3047.html'>Denuncias sobre evasi&oacute;n</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/3042-3044.html'>Mesa de ayuda</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/oficinas/3048-3049.html'>Oficinas y horarios</a></li>\n");
    document.write("                  </ul>\n");
    document.write("             </li>\n");

	document.write("			</ul>\n");
	document.write("		</nav>\n");
	document.write("		<!-- FIN MENU MOVIL --> \n");
	document.write("	</div>\n");
	document.write("</div>\n");
	document.write("<!-- FIN CABECERA MOVIL-->\n");
	document.write("<!-- CABECERA DESKTOP-->\n");
	document.write("<div class='web-sii cabecera hidden-xs'>\n");
	document.write("	<div class='header'>\n");
	document.write("		<nav class='navbar navbar-primary'>\n");
	document.write("			<div class='container'>\n");
	document.write("				<!-- MENU OPCIONES -->\n");
	document.write("				<div id='opciones' class='navbar-collapse collapse' aria-expanded='false'>\n");
	document.write("					<ul class='nav navbar-nav' style='display:block' id='sinAutenticacion'>\n");
	document.write("					   <li class='special'> <a href='"+hostMiSII+"'>Ingresar a Mi Sii</a></li>\n");
	document.write("					</ul>\n");
    document.write("					<ul class='nav navbar-nav usuario' style='display:none' id='conAutenticacion'>\n");
    document.write("					   <li>\n");
    document.write("					      <span class='id'>\n");
    document.write("					         <script>imprimeRutEncabezado();</script><br />\n");
    document.write("					         <span id='lastConexion'></span>\n");
    document.write("					      </span>\n");
    document.write("					   </li>\n");
    document.write("					</ul>\n");
            
	document.write("         			<span class='nav navbar-nav navbar-right hidden-xs' id='cerrar-sesion' style='display:none'>\n");
	document.write("                       <script>imprimeCerrarSesion();</script>\n");
	document.write("                    </span>\n");
			
	document.write("				</div>\n");
	document.write("			</div>\n");
	document.write("		</nav>\n");
	document.write("		<div class='container'>\n");
	document.write("			<h1 class='pull-left hidden-xs logo'><a href='http://homer.sii.cl/' title='Sii - Servicio de impuestos internos'><img src='https://zeusr.sii.cl/admin/responsive/images/logo.jpg' alt='Sii - Servicio de impuestos internos'></a></h1>\n");
	document.write("			<!-- MENU DESKTOP -->\n");
	document.write("			<ul class='dropdown nav navbar-nav hidden-xs' id='main-menu'>\n");
	document.write("				<li style='padding-top: 2px;'><a role='button' href='"+hostMiSII+"'>Mi Sii</a></li>\n");
    document.write("   <li class='dropdown'><a href='http://www.sii.cl/servicios_online/'>Servicios online <i class='fa fa-caret-down' aria-hidden='true'></i></a>\n");
    document.write("      <ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1943-.html'>Clave tributaria y Representantes electr&oacute;nicos</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1031-.html'>RUT e Inicio de actividades</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1125-.html'>Actualizaci&oacute;n de informaci&oacute;n</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1037-.html'>Peticiones Administrativas y otras Solicitudes</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/3598-.html'>Autorizaci&oacute;n de Documentos Tributarios</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1039-.html'>Factura electr&oacute;nica</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1040-.html'>Boletas de honorarios electr&oacute;nicas</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1041-.html'>Libros contables electr&oacute;nicos</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1042-.html'>Impuestos mensuales</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1043-.html'>Declaraciones juradas</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1044-.html'>Declaraci&oacute;n de renta</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1045-.html'>Infracciones, Pago de giros y Condonaciones</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1046-.html'>T&eacute;rmino de giro</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1047-.html'>Situaci&oacute;n tributaria</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/3140-.html'>Herencias</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1048-.html'>Aval&uacute;os y Contribuciones de bienes ra&iacute;ces</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/servicios_online/1049-.html'>Tasaci&oacute;n fiscal de veh&iacute;culos</a></li>\n");
    document.write("                  </ul>\n");
    document.write("             </li>\n");

    document.write("				<li style='padding-top: 2px;'><a role='button' class='#' data-target='#' href='http://www.sii.cl/ayudas/'>Ayuda</a></li>\n");
    document.write("                       <li class='dropdown' role='presentation'> <a aria-expanded='false' aria-haspopup='true' role='button' data-toggle='dropdown' class='dropdown-toggle' href='#' id='drop6'> Contacto <i class='fa fa-caret-down' aria-hidden='true'></i></a>\n");
    document.write("                          <ul aria-labelledby='drop6' class='dropdown-menu' id='menu3'>\n");
    document.write("						<li><a href='https://zeus.sii.cl/dii_cgi/calidad/contactenos.cgi?tide_codigo=11&opciones_tide=10o11'> <i class='fa fa-thumbs-o-up fa-2x' aria-hidden='true'></i> Felicitaciones y sugerencias</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/3042-3045.html'> <i class='fa fa-hand-o-up fa-2x' aria-hidden='true'></i> Orientaci&oacute;n y reclamos</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/3042-3047.html'> <i class='fa fa-exclamation-triangle fa-2x' aria-hidden='true'></i> Denuncias sobre evasi&oacute;n</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/3042-3044.html'> <i class='fa fa-phone fa-2x' aria-hidden='true'></i> Mesa de ayuda</a></li>\n");
    document.write("						<li><a href='http://www.sii.cl/ayudas/asistencia/oficinas/3048-3049.html'> <i class='fa fa-map-marker fa-2x' aria-hidden='true'></i> Oficinas y horarios</a></li>\n");
    document.write("                  </ul>\n");
    document.write("             </li>\n");

	document.write("			</ul>\n");
	document.write("			<!-- FIN MENU DESKTOP --> \n");
	document.write("		</div>\n");

    document.write("        <!-- RASTRO MIGA -->\n");
	document.write("        <div class='container'>\n");
	document.write("           <ol class='breadcrumb' id='miga'>\n");
	document.write("           </ol>\n");
	document.write("        </div>\n");
	document.write("        <!-- FIN RASTRO MIGA -->\n");
	
	document.write("	</div>\n");
	document.write("</div>\n");
	document.write("<!-- FIN CABECERA DESKTOP -->\n");
	
	escribeMiga(par);
}

function mostrarPie(par){
	document.write("<div class='web-sii pie'>\n");
	document.write("  <footer>\n");
	document.write("    <div class='container'>\n");
    if (par!=""){
	document.write("      <div class='row hidden-xs'>\n");
    document.write("        <div class='col-sm-12 col-md-2-5'>\n");
    document.write("           <h3 class='hidden-xs'>Valores y fechas</h3>\n");
    document.write("           <div class='btn btn-block navbar-toggle hidden-sm hidden-md hidden-lg arrow-click' data-target='.pie01' data-toggle='collapse'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Valores y fechas</div>\n");
    document.write("           <ul class='list-unstyled collapse navbar-collapse pie01'>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/uf/uf2020.htm'>UF</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/dolar/dolar2020.htm'>D&oacute;lar</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/utm/utm2020.htm'>UTM-UTA-IPC</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/renta/datos_valores_renta.html'>Datos y valores de Renta</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/iva/datos_valores_iva.html'>Datos y valores de IVA</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/otros_valores/otros_valores.html'>Otros valores</a></li>\n");
    document.write("           </ul>\n");
    document.write("        </div>\n");
    document.write("        <div class='col-sm-12 col-md-2-5'>\n");
    document.write("           <h3 class='hidden-xs'>Normativa y legislaci&oacute;n</h3>\n");
    document.write("           <div class='btn btn-block navbar-toggle hidden-sm hidden-md hidden-lg arrow-click' data-target='.pie02' data-toggle='collapse'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Normativa y legislaci&oacute;n</div>\n");
    document.write("           <ul class='list-unstyled collapse navbar-collapse pie02'>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/circulares/2020/indcir2020.htm'>Circulares</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/resoluciones/2020/res_ind2020.htm'>Resoluciones</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/consultaProyectosNormativosInternet/#Inicio'>Consulta p&uacute;blica de normas</a></li>\n");
    document.write("                               <li><a href='https://www3.sii.cl/normaInternet/'>Administrador de contenido normativo</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/acjui/internet/#/instancia/1'>Administrador de contenido de Jurisprudencia</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/legislacion_tributaria.html'>Legislaci&oacute;n tributaria y convenios internacionales</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/jurisprudencia_y_tribunales.html'>Jurisprudencia y tribunales</a></li>\n");
    document.write("           </ul>\n");
    document.write("        </div>\n");
    document.write("        <div class='col-sm-12 col-md-2-5'>\n");
    document.write("           <h3 class='hidden-xs'>Redes sociales</h3>\n");
    document.write("           <div class='btn btn-block navbar-toggle hidden-sm hidden-md hidden-lg arrow-click' data-target='.pie03' data-toggle='collapse'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Redes sociales</div>\n");
    document.write("           <ul class='list-unstyled collapse navbar-collapse pie03'>\n");
    document.write("                               <li><a href='https://www.facebook.com/impuestosinternoschile/'>Facebook</a></li>\n");
    document.write("                               <li><a href='https://twitter.com/SII_Chile'>Twitter</a></li>\n");
    document.write("                               <li><a href='https://www.youtube.com/user/sii/'>Youtube</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/redes_sociales/rss.html'>RSS</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/ayudas/apps/'>APP&acute;s</a></li>\n");
    document.write("           </ul>\n");
    document.write("        </div>\n");
    document.write("        <div class='col-sm-12 col-md-2-5'>\n");
    document.write("           <h3 class='hidden-xs'>Sitios de inter&eacute;s</h3>\n");
    document.write("           <div class='btn btn-block navbar-toggle hidden-sm hidden-md hidden-lg arrow-click' data-target='.pie04' data-toggle='collapse'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Sitios de inter&eacute;s</div>\n");
    document.write("           <ul class='list-unstyled collapse navbar-collapse pie04'>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_appdoc.html'>Aplicaciones y documentos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_wutiles.html'>Web &uacute;tiles</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_sgob.html'>Sitios de gobierno relacionados</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_orgrelacionados.html'>Organismos relacionados</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/asuntos_internacionales/'>Intercambios de Informaci&oacute;n - Est&aacute;ndar CRS</a></li>\n");
    document.write("           </ul>\n");
    document.write("        </div>\n");
    document.write("        <div class='col-sm-12 col-md-2-5'>\n");
    document.write("           <h3 class='hidden-xs'>Sobre el SII</h3>\n");
    document.write("           <div class='btn btn-block navbar-toggle hidden-sm hidden-md hidden-lg arrow-click' data-target='.pie05' data-toggle='collapse'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Sobre el SII</div>\n");
    document.write("           <ul class='list-unstyled collapse navbar-collapse pie05'>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/nuestro_servicio.htm'>Nuestro Servicio</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/trabaja_con_nosotros.html'>Trabaja con nosotros</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/gestion_y_estadisticas.html'>Gesti&oacute;n y estad&iacute;sticas</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/terminos_sitio_web.html'>T&eacute;rminos de uso del sitio web</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/recomendaciones_seguridad.htm'>Recomendaciones de seguridad</a></li>\n");
    document.write("           </ul>\n");
    document.write("        </div>\n");

	document.write("      </div>\n");
		
	document.write("      <div class='row visible-xs'>\n");
	document.write("         <div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>\n");
    document.write("              <div class='panel panel-default'>\n");
    document.write("                 <div class='panel-heading' role='tab' id='heading01'>\n");
    document.write("                    <h4 class='panel-title'>\n");
    document.write("                       <a class='arrow-click collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse01' aria-expanded='true' aria-controls='collapse01'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Valores y fechas</a>\n");
    document.write("                    </h4>\n");
    document.write("                 </div>\n");
    document.write("                 <div id='collapse01' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading01'>\n");
    document.write("                    <div class='panel-body'>\n");
    document.write("                       <ul class='list-unstyled'>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/uf/uf2020.htm'>UF</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/dolar/dolar2020.htm'>D&oacute;lar</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/utm/utm2020.htm'>UTM-UTA-IPC</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/renta/datos_valores_renta.html'>Datos y valores de Renta</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/iva/datos_valores_iva.html'>Datos y valores de IVA</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/valores_y_fechas/otros_valores/otros_valores.html'>Otros valores</a></li>\n");
    document.write("                       </ul>\n");
    document.write("                    </div>\n");
    document.write("                 </div>\n");
    document.write("              </div>\n");
    document.write("              <div class='panel panel-default'>\n");
    document.write("                 <div class='panel-heading' role='tab' id='heading02'>\n");
    document.write("                    <h4 class='panel-title'>\n");
    document.write("                       <a class='arrow-click collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse02' aria-expanded='true' aria-controls='collapse02'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Normativa y legislaci&oacute;n</a>\n");
    document.write("                    </h4>\n");
    document.write("                 </div>\n");
    document.write("                 <div id='collapse02' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading02'>\n");
    document.write("                    <div class='panel-body'>\n");
    document.write("                       <ul class='list-unstyled'>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/circulares/2020/indcir2020.htm'>Circulares</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/resoluciones/2020/res_ind2020.htm'>Resoluciones</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/consultaProyectosNormativosInternet/#Inicio'>Consulta p&uacute;blica de normas</a></li>\n");
    document.write("                               <li><a href='https://www3.sii.cl/normaInternet/'>Administrador de contenido normativo</a></li>\n");
    document.write("                               <li><a href='https://www4.sii.cl/acjui/internet/#/instancia/1'>Administrador de contenido de Jurisprudencia</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/legislacion_tributaria.html'>Legislaci&oacute;n tributaria y convenios internacionales</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/normativa_legislacion/jurisprudencia_y_tribunales.html'>Jurisprudencia y tribunales</a></li>\n");
    document.write("                       </ul>\n");
    document.write("                    </div>\n");
    document.write("                 </div>\n");
    document.write("              </div>\n");
    document.write("              <div class='panel panel-default'>\n");
    document.write("                 <div class='panel-heading' role='tab' id='heading03'>\n");
    document.write("                    <h4 class='panel-title'>\n");
    document.write("                       <a class='arrow-click collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse03' aria-expanded='true' aria-controls='collapse03'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Redes sociales</a>\n");
    document.write("                    </h4>\n");
    document.write("                 </div>\n");
    document.write("                 <div id='collapse03' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading03'>\n");
    document.write("                    <div class='panel-body'>\n");
    document.write("                       <ul class='list-unstyled'>\n");
    document.write("                               <li><a href='https://www.facebook.com/impuestosinternoschile/'>Facebook</a></li>\n");
    document.write("                               <li><a href='https://twitter.com/SII_Chile'>Twitter</a></li>\n");
    document.write("                               <li><a href='https://www.youtube.com/user/sii/'>Youtube</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/redes_sociales/rss.html'>RSS</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/ayudas/apps/'>APP&acute;s</a></li>\n");
    document.write("                       </ul>\n");
    document.write("                    </div>\n");
    document.write("                 </div>\n");
    document.write("              </div>\n");
    document.write("              <div class='panel panel-default'>\n");
    document.write("                 <div class='panel-heading' role='tab' id='heading04'>\n");
    document.write("                    <h4 class='panel-title'>\n");
    document.write("                       <a class='arrow-click collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse04' aria-expanded='true' aria-controls='collapse04'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Sitios de inter&eacute;s</a>\n");
    document.write("                    </h4>\n");
    document.write("                 </div>\n");
    document.write("                 <div id='collapse04' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading04'>\n");
    document.write("                    <div class='panel-body'>\n");
    document.write("                       <ul class='list-unstyled'>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_appdoc.html'>Aplicaciones y documentos</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_wutiles.html'>Web &uacute;tiles</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_sgob.html'>Sitios de gobierno relacionados</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sitios_de_interes/sinteres_orgrelacionados.html'>Organismos relacionados</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/asuntos_internacionales/'>Intercambios de Informaci&oacute;n - Est&aacute;ndar CRS</a></li>\n");
    document.write("                       </ul>\n");
    document.write("                    </div>\n");
    document.write("                 </div>\n");
    document.write("              </div>\n");
    document.write("              <div class='panel panel-default'>\n");
    document.write("                 <div class='panel-heading' role='tab' id='heading05'>\n");
    document.write("                    <h4 class='panel-title'>\n");
    document.write("                       <a class='arrow-click collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse05' aria-expanded='true' aria-controls='collapse05'><span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>Sobre el SII</a>\n");
    document.write("                    </h4>\n");
    document.write("                 </div>\n");
    document.write("                 <div id='collapse05' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading05'>\n");
    document.write("                    <div class='panel-body'>\n");
    document.write("                       <ul class='list-unstyled'>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/nuestro_servicio.htm'>Nuestro Servicio</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/trabaja_con_nosotros.html'>Trabaja con nosotros</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/gestion_y_estadisticas.html'>Gesti&oacute;n y estad&iacute;sticas</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/terminos_sitio_web.html'>T&eacute;rminos de uso del sitio web</a></li>\n");
    document.write("                               <li><a href='http://www.sii.cl/sobre_el_sii/recomendaciones_seguridad.htm'>Recomendaciones de seguridad</a></li>\n");
    document.write("                       </ul>\n");
    document.write("                    </div>\n");
    document.write("                 </div>\n");
    document.write("              </div>\n");

	document.write("         </div>\n");
	document.write("      </div>\n");
	}else{
        document.write("      <div style='width:100%;text-align:center'><a href='http://homer.sii.cl/'>Servicio de Impuestos Internos</a></div>");
	}
	document.write("    </div>\n");
	document.write("  </footer>\n");

	document.write("</div>\n");

	//document.write("<script src='https://zeusr.sii.cl/admin/responsive/js/general.js'></script>\n");
	//document.write("<script src='https://zeusr.sii.cl/admin/responsive/js/functions.js'></script>\n");

}

//setCookie("impDig", "", -1, "/", "sii.cl");

