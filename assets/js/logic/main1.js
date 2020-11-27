function getCutoff() {
    var variablesFromForm = Array.from(document.querySelectorAll("#findOrderFrom input")).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
    // console.log(variablesFromForm);

    if (document.getElementById("frequencyType").value == "hz") {
        variablesFromForm.passBandFrequency = variablesFromForm.passBandFrequency * Math.PI * 2;
        variablesFromForm.stopBandFrequency = variablesFromForm.stopBandFrequency * Math.PI * 2;
    }

    console.log(variablesFromForm);
    console.log(getOrder());
    if (document.getElementById("gainType").value == "decibles") {
        console.log("Triggered decibels")
        var frequency1 = cutofffreqfordecibles(variablesFromForm.minPassBandGain, variablesFromForm.passBandFrequency, getOrder());
        var frequency2 = cutofffreqfordecibles(variablesFromForm.maxStopBandGain, variablesFromForm.stopBandFrequency, getOrder());
    } else {
        console.log("Triggered Normal")
        var frequency1 = cutofffreqfornodecibles(variablesFromForm.minPassBandGain, variablesFromForm.passBandFrequency, getOrder());
        var frequency2 = cutofffreqfornodecibles(variablesFromForm.maxStopBandGain, variablesFromForm.stopBandFrequency, getOrder());
    }
    cutofffrequency = (frequency1 + frequency2) / 2;
    resultContainer = document.getElementById("resultOrder");
    resultContainer.style.display = "block";
    if (document.getElementById("frequencyType").value == "hz") {
        resultContainer.innerText = "CUTOFF FEQUENCY IN hz IS: " + cutofffrequency;
    }
    else {
        resultContainer.innerText = "CUTOFF FEQUENCY In rad/sec IS: " + cutofffrequency;
    }

}


function getOrder() {
    var variablesFromForm = Array.from(document.querySelectorAll("#findOrderFrom input")).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
    if (document.getElementById("frequencyType").value == "hz") {
        variablesFromForm.passBandFrequency = variablesFromForm.passBandFrequency * Math.PI * 2;
        variablesFromForm.stopBandFrequency = variablesFromForm.stopBandFrequency * Math.PI * 2;
    }

    if (document.getElementById("gainType").value == "decibles") {
        var order = orderFromDecibles(variablesFromForm.minPassBandGain, variablesFromForm.maxStopBandGain, variablesFromForm.passBandFrequency, variablesFromForm.stopBandFrequency);
    } else {
        var order = orderFromNonDecibles(variablesFromForm.minPassBandGain, variablesFromForm.maxStopBandGain, variablesFromForm.passBandFrequency, variablesFromForm.stopBandFrequency);
    }

    resultContainer = document.getElementById("resultOrder");
    resultContainer.style.display = "block";
    resultContainer.innerText = "ORDER OF THE FILTER IS: " + order;
    return order;
}


function cutofffreqfornodecibles(Gain, freq, _filteOrderN) {
    numerator = freq;
    denominator = Math.pow((1 / Math.pow(Gain, 2) - 1), 1 / (2 * _filteOrderN));
    return (numerator / denominator);
}

function cutofffreqfordecibles(Gain, freq, _filteOrderN) {
    numerator = freq;
    denominator = Math.pow((Math.pow(10, 0.1 * Gain) - 1), 1 / (2 * _filteOrderN));
    return (numerator / denominator);
}

function orderFromNonDecibles(minPassBandGain, maxStopBandGain, passBandFreq, stopBandFreq) {
    var numerator = Math.log10((1 / (Math.pow(maxStopBandGain, 2)) - 1) / (1 / (Math.pow(minPassBandGain, 2)) - 1));
    var denominator = 2 * Math.log10(stopBandFreq / passBandFreq);
    return Math.ceil(numerator / denominator);
}

function orderFromDecibles(minPassBandGain, maxStopBandGain, passBandFreq, stopBandFreq) {
    var numerator = Math.log10((Math.pow(10, 0.1 * maxStopBandGain) - 1) / (Math.pow(10, 0.1 * minPassBandGain) - 1));
    var denominator = 2 * Math.log10(stopBandFreq / passBandFreq);
    return Math.ceil(numerator / denominator);
}
var count = 0;
function CheckNUmber() {
    
    if(count == 0){
        SecretNumber = Math.floor(Math.random() * Math.floor(20));
        console.log(SecretNumber);
    }
    usernumber = document.querySelector("#getNumber").value;
    console.log(usernumber);
    if(count>=6) {
        resultContainer = document.getElementById("SecreteNumberdisplayresult");
        resultContainer.style.display = "block";
        resultContainer.innerText = `Nope. The number I was thinking of was ${SecretNumber})`
    }
    else if ( usernumber >SecretNumber ) {
        console.log("Triggered greater")
        resultContainer = document.getElementById("SecreteNumberdisplayresult");
        resultContainer.style.display = "block";
        resultContainer.innerText = "Your guess is too High. Enter diffrent Number";
    }
    else if (usernumber<SecretNumber) {
        console.log("Triggered lesser")
        resultContainer = document.getElementById("SecreteNumberdisplayresult");
        resultContainer.style.display = "block";
        resultContainer.innerText = "Your guess is too Low. Enter Diffrent Number";
    }
    else if (SecretNumber == usernumber) {
        resultContainer = document.getElementById("SecreteNumberdisplayresult");
        resultContainer.style.display = "block";
        resultContainer.innerText = `Good job! You guessed my number in ${count} guesses!`
    }
    count = count + 1;
    console.log(count);
    console.log(SecretNumber);
}


function grabDataForMail() {
    var sendmaildata = Array.from(document.querySelectorAll("#reachoutmail input")).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
    sendEmail(sendmaildata.name, sendmaildata.email, sendmaildata.message);
    // console.log(sendmaildata);
    // var name = document.querySelector("#name").value;
    // var email = document.querySelector("#email").value;
    // var message = document.querySelector("#message").value;
    // sendEmail(name,email,message)

}
function sendEmail(name, email, message) {
    console.log($(message))
    Email.send({
        Host: "smtp.gmail.com",
        Username: "prabhusumantha77@gmail.com",
        Password: "ijbmdgfhdokczrcr",
        To: 'fazal.farhan@gmail.com',
        From: "prabhusumantha77@gmail.com",
        Subject: `${name} from his mail id ${email} send you a mail`,
        Body: `${message}`
    }).then(
        message => alert(message)
    );
}
