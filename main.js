Webcam.set({

    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera")

Webcam.attach("#camera")

function take_snapshot(){
 
    Webcam.snap(
       function(data_uri){
           document.getElementById("result").innerHTML = '<img id="snap" src="'+data_uri+'" />'
       }
    )
       
   }
   
   console.log("ml5 version :" , ml5.version)
   
   classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_jvA1ojSR/model.json" , modelLoaded)
   
   function modelLoaded(){
       console.log("Model Loaded")
   }
   
   function speak(){
       var synth = window.speechSynthesis;
       dialog_1 = "The prediction is "+prediction_1
       var utterthis = new SpeechSynthesisUtterance(dialog_1)
       synth.speak(utterthis)
   }

   
function check(){

    img = document.getElementById("snap")
    classifier.classify(img, gotResult)

}

function gotResult(error,results){

    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label
        prediction_1 = results[0].label

        speak()

        if(prediction_1=="happy" ){
        document.getElementById("update_emoji").innerHTML = "&#128522;"
        }

        if(prediction_1=="sad" ){
            document.getElementById("update_emoji").innerHTML = "&#128532;"
       }

       if(prediction_1=="angry" ){
        document.getElementById("update_emoji").innerHTML = "&#128545;"
       }
    }
}