
function getCutoff(){
    var variablesFromForm = Array.from(document.querySelectorAll("#findfiltercutofffrq input")).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
    console.log(variablesFromForm)

    if (document.getElementById("frequencyType").value == "hz") {
        variablesFromForm.passBandFrequency = variablesFromForm.passBandFrequency * Math.PI * 2;
        variablesFromForm.stopBandFrequency = variablesFromForm.stopBandFrequency * Math.PI * 2;
    }
    if (document.getElementById("gainType").value == "decibles") {
        var frequency1 = cutofffreqfordecibles(variablesFromForm.minPassBandGain,variablesFromForm.passBandFrequency,variablesFromForm.filteOrderN);
        var frequency2 = cutofffreqfordecibles( variablesFromForm.maxStopBandGain,variablesFromForm.stopBandFrequency,variablesFromForm.filteOrderN);
    } else {
        var frequency1 = cutofffreqfornodecibles(variablesFromForm.minPassBandGain, variablesFromForm.passBandFrequency,variablesFromForm.filteOrderN);
        var frequency2 = cutofffreqfornodecibles( variablesFromForm.maxStopBandGain, variablesFromForm.stopBandFrequency,variablesFromForm.filteOrderN);

    }
    cutofffrequency = (frequency1+frequency2)/2;
    resultContainer = document.getElementById("resultOrder1");
    resultContainer.style.display = "block";
    if(document.getElementById("frequencyType").value == "hz"){
        resultContainer.innerText = "CUTOFF FEQUENCY IN hz IS: " + cutofffrequency;
    }
    else{
        resultContainer.innerText = "CUTOFF FEQUENCY In rad/sec IS: " + cutofffrequency;
    }
    
}
function cutofffreqfornodecibles(Gain, freq, _filteOrderN) {
    numerator = freq;
    denominator = Math.pow((1/Math.pow(Gain, 2) - 1), 1 / (2 * _filteOrderN));
    return (numerator / denominator);
}

function cutofffreqfordecibles(Gain,freq,_filteOrderN) {
    numerator = freq;
    denominator = Math.pow((Math.pow(10,0.1*Gain)-1),1/(2*_filteOrderN));
    return Math.ceil(numerator/denominator);
}

function grabDataForMail(){
var sendmaildata = Array.from(document.querySelectorAll("#reachoutmail input")).reduce((acc, input) => ({ ...acc, [input.id]: input.value}), {});
sendEmail(sendmaildata.name, sendmaildata.email, sendmaildata.message);
// console.log(sendmaildata);
// var name = document.querySelector("#name").value;
// var email = document.querySelector("#email").value;
// var message = document.querySelector("#message").value;
// sendEmail(name,email,message)

}
function sendEmail(name,email,message){
    console.log($(message))
    Email.send({
        Host : "smtp.gmail.com",
        Username : "prabhusumantha77@gmail.com",
        Password : "ijbmdgfhdokczrcr",
        To : 'fazal.farhan@gmail.com',
        From : "prabhusumantha77@gmail.com",
        Subject : `${name} from his mail id ${email} send you a mail`,
        Body : `${message}`
    }).then(
      message => alert(message)
    );
}
