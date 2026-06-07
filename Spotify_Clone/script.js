var currSng;
var currBtn = null;
var currIndx=0;
let banner=document.querySelector(".b");
let bannersong=document.querySelector(".con1");
let bannerSinger=document.querySelector(".con2");
let playButton=document.querySelector("#play");
let forward=document.querySelector("#forward");
let backward=document.querySelector("#backward");
let repeat=document.querySelector("#repeat");
let shuffle=document.querySelector("#shuffle");
let progressBar = document.getElementById("progressBar");



function songon(n, btn){
    currIndx=n;
    // If same button clicked
    if(currBtn === btn){
        if(currSng.paused){
            currSng.play();
            btn.querySelector("img").src = "play.pause/pause-fill.svg";
            playButton.src= "play.pause/pause-fill.svg";
        } else {
            currSng.pause();
            btn.querySelector("img").src = "play.pause/play-fill.svg";
            playButton.src= "play.pause/play-fill.svg";
        }
    } 
    
    // If different song clicked
    else {
        // Reset previous button icon
        if(currBtn){
            currBtn.querySelector("img").src = "play.pause/play-fill.svg";
            playButton.src= "play.pause/play-fill.svg";
        }

        // Stop previous song
        if(currSng){
            currSng.pause();
        }

        // Start new song
        currSng = new Audio("songs/" + n + ".mp3");
        currSng.play();

        //Update progress bar as song plays
        currSng.addEventListener("timeupdate", function () {
        if (currSng.duration) {
        let progress = (currSng.currentTime / currSng.duration) * 100;
        progressBar.value = progress;
        }
        });

        // Update current button
        btn.querySelector("img").src = "play.pause/pause-fill.svg";
        playButton.src= "play.pause/pause-fill.svg";
        currBtn = btn;
    }
    banner.innerHTML="<img src='img/"+n+".jpg'>"
    bannersong.innerText=btn.parentElement.querySelector(".songname").innerText;
    bannerSinger.innerHTML=btn.parentElement.querySelector(".singer").innerText;
}

//Play button
playButton.addEventListener("click",function playbutton(){
     if(!currSng){
        return;
    }
    if(currSng.paused){
         currSng.play();
        playButton.src= "play.pause/pause-fill.svg";
    } else {
        currSng.pause();
        playButton.src= "play.pause/play-fill.svg";
    }
})

//Forward button
forward.addEventListener("click",function(){
    if(currSng){
    currSng.pause();
    }
    currIndx++;
    //call existing function for everything
    songon(currIndx, document.querySelectorAll(".but")[currIndx - 1]);//as an array. so -1
})

//Backward button
backward.addEventListener("click",function(){
    if(currSng){
    currSng.pause();
    }
    currIndx--;
    //call existing function for everything
    songon(currIndx, document.querySelectorAll(".but")[currIndx - 1]);
   
})

//repeating
repeat.addEventListener("click", function(){
    currSng.currentTime = 0;
    currSng.play();
})

//Shuffling
shuffle.addEventListener("click",function(){
    var n=Math.random();
    var randomS=Math.floor(n*7)+1;
    if(currSng){
    currSng.pause();
    }
    //call existing function for everything
    songon(randomS, document.querySelectorAll(".but")[randomS-1]);
})

//PROGRESS BAR
//Move song when user drags the bar
progressBar.addEventListener("input", function () {
    if(currSng && currSng.duration)
    currSng.currentTime = (progressBar.value * currSng.duration) / 100;

});