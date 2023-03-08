function giveMeColor(numero) {
    switch (numero) {
        case 0:
            //red
            badgeColorDDJJ = '#e22c2c'
            break;
        case 1:
            //yellow
            badgeColorDDJJ = '#ffc000'
            break;
        case 2:
            //bluesky
            badgeColorDDJJ = '#3ca1b7'
            break;
        case 4:
            //gris
            badgeColorDDJJ = '#435772'
            break;
        default:
            break;
    }
    return badgeColorDDJJ;
}
function leeObligaciones() {
    $("#contenidoObligaciones").empty();
    return;
    data1 = 0;
    data2 = 1;
    $.ajax({
        type: "post",
        url: "/cgi_misii/CViewCarta.cgi",
        crossDomain: true,
        data: { "year": 0, "opc": 30, "VIEW": 1 },
        dataType: "json",
        beforeSend: function () { },
        error: function () {
            alert("Error");
        },
        success: function (resp) {
            // Descomentar cuando este listo el servicio
            // declaraciones = resp.data.declaraciones;

            declaraciones = [
                {
                    'formulario': 'F29',
                    'nombre': 'ejemplo',
                    'fechaVencimiento': '11/11/2019',
                    'vigente': 'S'
                },
                {
                    'formulario': 'ningún formulario asociado',
                    'nombre': 'ningún formulario asociado',
                    'fechaVencimiento': 'fecha no disponible',
                    'vigente': 'S'
                }, {
                    'formulario': 'ningún formulario asociado',
                    'nombre': 'ningún formulario asociado',
                    'fechaVencimiento': 'fecha no disponible',
                    'vigente': 'S'
                }, {
                    'formulario': 'ningún formulario asociado',
                    'nombre': 'ningún formulario asociado',
                    'fechaVencimiento': 'fecha no disponible',
                    'vigente': 'S'
                }
            ];
            console.log('tamaño=> ' + declaraciones.length);
            console.log(declaraciones);

            var tr = "";
            for (var i = 0; i < declaraciones.length; i++) {
                var aux = " <tr>"
                    + " <td class='thdj'>" + declaraciones[i].formulario + "</td>"
                    + " <td>" + declaraciones[i].nombre + "</td>"
                    + " <td>" + declaraciones[i].fechaVencimiento + "</td>"
                    + " <td>" + declaraciones[i].vigente + "</td>"
                    + " </tr>";
                tr = tr + aux;
            }
            console.log(tr);
            console.log(resp);
            console.log(giveMeColor(declaraciones.length))
            var tableDDJJ = "<table style='width: 100%;'class='table-bordered row-border table-condensed panel-tabla tb'>"
                + "<thead>"
                + "<tr>"
                + "<th class='thdj'>Formulario</th>"
                + "<th class='thdj'>Nombre</th>"
                + "<th class='thdj'>Fecha Vencimiento</th>"
                + "<th class='thdj'>Vigencia</th>"
                + "</tr>"
                + "</thead>"
                + "<tbody>"
                + tr
                + " </tbody>"
                + " </table>"

            var strHtml = "<div id='principal'>"
                + "<h4><i class='iconoo fa fa-list-alt'></i> Tus responsabilidades Tributarias <div class='lista'><ul class='list-inline'><li>Sin observaciones<div class='ss' style='background:#435772'></div></li><li>Dentro del plazo <div class='ss'style='background:#3ca1b7'></div></li>"
                + "<li>Un incumplimiento <div class='ss'style='background:#ffc000'></div></li>"
                + "<li>Todas incumplidas <div class='ss'style='background:#e22c2c'></div></li></ul></div></h4><br/>"
                + "<div id='tabs'>"
                + "<ul>"
                + "<li><a href='#tabs-1'>Registro de Actividades <span class='my-badge' style='background:" + giveMeColor(0) + ";'>" + 0 + "</span><div class='foot' style='background:" + giveMeColor(0) + ";'></a></li>"
                + "<li><a href='#tabs-2'>Información tributaria<span class='my-badge' style='background:" + giveMeColor(declaraciones.length) + ";'>" + declaraciones.length + "</span><div class='foot' style='background:" + giveMeColor(declaraciones.length) + ";'></a></li>"
                + "<li><a href='#tabs-3'>Declaraciones<span class='my-badge' style='background:" + giveMeColor(1) + ";'>" + 1 + "</span><div class='foot'style='background:" + giveMeColor(1) + ";'></a></li>"
                + "<li><a href='#tabs-3'>Pagos<span class='my-badge' style='background:" + giveMeColor(2) + ";'>" + 2 + "</span><div class='foot'style='background:" + giveMeColor(2) + ";'></a></li>"
                + "</ul>"
                + "<div id='tabs-1'>"
                + "</div>"
                + "<div id='tabs-2'>"
                + tableDDJJ
                + "<button class='btn btn-primary btn-ddjj'>Ir a Declaraciones Juradas</button>"
                + "</div>"
                + "<div id='tabs-3'>"

                + "</div>"
                + "</div>"
                + "</div>"
            if (resp != null) {
                + "rut consultado " + resp.data.nodecRut;
                + "rut consultado ${resp.data.nodecRut}";
                $("#contenidoObligaciones").append(strHtml);

                $("#tabs").tabs();
            }



            $("#contenidoObligaciones").append(data);
        }
    });

}

