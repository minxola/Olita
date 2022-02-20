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
        author: 'LP',
        name: 'Lost On You',
        id: 'hn3wJ1_1Zsg',
    },
    {
        author: 'Carla Morrison',
        name: 'Disfruto',
        id:'_ruEj-XK1lA',
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
    height: '360',
    width: '640',
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
    /* if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 30000);
    done = true;
    } */
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