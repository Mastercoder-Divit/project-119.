Element_of_array =["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon","hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","paper clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup truck","picture frame","pig","pillow","pineapple","pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet","purse","rabbit"]
random_number = Math.floor((Math.random()*array_1.length)+1);
Element_of_array = array_1[random_number];
document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: " + Element_of_array;

time_counter = 0;
time_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = Element_of_array;

function draw()
{
    check_sketch();
    if(drawn_sketch == sketch)
    {
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: "+score;

    }
}

function check_sketch()
{
    time_counter++;
    document.getElementById("timer").innerHTML = "Timer: "+time_counter;
    if(time_counter>400)
    {
        time_counter = 0;
        time_check = "completed";
        console.log();
    }
    if(time_check == "completed" || answer_holder == "set")
    {
        time_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function updateCanvas()
{
    background("white");
    sketch = Element_of_array;
    document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: " +sketch;
}

function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function ClearCanvas()
{
    background("white");
}

function preload()
{
    classifier = ml5.imageClassifier('DoddleNet');
}

function draw()
{
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas , gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label:' + results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence' + Math.round(results[0].confidence * 100 + '%');
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}