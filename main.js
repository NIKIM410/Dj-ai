song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() {
    song = loadSound("05. Nightmare King.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNEt está inicializazndo');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rigthWristX = " + rightWristX + "rigthWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#1F6421");
    stroke("#9EA200");

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed = x0.5"

        } else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed = x1"

        } else if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = x1.5"

        } else if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "Speed = x2"

        } else if (rightWristY > 400) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed = x2.5"
        }
    }

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        InNumberleftWristY = Number(leftWristY);
        remove_dedcimals = floor(InNumberleftWristY);
        volume = remove_decimalss/500;

        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.set(volume);
    } 
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}