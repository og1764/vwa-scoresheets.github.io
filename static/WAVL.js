function WAVL_MAIN(){
    // POST to python URL
    const url = '/WAVL/PUT';

    var token = generate_token();
    var force = document.getElementById("Checkbox99").checked;
    document.getElementById("Button4").value = "Please Wait";
    window.setInterval(dots)
    document.getElementById("Button4").style.backgroundColor = "gold"
    document.getElementById("Button4").style.color = "black";

    console.log(token)
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            document.getElementById("Button4").value = "Downloading Scoresheets";
            document.getElementById("Button4").style.backgroundColor = "green";
            document.getElementById("Button4").style.color = "white";
            document.getElementById("Button4").style.fontSize = "20px";
            window.clearInterval(dots);
            download(token);
            document.getElementById("Button4").value = "Generate Scoresheets";
            document.getElementById("Button4").style.backgroundColor = "#3370B7";
            document.getElementById("Button4").disabled = false;
            //document.getElementById("Button1").disabled = false;
            //document.getElementById("Button1").setAttribute( "onClick", "javascript: download('"+this.responseText+"');" );
        } else if (this.readyState == 4 && this.status == 408){
            console.log("timeout :(");
            document.getElementById("Button4").disabled = false;
            document.getElementById("Button4").value = "Request Timeout. Try again?";
            document.getElementById("Button4").style.color = "white";
            document.getElementById("Button4").style.backgroundColor = "red";
            document.getElementById("Button4").style.fontSize = "15px";
            window.clearInterval(dots);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
    xhttp.setRequestHeader("TOKEN", token);
    xhttp.setRequestHeader("FORCE", force);
    xhttp.send();
    var dots = window.setInterval( function() {
        var wait = document.getElementById("Button4");
        console.log(wait.value)
        if ( wait.value.length < 16 )
            wait.value += ".";
        else if ( wait.value.length < 17)
            wait.value = "Please Wait";
        }, 1000);
}

function select_all_venue(checked = true){
    const cbs = document.querySelectorAll('input[name="Venues"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox32").setAttribute( "onClick", "javascript: deselect_all_venue();" );

}

function deselect_all_venue(checked = false){
    const cbs = document.querySelectorAll('input[name="Venues"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox32").setAttribute( "onClick", "javascript: select_all_venue();" );
}

function select_all_wavl(checked = true){
    const cbs = document.querySelectorAll('input[name="WAVL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox33").setAttribute( "onClick", "javascript: deselect_all_wavl();" );

}

function deselect_all_wavl(checked = false){
    const cbs = document.querySelectorAll('input[name="WAVL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox33").setAttribute( "onClick", "javascript: select_all_wavl();" );
}

function select_all_wavjl(checked = true){
    const cbs = document.querySelectorAll('input[name="WAVjL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox34").setAttribute( "onClick", "javascript: deselect_all_wavjl();" );

}

function deselect_all_wavjl(checked = false){
    const cbs = document.querySelectorAll('input[name="WAVjL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox34").setAttribute( "onClick", "javascript: select_all_wavjl();" );
}

function enable_button(){
    document.getElementById("WAVL").disabled = false;
}

function download(token){
    var url = '/WAVL/download/' + token
    // GET to python URL
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display:none";
    a.href = url;
    a.download = "Scoresheets.pdf";
    a.click();
    a.remove();

    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("done")
            cleanup();
        }
    }
    xhttp.send();
}


function generate_token(){
    var date = $("#DatePicker2").datepicker("option", "dateFormat", "yy-mm-dd" ).val()
    var sep = "-"
    var venues = ""
    var wavl = ""
    var wavjl = ""

    document.getElementsByName("Venues").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            venues = venues + "1";
        }else{
            venues = venues + "0";
        }
    });
    document.getElementsByName("WAVL_teams").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            wavl = wavl + "1";
        }else{
            wavl = wavl + "0";
        }
    });
    document.getElementsByName("WAVjL_teams").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            wavjl = wavjl + "1";
        }else{
            wavjl = wavjl + "0";
        }
    });
    var v_hex = parseInt(venues, 2).toString(16)
    var w_hex = parseInt(wavl, 2).toString(16)
    var j_hex = parseInt(wavjl, 2).toString(16)
    var v_len = venues.length
    var w_len = wavl.length
    var j_len = wavjl.length
    console.log(v_hex)
    console.log(w_hex)
    console.log(j_hex)
    var token = date + sep + v_hex + sep + v_len + sep + w_hex + sep + w_len + sep + j_hex + sep + j_len

    return token
}

function cleanup(){
    var url = '/cleanup'
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    }
    xhttp.send();
}