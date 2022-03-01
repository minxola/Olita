 // 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const song_title = document.querySelector('.song_title');
const song_author = document.querySelector('.song_author');

//playlist
const playlist = [
    {
        author: 'Enrique Iglesias',
        name: 'Nunca te olvidare',
        id: 'pRrjt4htXlE',
    },
    {
        author: 'Carla Morrison',
        name: 'Disfruto',
        id:'_ruEj-XK1lA',
    },
    {
        author: 'Dyango',
        name: 'Corazon Mágico',
        id: 'SQtAwglgLeI'
    },
    {
        author: 'Morat',
        name: 'Yo contigo, tu conmigo',
        id: 'xZzM9QtLuLM',
    },
    {
        author: 'Tones and I',
        name: 'Dance Monkey',
        id: '1__CAdTJ5JU',
    },
    {
        author: 'Pedro Capó',
        name: 'Calma',
        id: 'CrFJXw5SIbo',
    },
    {
        author: 'LP',
        name: 'Lost On You',
        id: 'wDjeBNv6ip0',
    },
    {
        author: 'Alvaro Soler',
        name: 'Sofía',
        id: 'qaZ0oAh4evU',
    },
    {
        author: 'Avicii, Kygo, Sandro Cavazza',
        name: 'Forever yours',
        id: 'uYlYsvB-qbk',
    },
    {
        author: 'Alvaro Solver',
        name: 'El mismo sol',
        id: 'srPJ-s5uMbI',
    },
    {
        author: 'Carla Morrison',
        name: 'Disfruto remix',
        id: '5LgM6CvXrgk',
    },
    {
        author: 'Ingratax',
        name: 'Paris',
        id: '65DZ9BYskdE',
    },
    {
        author: 'Ozuna, Wisin, Reik',
        name: 'No me acostumbro',
        id: 'C1uZlcvlUoM',
    },
    {
        author: 'TheFatRat',
        name: 'We will meet again',
        id: 'hJqYc62NCKo',
    },
    {
        author: 'Master KG',
        name: 'Jerusalema',
        id: 'Ci3TMqWfNLs',
    },
    {
        author: 'Natalia Lafourcade',
        name: 'Hasta la Raíz',
        id: 'IKmPci5VXz0',
    },
    {
        author: 'La Factoria',
        name: 'Moriré',
        id: 'z20UZ2RAdNI',
    },
    {
        author: 'Alex Soto',
        name: 'Hombre muerto',
        id: 'wfu_N69jqXc',
    }
]

let videoToShow = 0;
let videoStatus;
let totalVideos = playlist.length - 1;

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '315',
    width: '560',
    playerVars: {
        'autoplay': 1,
        'controls': 0,
        'disablekb': 0,
        'enablejsapi': 1,
        'iv_load_policy': 3,
        'rel': 0,
        'showinfo':0
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

 // 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //event.target.playVideo();
    next();
}

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
//var done = false;
function onPlayerStateChange(event) {
    videoStatus = event.data;

    //video terminó de reproducirse
    if(videoStatus == 0){
        next();
    }

    //si el video no ha iniciado
    if(videoStatus == -1){
        timeOutShowVideo = setTimeout(killTimeOutVideo, 3000);
    }
}

function killTimeOutVideo(){
    clearTimeout(timeOutShowVideo);
    if(videoStatus == -1){
        next();
    }
}

function next(){
    playVideoNow();
}

function playVideoNow(){
    videoSrc = playlist[videoToShow].id;
    song_author.innerHTML = playlist[videoToShow].author;
    song_title.innerHTML = playlist[videoToShow].name;

    showVideo(videoSrc);

    if(videoToShow < totalVideos){
        videoToShow += 1;
    } else {
        videoToShow = 0;
    }

}

function showVideo(url){
    player.loadVideoById({
        videoId: url,
        suggestedQuality: "small"
    });

    player.playVideo();
}

next();