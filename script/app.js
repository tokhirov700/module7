const $currentVideoElement = document.querySelector("#current-video");
const $playBtn = document.querySelector("#play-btn");
const $videoCover = document.querySelector("#video-cover");
const $videoTitle = document.querySelector("#video-title");
const $videoArtist = document.querySelector("#video-artist");
const $nextBtn = document.querySelector("#next-btn");
const $prevBtn = document.querySelector("#prev-btn");
const $videoPlayer = document.querySelector("#video-player");
const $videoList = document.querySelector("#video-list");
const $shuffleBtn = document.querySelector("#shuffle-btn");
const $progressBar = document.querySelector("#progress-bar");

let videoPlaying = false;
let $currentVideoIndex = 0;

let $videos = [
    {
        src: "./video/cls.mp4",
        title: "𝓢𝓶𝓪𝓬𝓴 𝓣𝓱𝓪𝓽 𝓑𝓪𝓼𝓼",
        artist: "𝓐𝓴𝓸𝓷",
        
    },
    {
        src: "./video/lonely.mp4",
        title: "𝓛𝓸𝓷𝓮𝓵𝔂",
        artist: "𝓐𝓴𝓸𝓷",
    },
    {
        src: "./video/bananza.mp4",
        title: "𝓑𝓪𝓷𝓪𝓷𝔃𝓪",
        artist: "𝓐𝓴𝓸𝓷",
    }
];

const renewIndex = () => {
    $videoPlayer.src = $videos[$currentVideoIndex].src;
    $videoTitle.innerText = $videos[$currentVideoIndex].title;
    $videoArtist.innerText = $videos[$currentVideoIndex].artist;
};

const renderVideoList = () => {
    $videoList.innerHTML = '';
    $videos.forEach((video, index) => {
        const li = document.createElement('li');
        li.classList.add('cursor-pointer', 'hover:bg-gray-700', 'p-2', 'rounded');
        li.innerText = `${video.title} - ${video.artist}`;
        li.addEventListener('click', () => {
            $currentVideoIndex = index;
            renewIndex();
            if (!videoPlaying) {
                playVideo();
            } else {
                $videoPlayer.play();
            }
        });
        $videoList.appendChild(li);
    });
};

const shuffleVideos = () => {
    for (let i = $videos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [$videos[i], $videos[j]] = [$videos[j], $videos[i]];
    }
    $currentVideoIndex = 0; 
    renewIndex();
    renderVideoList();
    if (!videoPlaying) {
        playVideo();
    } else {
        $videoPlayer.play();
    }
};

const playVideo = () => {
    if (!videoPlaying) {
        videoPlaying = true;
        $videoPlayer.play();
        $playBtn.firstElementChild.classList.add("hidden");
        $playBtn.lastElementChild.classList.remove("hidden");
        document.body.classList.add("amibient-animation");
    } else {
        videoPlaying = false;
        $videoPlayer.pause();
        $playBtn.firstElementChild.classList.remove("hidden");
        $playBtn.lastElementChild.classList.add("hidden");
    }
};

const playNextVideo = () => {
    if ($currentVideoIndex + 1 < $videos.length) {
        $currentVideoIndex++;
    } else {
        $currentVideoIndex = 0;
    }
    renewIndex();
    if (videoPlaying) {
        $videoPlayer.play();
    }
};

const playPrevVideo = () => {
    if ($currentVideoIndex > 0) {
        $currentVideoIndex--;
    } else {
        $currentVideoIndex = $videos.length - 1;
    }
    renewIndex();
    if (videoPlaying) {
        $videoPlayer.play();
    }
};

const updateProgressBar = () => {
    const currentTime = $videoPlayer.currentTime;
    const duration = $videoPlayer.duration;
    const progress = (currentTime / duration) * 100;
    $progressBar.style.width = `${progress}%`;
};

$playBtn.addEventListener("click", playVideo);
$nextBtn.addEventListener("click", playNextVideo);
$prevBtn.addEventListener("click", playPrevVideo);
$shuffleBtn.addEventListener("click", shuffleVideos);

$videoPlayer.addEventListener("timeupdate", updateProgressBar);



renewIndex();
renderVideoList();





