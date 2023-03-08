angular.module('mapas_content_Module')
//
.controller('mapas_contentController', function($rootScope, $scope, $location, $cookies, $uibModal, $routeParams, mapas_facadeService) {
    // Capa predial
    $scope.siiPredioLayer = undefined;
    $scope.siiAhLayer = undefined;
    $scope.overlays = [];
    $scope.marker = undefined;
    $scope.comunaActual = undefined;
    $scope.nombreComunaActual = undefined;
    $scope.eacActual = undefined;
    $scope.eacanoActual = undefined;
    $scope.servicioPredio = undefined;
    $scope.isPredioLoaded = false;
    $scope.siilat = -33.4420845;
    $scope.siilng = -70.6547042;
    $scope.siizoom = 17;
    $scope.lat = -33.4420845;
    $scope.lng = -70.6547042;
    $scope.zoom = 17;
    $scope.maxZoom = 19;
    $scope.date = new Date();
    $scope.prot = $location.protocol();
	$scope.clickDeshabilitado = false;

    // ORANGE MARKER
    $scope.orangeIcon = L.icon({
        iconUrl: '/mapasui/common/leaflet/images/orange-marker-icon.png',
        iconSize: [33, 41],
        iconAnchor: [19, 40],
        popupAnchor: [-2, -39],
        shadowUrl: '/mapasui/common/leaflet/images/marker-shadow.png',
        shadowSize: [33, 41],
        shadowAnchor: [8, 50]
    });
    // MAPA BASE [OSM]
    var openStreetMaps = L.tileLayer($scope.prot + '://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution : 'Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors',
        maxZoom: $scope.maxZoom
    });
    // MAPA BASE [EN BLANCO]
    function blank() {
        var layer = new L.Layer();
        layer.onAdd = layer.onRemove = function() {};
        return layer;
    }
    // MAPAS BASE
    var baseLayers = {
        "Open Street Maps" : openStreetMaps,
        "Sin Mapa Base": blank()
    };
    // MAPA BASE POR DEFECTO
    $scope.mapabase = L.map('mapaid', {
        center : [ $scope.siilat, $scope.siilng ],
        zoom : $scope.siizoom,
        maxZoom : $scope.maxZoom,
        layers : [ openStreetMaps ]
    });
    $scope.mapabase.on('resize', function(e) {
        setTimeout(function() {
            $scope.mapabase.invalidateSize();
        }, 750);
    });
    $scope.mapabase.on('zoomend', function(e) {
        setTimeout(function() {
            $scope.mapabase.invalidateSize();
        }, 750);
    });
    $scope.mapabase.on('moveend', function(e) {
        setTimeout(function() {
            $scope.mapabase.invalidateSize();
        }, 750);
    });

    $scope.mapabase.attributionControl.setPrefix('');

    $scope.loading = L.Control.loading({
        separate: true
    });
    $scope.loading.addTo($scope.mapabase);
    // MARCADOR SII
    $scope.siiMarker = L.marker([ $scope.siilat, $scope.siilng ])
        .addTo($scope.mapabase)
        .bindPopup('<b>Servicio de Impuestos Internos</b>').openPopup();
    $scope.siiMarker.on('click', function(e) {
        $scope.mapabase.removeLayer($scope.siiMarker);
    });

    $scope.siiControl = L.control.layers(baseLayers);
    $scope.siiControl.addTo($scope.mapabase);

    // CAPA LIMITES COMUNALES
    var limiteComunalLayer = L.tileLayer.wms('/mapasui/services/ui/wmsProxyService/call', {
        layers : 'sii:BR_CART_LIMITE_COMUNAL',
        request : 'GetMap',
        transparent : true,
        styles: 'LIMITE_COMUNAL_V0',
        format : 'image/png',
        zIndex : 1000,
        updateWhenIdle : true,
        updateWhenZooming : false,
        updateInterval : 2000,
        maxZoom : $scope.maxZoom
    });
    limiteComunalLayer.addTo($scope.mapabase);
    $scope.siiControl.addOverlay(limiteComunalLayer, 'Límite Comunal').addTo($scope.mapabase);
    
    // Obtiene la info
    $scope.mapabase.on('click', function(e) {
        if (!$scope.clickDeshabilitado) {
            //$rootScope.$broadcast('bloquearBusqueda');
            $rootScope.$emit('limpiarPredioMapa');
            $rootScope.$emit('clickMapa');
            $rootScope.$emit('hideRightNav');
            if ($scope.comunaActual) {
                $rootScope.$broadcast('bloquearBusqueda');
                if ($scope.servicioPredio && $scope.servicioPredio[0].comuna == $scope.comunaActual) {
                    $scope.getInfoPredio(e, $scope.servicioPredio[0].layer);   // AQUI ENTRA CUANDO LA COMUNA ES LA MISMA
                } else {
                    var request = {
                        "comuna" : $scope.comunaActual,
                        "eac" : -1,
                        "tokenARSII": $cookies.ARSII_AVA_RECURSO
                    };
                    mapas_facadeService.getServicioPredio(request).then(function(response) {
                        if ($rootScope.checkResponse(response) && !$rootScope.isNullOrEmpty(response.data)) {
                            $scope.servicioPredio = response.data;
                            $scope.getInfoPredio(e, $scope.servicioPredio[0].layer);  // AQUI ENTRA CUANDO LA COMUNA ES DISTINTA
                            if (response.data.length > 1) {
                                //var dataServicioAh = {
                                //    "servicio": response.data[1],
                                //    "comuna": {"nombre":$scope.nombreComunaActual},
                                //    "eac" : {"eac": $scope.eacActual},
                                //    "eacano" : {"eacano": $scope.eacanoActual}
                                //}
                                var dataServicioAh = {
                                        "servicio": response.data[1],
                                        "comuna": {"nombre":$scope.nombreComunaActual},
                                        "eac" : {"eac": response.data[1].eac},
                                        "eacano" : {"eacano": response.data[1].eacano}
                                }
                                $rootScope.$emit('cargarCapa',dataServicioAh);
                            }
                        }
                    });
                }
            }
        }
    });

    $rootScope.$on('bloquearBusqueda', function() {
        $scope.clickDeshabilitado = true;
    });

    $rootScope.$on('habilitarBusqueda', function() {
        $scope.clickDeshabilitado = false;
    });

    $rootScope.getServiciosVisibles = function() {
    	var servicios = [];
        for (var i = 0; i< $scope.overlays.length; ++i) {
        	servicios.push({
                'comuna': $scope.overlays[i].layer.options.comuna,
                'layer': $scope.overlays[i].layer.options.layers,
                'style': $scope.overlays[i].layer.options.styles,
                'eac': $scope.overlays[i].layer.options.eac,
                'eacano' : $scope.overlays[i].layer.options.eacano
            });
        }
        return servicios;
    };
    
    $rootScope.getMaxEac = function() {
        var eac = 0;
        for (var i = 0; i< $scope.overlays.length; ++i) {
        	if ($scope.overlays[i].layer.options.eac > 0) {
        		eac = $scope.overlays[i].layer.options.eac;
        	}
        }
        return eac;
    };
    
    $rootScope.getMaxEacano = function() {
        var eacano = 0;
        for (var i = 0; i< $scope.overlays.length; ++i) {
        	if ($scope.overlays[i].layer.options.eacano > 0) {
        		eacano = $scope.overlays[i].layer.options.eacano;
        	}
        }
        return eacano;
    };
    
    $scope.getInfoPredio = function(e, layer) {
    	var servicios = $rootScope.getServiciosVisibles();
        var request = {
            "clickInfo" : {
                'x' : e.containerPoint.x,
                'y' : e.containerPoint.y,
                'southwestx' : $scope.mapabase.getBounds().getSouthWest().lat,
                'southwesty' : $scope.mapabase.getBounds().getSouthWest().lng,
                'northeastx' : $scope.mapabase.getBounds().getNorthEast().lat,
                'northeasty' : $scope.mapabase.getBounds().getNorthEast().lng,
                'layer' : layer,
                'width' : $scope.mapabase.getSize().x,
                'height' : $scope.mapabase.getSize().y,
                "servicios" : servicios,
                'tokenARSII' : $rootScope.valorCookie
            },
            "tokenARSII" : $cookies.ARSII_AVA_RECURSO
        };
        mapas_facadeService.getFeatureInfo(request).then(function(response) {
            $rootScope.$broadcast('habilitarBusqueda');
            if ($rootScope.checkResponse(response) && !$rootScope.isNullOrEmpty(response.data)) {
            	 var predio = response.data;
                 if (predio.existePredio != -1) {
                     //$rootScope.$emit('clickCapa', predio, predio.eacs, request);
                	 $rootScope.$emit('clickCapa', predio, predio.eacs, predio.eacano, request);
                 }
                 else {
               	    var eac = $rootScope.getMaxEac();
               	    var eacano = $rootScope.getMaxEacano();
               	    if (eac == 0) {
                       var msg = 'No existe información para la ubicación seleccionada o no ha cargado capas disponibles en la comuna';
                       //var msg = 'No existe información para el predio seleccionado';
                       //$rootScope.$emit('callAlert', msg);
                       $rootScope.$emit('clickCapaSP', predio, eac, eacano, request);
               	    }
               	    else {
                       //alert("eac seleccionado1 : " + eac)
                	   //$rootScope.$emit('clickCapa', predio, eac, request);
                	   $rootScope.$emit('clickCapaSP', predio, eac, eacano, request);
               	    }
                 }
            }
            else {
           	    var eac = $rootScope.getMaxEac();
           	    var eacano = $rootScope.getMaxEacano();
           	    if (eac == 0) {
                   var msg = 'No existe información para la ubicación seleccionada o no ha cargado capas disponibles en la comuna';
                   //var msg = 'No existe información para el predio seleccionado';
                   //$rootScope.$emit('callAlert', msg);
                   $rootScope.$emit('clickCapaSP', predio, eac, eacano, request);
           	    }
           	    else {
                   //alert("eac seleccionado2 : " + eac)
            	   //$rootScope.$emit('clickCapa', predio, eac, request);
            	   $rootScope.$emit('clickCapaSP', predio, eac, eacano, request);
           	    }
            }
        });
    };
    // Cambia el centro y zoom del mapa base
    $scope.changeMapView = function(latitud, longitud, zoom) {
        if (latitud && longitud) {
            $scope.lat = latitud;
            $scope.lng = longitud;
            $scope.zoom = zoom;
        }
        $scope.mapabase.setView([ $scope.lat, $scope.lng ], $scope.zoom);
        if ($scope.zoom == undefined) {
        	$scope.mapabase.fitBounds([[ $scope.lat, $scope.lng ]],20);
        }
    };

    $scope.setLastMapView = function() {
        $scope.mapabase.setView([ $scope.lat, $scope.lng ], $scope.zoom);
    };

    $rootScope.$on('setPosition', function(event, data) {
    	$scope.changeMapView(data.latitud, data.longitud, data.zoom);
    });

    $rootScope.$on('setMapa', function(event, data) {
        if (data[0].eac != null && data[0].comuna != null && data[0].ah != null && data[0].url != null && data[0].layer != null && data[0].style != null) {
            $scope.siiAhLayer = L.tileLayer.wms(data[0].url, {
                layers : data[0].layer,
                request : 'GetMap',
                transparent : true,
                styles: data[0].style,
                format : 'image/png',
                updateWhenIdle : true,
                updateWhenZooming : false,
                updateInterval : 2000,
                maxZoom : $scope.maxZoom,
                eac : data[0].eac,
                eacano : data[0].eacano,
                cm : data[0].comuna,
                ah : data[0].ah
            });
            $scope.siiAhLayer.addTo($scope.mapabase);
            $scope.siiControl.addOverlay($scope.siiAhLayer, "Área Homogénea seleccionada").addTo($scope.mapabase);
        }
        if (data[0].rol != null) {
            $scope.marker = L.marker([ data[0].latitud, data[0].longitud ], { icon : $scope.orangeIcon });
            $scope.marker.addTo($scope.mapabase).bindPopup('<font size="2"><b>Rol Predial: </b>' + data[0].rol + '</font><br><font size="1"><center>' + data[0].latitud + ' &nbsp; ' + data[0].longitud + '</center></font>').openPopup();
            $scope.marker.on('click', function(e) {
                $rootScope.$emit('mostrarDetalleClickMarker');
            });
        }
        $scope.eacActual = data[0].eac;
        $scope.eacanoActual = data[0].eacano;
    });
    
    $rootScope.$on('getMapKey', function(event, data) {
        $scope.mapKey = undefined;
		$scope.mapKey = '/mapasui/services/ui/wmsProxyService/callMapKey/layer/' + data.layer + '/' + data.style;
		$scope.mapLabel = data.nombreServicio;
        $("#modal-leyenda").modal({
            backdrop : false
        });
    });

    $rootScope.$on('limpiarPredioMapa', function(event) {
    	if ($scope.marker) {
    		$scope.mapabase.removeLayer($scope.marker);
    		$scope.marker = undefined;
    	}
        if ($scope.isPredioLoaded) {
            $scope.siiControl.removeLayer($scope.siiPredioLayer);
            $scope.mapabase.removeLayer($scope.siiPredioLayer);
            $scope.siiPredioLayer = undefined;
            $scope.isPredioLoaded = false;
            $scope.setLastMapView();
        }
        if ($scope.siiAhLayer) {
            $scope.siiControl.removeLayer($scope.siiAhLayer);
            $scope.mapabase.removeLayer($scope.siiAhLayer);
            $scope.siiAhLayer = undefined;
        }
    });

    $rootScope.$on('loadLayer', function(event, data) {
        var foundlayer = undefined;
        if ($scope.comunaActual && data[0].comuna != $scope.comunaActual) {
            while ($scope.overlays.length > 0) {
                var overlay = $scope.overlays.pop();
                $scope.siiControl.removeLayer(overlay.layer);
                $scope.mapabase.removeLayer(overlay.layer);
                var removedlayer = { "layer" : overlay.layer.wmsParams.layers,
                					 "style": overlay.layer.wmsParams.styles,
                					 "eac" : overlay.layer.wmsParams.eac,
                					 "eacano" : overlay.layer.wmsParams.eacano
                				};
                $rootScope.$emit('removeElm', removedlayer);
            }
        }
        else {
        	if ($scope.comunaActual && data[0].comuna == $scope.comunaActual) {
        		for (var i =0; i< $scope.overlays.length; ++i){
        			if ($scope.overlays[i].layer.wmsParams.layers == data[0].layer &&
        				$scope.overlays[i].layer.wmsParams.styles == data[0].style &&
        				$scope.overlays[i].layer.wmsParams.eac	  == data[0].eac &&
        				$scope.overlays[i].layer.wmsParams.eacano == data[0].eacano) {
        				foundlayer = $scope.overlays[i].layer;
        			}
        		}
        	}
        }
        if (!foundlayer) {
            var wmsLayer = L.tileLayer.wms(data[0].url, { 
                layers : data[0].layer,
                request : 'GetMap',
                transparent : true,
                styles : data[0].style,
                format : 'image/png',
                updateWhenIdle : true,
                updateWhenZooming : false,
                updateInterval : 2000,
                maxZoom : $scope.maxZoom,
                comuna : data[0].comuna,
                eac : data[0].eac,
                eacano : data[0].eacano
            });
            wmsLayer.addTo($scope.mapabase);
            //$scope.siiControl.addOverlay(wmsLayer, data[0].nombreComuna + ' - ' + data[0].nombreServicio).addTo($scope.mapabase);
            $scope.comunaActual = data[0].comuna;
            $scope.nombreComunaActual = data[0].nombreComuna;
            //$scope.eacActual = data[0].eac;
            //$rootScope.eacActualX = data[0].eac;
            var overlay = {
                "layer" : wmsLayer,
                "orden" : data[0].orden
            };
            $scope.overlays.push(overlay);
            $rootScope.addCapa = true;
            $rootScope.$emit('addElm', data);
            if ($rootScope.addCapa) {
               $scope.siiControl.addOverlay(wmsLayer, data[0].nombreComuna + ' - ' + data[0].nombreServicio).addTo($scope.mapabase);
            }
            orderLayers();
        	var codigoC2 = 6906639;
        	var accion = 'bbrr.internet.mapas.' + data[0].region;
        	//$scope.paramDAX = 'http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2&c2='+codigoC2+'&ns_site='+$rootScope.ambDax+'&name='+accion;
        	//udm_($scope.paramDAX);
        }
        if ($scope.overlays.length == 0) {
            $scope.comunaActual = undefined;
            $scope.nombreComunaActual = undefined;
        }
    });

    $rootScope.$on('reload', function(event) {
        setTimeout(function() {
            $scope.mapabase.invalidateSize();
        }, 750);
    });
    
    $rootScope.$on('changeView', function(event, data) {    
    	$scope.changeMapView(data.latitud, data.longitud, data.zoom);
    });
    
    $rootScope.$on('removeLayer', function(event, data) { 
    	var overlay = undefined;
    	//buscar en que parte del arreglo esta el layer a remover
    	for (var i =0; i< $scope.overlays.length; ++i){
    		if ($scope.overlays[i].layer.wmsParams.layers == data[0].layer &&
    			$scope.overlays[i].layer.wmsParams.styles == data[0].style &&
    			$scope.overlays[i].layer.wmsParams.eac == data[0].eac &&
    			$scope.overlays[i].layer.wmsParams.eacano == data[0].eacano){
				overlay = $scope.overlays[i];
		    }
    	}
    	//remueve el layer que coincide con el servicio
    	$scope.siiControl.removeLayer(overlay.layer);
        $scope.mapabase.removeLayer(overlay.layer);
        var index = $scope.overlays.indexOf(overlay);
        $scope.overlays.splice(index, 1);
        var removedlayer = { "layer" : data[0].layer,
				  			 "style": data[0].style,
				  			 "eac" : data[0].eac,
        					 "eacano" : data[0].eacano};
        $rootScope.$emit('removeElm', removedlayer);
        if ($scope.overlays.length == 0) {
            $scope.comunaActual = undefined;
            $scope.nombreComunaActual = undefined;
            $scope.eacActual = undefined;
            $scope.eacanoActual = undefined;
        }
    });
   
    function orderLayers (){
        // recorreremos todos los elementos hasta n-1
        for (i = 0; i < $scope.overlays.length; i++) {
            // recorreremos todos los elementos hasta n-i, tomar en cuenta los
            // ultimos no tiene caso ya que ya estan acomodados.
            for (j = 1; j < ($scope.overlays.length - i); j++) {
                // comparamos
                if ($scope.overlays[j - 1].orden > $scope.overlays[j].orden) {
                    // guardamos el numero mayor en el auxiliar
                    aux = $scope.overlays[j - 1];
                    // guardamos el numero menor en el lugar correspondiente
                    $scope.overlays[j - 1] = $scope.overlays[j];
                    // asignamos el auxiliar en el lugar correspondiente
                    $scope.overlays[j] = aux;
                }
            }
        }
        // una vez ordenados, enviamos al frente de menor a mayor
        for (i = 0; i < $scope.overlays.length; i++) {
            $scope.overlays[i].layer.bringToFront();
        }
        return $scope.overlays;
    };
});