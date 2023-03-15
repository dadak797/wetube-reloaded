const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile = null;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
}

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);

    recorder.stop();
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    }
    recorder.start();
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 200, height: 100 }
    });
    video.srcObject = stream;
    video.play();
};

init();

startBtn.addEventListener("click", handleStart);