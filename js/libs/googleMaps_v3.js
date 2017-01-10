function googleMaps(canvas)
{	
	var _root=this;	
	//motoModsGoogleMaps
	this.id="AIzaSyA_ffnO7T7LfFusgSnjqEWG55ncMPxTsE4"; //id api v3 google maps //
	this.image = null; //icono marker o null para no colocar icono
	this.Map;//objeto mapa
	this.canvas=canvas;//donde se crea el mapa y se sacan los data lon,lat y descripcion
	this.mapOptions = { //option mapa
		zoom: 10,
		zoomControl:false,
		streetViewControl:false,
		scrollwheel:true,
		panControl:false,
		draggable:true,
		//styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
		//mapTypeId:google.maps.MapTypeId.ROADMAP//HYBRID-ROADMAP-SATELLITE-TERRAIN
	};
	this.windowsInfoOpen=false; //que aparezca abierto o cerrado el windows info
	this.streetView=true;

	this.bounds;
	this.openInfoWindows;
	this.events=[]; //para el distpacher
	this.markers=[];
	
	this.panorama;
	
	this.initMaps=function(){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?key='+_root.id+'&callback=Maps.initialize';
			document.body.appendChild(script);
	}
	this.initialize=function()
	{
		if(!_root.streetView){
			_root.Map = new google.maps.Map(document.getElementById(_root.canvas),_root.mapOptions);
			_root.Map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			_root.bounds=new google.maps.LatLngBounds();
			_root.listoMapa();
		}else{
			_root.Map = new google.maps.StreetViewPanorama(document.getElementById(_root.canvas),_root.mapOptions);
			_root.listoStreetView();
		}

	}

	this.positionStreetView=function(data){

		var astorPlace = new google.maps.LatLng(data.lat, data.lng);

		_root.panorama = _root.Map.getStreetView();
		_root.panorama.setPosition(astorPlace);
		_root.panorama.setPov(({
		    heading: data.heading,
		    pitch: data.pitch
		}));

		_root.panorama.setVisible(true);
	}


	this.position=function(data){

		try{
			//_root.marker.setMap(null); // limpia mapa

			//_root.markers = [];

			for (var i = 0; i < _root.markers.length; i++) {
				//console.log(_root.markers);
			    
			    //_root.Map.removeOverlay(_root.markers[i]);
			    _root.markers[i].setMap(null);
			  }
			  _root.markers = [];
  			 
		}catch(error){}
		


		data.forEach(function(objeto){

	
			//LATITUD LOGNITUD
			var latlng = new google.maps.LatLng(objeto.lat||$('#'+_root.canvas).data("lat"),objeto.lng||$('#'+_root.canvas).data("lon"));

			_root.bounds.extend(latlng);
					
			var marker = new google.maps.Marker({
				position: latlng,
				map: _root.Map,
				draggable:false,//puntos dragables
				animation: google.maps.Animation.DROP, // comentar si punto dragable esta en false
				title: objeto.titulo||$('#'+_root.canvas).data("titulo")
			});

			_root.markers.push(marker);//para eliminarlos despues

			var infowindow = new google.maps.InfoWindow({
				content: objeto.contenido||$('#'+_root.canvas).data("contenido"),
				backgroundColor:'rgb(cc,cc,cc)'
			 });

			if(_root.image!=null)
			{
				marker.setIcon(_root.image);
			}else if(objeto.marker!=null){
				marker.setIcon(objeto.marker);
			}
			//_root.Map.setCenter(latlng);
			
			if(_root.windowsInfoOpen){
				infowindow.open(_root.Map,marker);
			}
			
			google.maps.event.addListener(marker, 'click', toggleBounce);

			function toggleBounce(event) {
				try{
					_root.openInfoWindows.close();
				}catch(e){}

				infowindow.open(_root.Map,marker);
				_root.openInfoWindows=infowindow;
			}

			_root.Map.setCenter(marker.getPosition());

		});
	}

	this.centerPosition=function(){

		_root.Map.setCenter(_root.bounds.getCenter());
		_root.Map.fitBounds(_root.bounds);
	}

	this.setZoom=function(data){
		_root.Map.setZoom(data);
	}

	this.deleteMarker=function(){

		try{
			//_root.marker.setMap(null); // limpia mapa
			for (var i = 0; i < _root.markers.length; i++) {
				//console.log(_root.markers);
			    _root.markers[i].setMap(null);
			  }
			  
  			 _root.markers = [];
		}catch(error){}
	}


	_root.initMaps();
  
}


googleMaps.prototype.listoMapa=function(){
	this.dispatch("listoMapa");
}

googleMaps.prototype.listoStreetView=function(){
	this.dispatch("listoStreetView");
}

googleMaps.prototype.addEventlistener=function(event,callback){
	this.events[event] = this.events[event] || [];
	if ( this.events[event] ) {
		this.events[event].push(callback);
	}
}
googleMaps.prototype.removeEventlistener=function(event,callback){
	if ( this.events[event] ) {
		var listeners = this.events[event];
		for ( var i = listeners.length-1; i>=0; --i ){
			if ( listeners[i] === callback ) {
				listeners.splice( i, 1 );
				return true;
			}
		}
	}
	return false;
}
googleMaps.prototype.dispatch=function(event){
	if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
			listeners[len](this);	//callback with self
		}		
	}
}