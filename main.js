var SpeechRecognition = window.webkitSpeechRecognition
var recognition = new SpeechRecognition(); 
function start_app() { 
    recognition.start(); 
}
recognition.onresult = function(event) {
    console.log(event); 
    var Content = event.results[0][0].transcript; 
    console.log(Content); 
    if(Content == "selfie"){
        Speak()
    }
   
}
function Speak() { 
    var synth = window.speechSynthesis
    var printedtext = "Taking your selfie in 5 seconds"
    var speakthis = new SpeechSynthesisUtterance(printedtext);
    synth.speak(speakthis)
    //.speak is a predefined function of the speech API
    Webcam.attach("#camera")
    setTimeout(function(){
        img_id = "selfie1"; 
        takeSnapshot()
        speak_data = "Taking your next selfie in 10 seconds"; 
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis); 
    },5000);
}
Webcam.set({
    width : 350,
    height : 300, 
    image_format : "png",
    png_quality : 100 
    
}); 

camera = document.getElementById("camera")

function takeSnapshot() {
    var synth = window.speechSynthesis
    console.log(img_id); 
    Webcam.snap(function(data_uri){
        if(img_id == "selfie1") {
            document.getElementById("first_picture").src = data_uri
            setTimeout(function(){
                img_id = "selfie2"; 
                takeSnapshot()
                speak_data = "Taking your last selfie in 10 seconds"; 
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis); 
            },5000);
        }
        if(img_id == "selfie2") {
            document.getElementById("second_picture").src = data_uri
            setTimeout(function(){
                img_id = "selfie3"; 
                takeSnapshot()
                // speak_data = "Taking your last selfie in 10 seconds"; 
                // var utterThis = new SpeechSynthesisUtterance(speak_data);
                // synth.speak(utterThis); 
            },5000);
        }
        if(img_id == "selfie3") {
            document.getElementById("third_picture").src = data_uri
        }
    })
}