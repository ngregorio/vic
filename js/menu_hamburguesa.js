function misii_hamburguesa(){
var strHamb = "";
strHamb += '<nav id="my-menu">';
strHamb += '<ul>';
strHamb += '<ul class="titulo-navbar">';
strHamb += '<li class="mm-title">Mi Sii</li>';
strHamb += '</ul>';
strHamb += '<li>';
strHamb += '<a id="hmenu_home" class="btn_hamburguesa" href="#"><span>Inicio</span></a>';
strHamb += '</li>';
strHamb += '<li>';
strHamb += '<a id="hmenu_datos_contribuyente" class="btn_hamburguesa" href="#"><span>Datos Personales y tributarios</span></a>';
strHamb += '</li>';
strHamb += '<li id="hmenu_tramites_en_linea" class="btn_hamburguesa"><span>Tr&aacute;mites en L&iacute;nea</span>';
strHamb += '<ul>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1943-.html">Clave tributaria y Representantes electrónicos</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1031-.html">RUT e Inicio de actividades</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1125-.html">Actualización de información</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1037-.html">Peticiones Administrativas y otras Solicitudes</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/3598-.html">Autorización de Documentos Tributarios</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1039-.html">Factura electrónica</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1040-.html">Boletas de honorarios electrónicas</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1041-.html">Libros contables electrónicos</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1042-.html">Impuestos mensuales</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1043-.html">Declaraciones juradas</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1044-.html">Declaración de renta</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1045-.html">Infracciones, Pago de giros y Condonaciones</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1046-.html">Término de giro</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1047-.html">Situación tributaria</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/3140-.html">Herencias</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1048-.html">Avalúos y Contribuciones de bienes raíces</a></li>';
strHamb += '<li><a target="_blank" href="http://www.sii.cl/servicios_online/1049-.html">Tasación fiscal de vehículos</a></li>';
strHamb += '</ul>';
strHamb += '</li>';
strHamb += '<li>';
strHamb += '<a id="hmenu_expediente" class="btn_hamburguesa" href="#"><span>Expediente Electrónico</span></a>';
strHamb += '</li>';
strHamb += '<li>';
strHamb += '<a id="hmenu_comunicados_sii" class="btn_hamburguesa" href="#"><span>SII te informa</span></a>';
strHamb += '</li>';
strHamb += '</ul>';
strHamb += '</nav>';

var strADDhamb = document.getElementById("my-wrapper");
strADDhamb.insertAdjacentHTML("beforebegin", strHamb);

}