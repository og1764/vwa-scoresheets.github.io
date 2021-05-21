function main(){
    console.log("HERE")
    var venues = "";
    var leagues = "";
    const url = '/WAVjL/PUT';
    var date = document.getElementById("date").value;

    document.getElementsByName("Venue").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            venues = venues + "1";
        }else{
            venues = venues + "0";
        }
    });
    document.getElementsByName("League").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            leagues = leagues + "1";
        }else{
            leagues = leagues + "0";
        }
    });

    // POST to python URL
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById("download").disabled = false;
            document.getElementById("download").setAttribute( "onClick", "javascript: download('"+this.responseText+"');" );
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
    xhttp.setRequestHeader("VENUES", venues);
    xhttp.setRequestHeader("DIVISIONS", leagues);
    xhttp.setRequestHeader("yyyymmdd", date);
    xhttp.send();
}

function select_all_venue(checked = true){
    const cbs = document.querySelectorAll('input[name="Venue"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("al_v").innerText = "Deselect All"
    document.getElementById("ALL_venue").setAttribute( "onClick", "javascript: deselect_all_venue();" );

}

function deselect_all_venue(checked = false){
    const cbs = document.querySelectorAll('input[name="Venue"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("al_v").innerText = "Select All"
    document.getElementById("ALL_venue").setAttribute( "onClick", "javascript: select_all_venue();" );
}

function select_all_league(checked = true){
    const cbs = document.querySelectorAll('input[name="League"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("al_l").innerText = "Deselect All"
    document.getElementById("ALL_league").setAttribute( "onClick", "javascript: deselect_all_league();" );

}

function deselect_all_league(checked = false){
    const cbs = document.querySelectorAll('input[name="League"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("al_l").innerText = "Select All"
    document.getElementById("ALL_league").setAttribute( "onClick", "javascript: select_all_league();" );
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
    a.download = "WAVL Scoresheets.pdf";
    a.click();
    a.remove();

    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("feelsgoodman")
        }
    }
    xhttp.send();
}
