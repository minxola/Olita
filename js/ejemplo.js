// variable para almacenar el video a mostrar
var video_a_mostar = 0;

var situacion_del_video;
// variable para almacenar la situacion del video
// la situacion del video la proporciona la api de youtube
// los valores posibles son:
// 0 el video ha terminado
// 1 el video se esta reproduciendo
// 2 el video esta pausado
// 3 el video esta almacenandose localmente
// 4 el video esta listo para reproducirse
// -1 el video no ha iniciado
	
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *}
//  creamos un array multidimensional con la playlist de los videos a reproducir
// cada elemnto del array tiene:
// ["interperete","nombre de la cancion","youtube video id"],
// Ejemplo:
// ["Amy Winehouse ","You Know I am No Good ","b-I2s5zRbHg"],
// El youtube video id se extrae de la url del video
// Ejemplo de url del video:
// https://www.youtube.com/watch?v=b-I2s5zRbHg
// el valor del parametro v es el youtube video id
// En este caso: b-I2s5zRbHg
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *}



var playlist = [
["NORTEC COLLECTIVE","Tijuana Sound Machine","iyR6N8ey458"],
["Mano Negra","Santa Maradona","3CUnwPgopIk"],
["Mano Negra","Peligro","d1nSWumUp4I"],
["moby mylene farmer","Slipping Away","PAkJs4MqHBU"],
["Bomba Estereo","Fuego","f3cq2Sd2jkU"],
];


var total_videos = playlist.length - 1;
//variable para almacenar cuantos videos tieene la playlist

var player;
// crea el player para los videos

window.onYouTubeIframeAPIReady = function(){
	player = new YT.Player('mi_video_player',{
		width: '500',
		height: '281',
		playerVars: { 'autoplay': 1, 'controls': 0, 'disablekb':0, 'enablejsapi':1, 'iv_load_policy':3, 'rel':0, 'showinfo':0 },
		events:{
			'onReady': el_reproductor_esta_listo,
			'onStateChange': el_reproductor_cambio_de_estado
		}
	});
}


function el_reproductor_esta_listo(event){
	next();
}



function el_reproductor_cambio_de_estado(event){
	situacion_del_video =  event.data;

	if (event.data == 0){
		next();
	}

	if (event.data == -1){

		timeout_mostrar_video = window.setTimeout(kill_timeout_video, 3000); 
	}
}


function kill_timeout_video(){

		window.clearTimeout(timeout_mostrar_video);

		if(situacion_del_video == -1){
			next();
		}

}

function next()	{
	reproducir();
}

function reproducir(){
	video_a_mostrar_src = playlist[video_a_mostar][2];

	document.getElementById('autor').innerHTML = playlist[video_a_mostar][0];

	document.getElementById('cancion').innerHTML = playlist[video_a_mostar][1];

	mostrar_video(video_a_mostrar_src);

	if(video_a_mostar < total_videos){
		video_a_mostar += 1;
	} else {
		video_a_mostar = 0;
	}
}

function mostrar_video(url){
	player.loadVideoById({videoId:url,suggestedQuality:"small"});
	player.playVideo();
}

next();
