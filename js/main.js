var Maps;

var MapsPosition=[
    {
      lat:"-33.400001",lng:"-70.576394",titulo:"Parque Arauco",contenido:"contenido1",marker:"https://cdn2.iconfinder.com/data/icons/free-mobile-icon-kit/64/Sexy_girl.png",heading:220,pitch:25
    },
    {
      lat:"-33.453316",lng:"-70.569370",titulo:"Plaza Egaña",contenido:"contenido2",marker:"https://cdn2.iconfinder.com/data/icons/free-mobile-icon-kit/64/Sexy_girl.png",heading:20,pitch:20
    },
    {
      lat:"-33.518589",lng:"-70.600119",titulo:"Plaza Vespucio",contenido:"contenido3",marker:"https://cdn2.iconfinder.com/data/icons/free-mobile-icon-kit/64/Sexy_girl.png",heading:20,pitch:-10
    },
    {
      lat:"-33.008626",lng:"-71.548677",titulo:"Marina Arauco",contenido:"contenido4",marker:"https://cdn2.iconfinder.com/data/icons/free-mobile-icon-kit/64/Sexy_girl.png",heading:-150,pitch:0
    },
    {
      lat:"-33.514675",lng:"-70.718046",titulo:"Plaza Oeste",contenido:"contenido5",marker:"https://cdn2.iconfinder.com/data/icons/free-mobile-icon-kit/64/Sexy_girl.png",heading:0,pitch:20
    }
];

window.onload = init;

function init()
{	
	console.log("followMe @PixelarteCl");

	Maps=new googleMaps("mapa");
    Maps.addEventlistener("listoMapa", listoMapa);
}

function listoMapa(event){
	$("#mapa").width(400);;
	$("#mapa").height(400);;

	 Maps.deleteMarker();//borrar todos los marker
	 //agrega un marker
	 //Maps.position([{ lat:"-33.400001",lng:"-70.576394",titulo:"Parque Arauco",contenido:"contenido1",marker:"https://cdn2.iconfinder.com/data/icons/free-mobile-icon-kit/64/Sexy_girl.png",heading:220,pitch:25}]);
	 //Maps.setZoom(15);//modifica el zoom
	 Maps.position(MapsPosition);
	 Maps.centerPosition();//centra el mapa segun marker presnetes
	
}

	