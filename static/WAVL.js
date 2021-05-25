function WAVL_MAIN(){
    //console.log("HERE")
    var venues = "";
    var wavl_teams = "";
    var wavjl_teams = "";
    const url = '/WAVL/PUT';
    var date = $("#DatePicker2").datepicker("option", "dateFormat", "yy-mm-dd" ).val()

    document.getElementsByName("Venues").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            venues = venues + "1";
        }else{
            venues = venues + "0";
        }
    });
    document.getElementsByName("WAVL_teams").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            wavl_teams = wavl_teams + "1";
        }else{
            wavl_teams = wavl_teams + "0";
        }
    });
    document.getElementsByName("WAVjL_teams").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            wavjl_teams = wavjl_teams + "1";
        }else{
            wavjl_teams = wavjl_teams + "0";
        }
    });
    //console.log(venues)

    document.getElementById("Button4").disabled = true;
    document.getElementById("Button1").disabled = true;
    document.getElementById("Button4").value = "Please wait..."

    // POST to python URL
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            document.getElementById("Button4").disabled = false;
            document.getElementById("Button4").value = "Generate Scoresheets";
            document.getElementById("Button1").disabled = false;
            document.getElementById("Button1").setAttribute( "onClick", "javascript: download('"+this.responseText+"');" );
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
    xhttp.setRequestHeader("VENUES", venues);
    xhttp.setRequestHeader("WAVL", wavl_teams);
    xhttp.setRequestHeader("WAVjL", wavjl_teams);
    xhttp.setRequestHeader("yyyymmdd", date);
    xhttp.send();
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
        }
    }
    xhttp.send();
}
