console.log("Let's write JavaScript");
 function convertSecondsToMMSS(totalSeconds) {
  
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);


    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');


    return `${minutesString}:${secondsString}`;
}

let currentsong=new Audio();
async function getSongs() {
    let response = await fetch("/songs/");
    let text = await response.text();
    console.log(text);
    let div = document.createElement("div");
    div.innerHTML = text;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}
const playmusic=(track,pause=false)=>{
//   let audio=new Audio("/songs/"+track);
  currentsong.src="/songs/"+track
  if(!pause){
    currentsong.play();
    play.src="pause.svg"
  }
  
  document.querySelector(".songinfo").innerHTML=decodeURI(track)
  document.querySelector(".songtime").innerHTML=" 00:00 / 00:00 "
}
async function main() {
    let songs = await getSongs();
    playmusic(songs[0],true)
    console.log(songs);
    let songul = document.querySelector(".songlist ul");
    let songListHtml = "";
    for (const song of songs) {
        songListHtml += `<li>
            <img src="music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Arjit Singh</div>
            </div>
            <div class="playnow">
                <span>play now</span>
                <img width="30px" height="30px" src="play.svg" alt="">
            </div>
        </li>`;
    }
    songul.innerHTML = songListHtml;

    Array.from(document.querySelectorAll(".songlist li")).forEach(e => {
        e.addEventListener("click",element=>{
        // console.log(e.querySelector(".info div").innerHTML);
        let songname=e.querySelector(".info div").innerHTML;
        console.log(songname)
        playmusic(songname);
    });
})
play.addEventListener("click",()=>{
    if(currentsong.paused){
        currentsong.play()
        play.src="pause.svg"
    }
    else{
        currentsong.pause()
        play.src="play.svg"
    }
})
currentsong.addEventListener("timeupdate",()=>{
    // console.log(currentsong.currentTime,currentsong.duration)
    document.querySelector(".songtime").innerHTML=`${convertSecondsToMMSS(currentsong.currentTime)}/${convertSecondsToMMSS(currentsong.duration)}`
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"
})
document.querySelector(".seekbar").addEventListener("click",e=>{
    document.querySelector(".circle").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%"
    currentsong.currentTime=(currentsong.duration)*(e.offsetX/e.target.getBoundingClientRect().width)
})
}
main();
