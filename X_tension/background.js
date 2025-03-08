let mediaRecorder;
let audioChunks = [];

// Start recording audio
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startRecording") {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                saveAudioFile(audioBlob);
                audioChunks = []; // Clear data
            };
        }).catch(error => {
            console.error("Audio capture error:", error);
        });
    }

    if (message.action === "stopRecording") {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
    }
});

// Save recorded audio as a file
function saveAudioFile(audioBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
        const a = document.createElement("a");
        a.href = reader.result;
        a.download = "recorded_audio.wav";
        a.click();
    };
}
