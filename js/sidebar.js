function misii_sidebar(){

var strSidebar = "";

strSidebar += '<div id="sidebar">';
strSidebar += '<div id="tools">';

strSidebar += '<div id="box_daynight">';
strSidebar += '<div class="font_title">Contraste</div>';
strSidebar += '<div class="clearfix"></div>';
strSidebar += '<label class="switch">';
strSidebar += '<input id="contraste" type="checkbox" checked="">';
strSidebar += '<span class="slider round"></span>';
strSidebar += '</label>';
strSidebar += '</div>';

strSidebar += '<div id="box_sizefont">';
strSidebar += '<div class="font_title">Tamaño letra</div>';
strSidebar += '<div class="clearfix"></div>';
strSidebar += '<button id="font_down">A-</button>';
strSidebar += '<button id="font_up">A+</button>';
strSidebar += '</div>';
strSidebar += '</div>';

strSidebar += '<ul>';

strSidebar += '<a href="#" class="btn_sidebar" id="menu_home">';
strSidebar += '<li class="selected">';
strSidebar += '<div class="icono_sidebar"></div>';
strSidebar += '<div class="clearfix"></div>';
strSidebar += '<span>Inicio</span>';
strSidebar += '</li>';
strSidebar += '</a>';

strSidebar += '<a href="#" class="btn_sidebar" id="menu_datos_contribuyente">';
strSidebar += '<li>';
strSidebar += '<div class="icono_sidebar"></div>';
strSidebar += '<div class="clearfix"></div>';
strSidebar += '<span>Datos personales y tributarios</span>';
strSidebar += '</li>';
strSidebar += '</a>';

strSidebar += '<a href="#" class="btn_sidebar" id="menu_tramites_en_linea">';
strSidebar += '<li>';
strSidebar += '<div class="icono_sidebar"></div>';
strSidebar += '<div class="clearfix"></div>';
strSidebar += '<span>Tr&aacute;mites en l&iacute;nea</span>';
strSidebar += '</li>';
strSidebar += '</a>';

strSidebar += '<a href="#" class="btn_sidebar" id="menu_expediente">';
strSidebar += '<li>';
strSidebar += '<div class="icono_sidebar"></div>';
strSidebar += '<div class="clearfix"></div>';
strSidebar += '<span>Expediente Electrónico</span>';
strSidebar += '</li>';
strSidebar += '</a>';

strSidebar += '<a href="#" class="btn_sidebar" id="menu_comunicados_sii">';
strSidebar += '<li>';
strSidebar += '<div class="icono_sidebar"></div>';
strSidebar += '<div class="clearfix"></div>';
strSidebar += '<span>SII te informa</span>';
strSidebar += '</li>';
strSidebar += '</a>';

strSidebar += '</ul>';

strSidebar += '<div class="clearfix"></div>';
strSidebar += '</div>';

var strADDSidebar = document.getElementById("box_left");
strADDSidebar.insertAdjacentHTML("afterbegin", strSidebar);

}

