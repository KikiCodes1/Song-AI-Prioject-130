song1 = "";
song2 = "";
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
scoreL = 0;
scoreR = 0;
status1 = "";
status2 ="";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#fabb28");
    stroke("#fabb28");

    status1 = song1.isPlaying();
    status2 = song2.isPlaying();
    if(scoreL > 0.2){
        circle(leftX, leftY, 20);
        song2.stop();
        if(status1 == false){
            song1.play();
            document.getElementById("song_music").innerHTML = "song 1 is playing";
        }
    }
    if(scoreR > 0.2){
        circle(rightX, rightY, 20);
        song1.stop();
        if(status2 == false){
            song2.play();
            document.getElementById("song_music").innerHTML = "song 2 is playing";
        }
    }
}

function ModelLoaded(){
    console.log("PoseNet has been initialized!");
}

function gotPoses(results){
    if(results.length > 0){
    leftX = results[0].pose.leftWrist.x;
    rightX = results[0].pose.rightWrist.x;
    leftY = results[0].pose.leftWrist.y;
    rightY = results[0].pose.rightWrist.y;
    console.log("leftWristX = " + leftX + "leftWristY = " + leftY);
    console.log("rightWristX = " + rightX + "rightWristY = " + rightY);
    scoreL = results[0].pose.keypoints[9].score;
    scoreR = results[0].pose.keypoints[10].score;
    console.log("score for left wrist = " +scoreL +"score for right wrist = " +scoreR);    
}}

