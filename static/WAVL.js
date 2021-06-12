function WAVL_MAIN(){
    // POST to python URL
    const url = '/WAVL/PUT';

    var token = generate_token();
    var force = document.getElementById("Checkbox99").checked;
    document.getElementById("Button4").value = "Please Wait";
    window.setInterval(dots)
    document.getElementById("Button4").style.backgroundColor = "gold"
    document.getElementById("Button4").style.color = "black";
    document.getElementById("Button4").disabled = true;

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

function token_download(token){
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












const DIVISIONS = {
    "State League Women": ["State League Women", "SL Women", "80"],
    "State League Men": ["State League Men", "SL Men", "81"],
    "State League Reserve Men": ["State League Reserve Men", "SLR Men", "82"],
    "State League Reserve Women": ["State League Reserve Women", "SLR Women", "83"],
    "Division 1 Men": ['Division 1 Men', 'Div 1 M', "94"],
    "Division 1 Women": ['Division 1 Women', 'Div 1 W', "95"],
    "Division 2 Men": ['Division 2 Men', 'Div 2 M', "96"],
    "Division 2 Women": ['Division 2 Women', 'Div 2 W', "97"],
    "Division 3 Men": ['Division 3 Men', 'Div 3 M', "98"],
    "Division 3 Women": ['Division 3 Women', 'Div 3 W', "99"],
    "Division 4 Men": ['Division 4 Men', 'Div 4 M', "100"],
    "Division 5 Men": ['Division 5 Men', 'Div 5 M', "101"],
    '7/8 Female Pool 1': ['7/8 Female Pool 1', '7/8 F 1', '84'],
    '7/8 Female Pool 2': ['7/8 Female Pool 2', '7/8 F 2', '85'],
    '9/10 Female Pool 1': ['9/10 Female Pool 1', '9/10 F 1', '86'],
    '9/10 Female Pool 2': ['9/10 Female Pool 2', '9/10 F 2', '87'],
    '11/12 Female': ['11/12 Female', '11/12 F', '88'],
    '11/12 Male': ['11/12 Male', '11/12 M', '89'],
    '9/10 Male Pool 1': ['9/10 Male Pool 1', '9/10 M 1', '90'],
    '9/10 Male Pool 2': ['9/10 Male Pool 2', '9/10 M 2', '91'],
    '7/8 Male': ['7/8 Male', '7/8 M', '92']
}

const VENUE_SPLIT = {
    "aquinas college": "*Aquinas*College",
    "bendat": "**Bendat",
    "cockburn": "**Cockburn",
    "curtin stadium": "*Curtin*Stadium",
    "ecu mt. lawley": "*ECU*Mt. Lawley",
    "geographe leisure": "Geographe*Leisure*Centre",
    "kingsway": "**Kingsway",
    "loftus": "**Loftus",
    "mandurah arc": "*Mandurah*ARC",
    "mbc": "**MBC",
    "melville leisurefit": "*Melville*LeisureFit",
    "methodist l. col": "Methodist*Ladies*College",
    "mlc": "Methodist*Ladies*College",
    "penrhos college": "*Penrhos*College",
    "rossmoyne": "**Rossmoyne",
    "st mary's": "**St Mary's",
    "the rise": "**The Rise",
    "uwa rec. centre": "UWA*Recreation*Centre",
    "warwick": "**Warwick",
    "wesley college": "*Wesley*College"
}




class Fixture{
    constructor(venue, venue_0, venue_1, venue_2, venue_full, court, team_a, team_b, duty, division, date_dd, date_mm,
                date_yyyy, time_hr, time_min, sorting) {
        self.venue = venue
        self.venue_0 = venue_0
        self.venue_1 = venue_1
        self.venue_2 = venue_2
        self.venue_full = venue_full
        self.court = court
        self.team_a = team_a
        self.team_b = team_b
        self.duty = duty
        self.division = division
        self.date_dd = date_dd
        self.date_mm = date_mm
        self.date_yyyy = date_yyyy
        self.time_hr = time_hr
        self.time_min = time_min
       self.sorting = sorting
    }

    get venue(){return self.venue}
    get venue_0(){return self.venue_0}
    get venue_1(){return self.venue_1}
    get venue_2(){return self.venue_2}
    get venue_full(){return self.venue_full}
    get court(){return self.court}
    get team_a(){return self.team_a}
    get team_b(){return self.team_b}
    get duty(){return self.duty}
    get division(){return self.division}
    get date_dd(){return self.date_dd}
    get date_mm(){return self.date_mm}
    get date_yyyy(){return self.date_yyyy}
    get time_hr(){return self.time_hr}
    get time_min(){return self.time_min}
    get sorting(){return self.sorting}
}









function WAVL_ONLINE(){
    var venues = []
    var wavjl = []
    var wavl = []
    var date = $("#DatePicker2").datepicker("option", "dateFormat", "yy-mm-dd" ).val()
    document.getElementsByName("Venues").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            venues.push(document.getElementById(checkbox.id).title)
        }
    })
    document.getElementsByName("WAVL_teams").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            wavjl.push(document.getElementById(checkbox.id).title)
        }
    })
    document.getElementsByName("WAVjL_teams").forEach((checkbox) => {
        if(document.getElementById(checkbox.id).checked){
            wavl.push(document.getElementById(checkbox.id).title)
        }
    })
    pdf_init(venues, wavl, wavjl, date)
}

function pdf_init(venues, wavl, wavjl, date){
    var concatted = wavl.concat(wavjl)
    var leagues = []
    console.log(concatted)
    console.log("*")
    for (var i = 0; i < concatted.length; i++){
        leagues.push(DIVISIONS[concatted[i]])
    }
    console.log("*")
    console.log(leagues)
    var fixtures = get_fixtures(venues, leagues, date);
    console.log("back to main");
    var mix = []
    //modifyPdf(fixtures[0]).then(value => {mix.push(value)})
    //modifyPdf(fixtures[1]).then(value => {mix.push(value)})
    modifyPdf(fixtures).then(value => {
        Promise.all(value).then(value_3 => {
            mergePDFDocuments(value_3).then(value_2 => {
                console.log(value_2);
                download(value_2, "help.pdf", "application/pdf");
            })
        })
    })
    //download(res, "pdf-lib_creation_example.pdf", "application/pdf");

    //var existing = gen_PDF(fixtures)

    //console.log(existing)
    //var merged = merge_PDF(existing)
    //download(existing, "pdf-lib_modification_example.pdf", "application/pdf");
}

async function modifyPdf(fixtures) {
    var total = new Array(2);

    for (var i = 0; i < 2; i++) {

        const {PDFDocument, StandardFonts, rgb} = PDFLib

        const url = '/static/def.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const {width, height} = firstPage.getSize()
        firstPage.drawText(fixtures[i].court, {
            x: 400,
            y: 557,
            size: 13,
            font: helveticaFont
        })

        //const pdfBytes = await pdfDoc.saveAsBase64()

        //console.log(pdfBytes)
        total[i] =  await pdfDoc.saveAsBase64();
    }
    //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
    console.log(total);
    return await total;

}

async function mergePDFDocuments(documents) {
	const mergedPdf = await PDFLib.PDFDocument.create();

	var docone = await PDFLib.PDFDocument.load(await documents[0]);
    var copiedPagesone = await mergedPdf.copyPages(docone, [0, 1]);
    await mergedPdf.addPage(await copiedPagesone[0]);
    await mergedPdf.addPage(await copiedPagesone[1]);

    var doctwo = await PDFLib.PDFDocument.load(await documents[1]);
    var copiedPagestwo = await mergedPdf.copyPages(doctwo, [0, 1]);
    await mergedPdf.addPage(await copiedPagestwo[0]);
    await mergedPdf.addPage(await copiedPagestwo[1]);

	var saved = await mergedPdf.save();

	return await saved;

	//download(await mergedPdf, "pdf-lib_creation_example.pdf", "application/pdf");
}


function get_fixtures(venue_usage, leagues, date) {
    const head = 'https://cors.bridged.cc/vwa.bracketpal.com/dailyform/';
    var fixtures = [];
    var done = 0;
    if (venue_usage.includes("Methodist Ladies College")) {
        venue_usage.push("MLC");
    }
    console.log(leagues)
    for (var j = 0; j < leagues.length; j++){
        console.log(leagues[j])
        let url = head + leagues[j][2] + "/" + date.toString();
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(this.responseText, 'text/html');
                try {
                    var table = htmlDoc.getElementsByTagName("table")[2]
                    var rowLength = table.rows.length;
                    for (var i = 1; i < rowLength; i++){
                        var cells = table.rows.item(i).cells;
                        var venue = cells.item(1).innerText;
                        console.log(venue);
                        var venue_split = venue.split(" Ct")
                        var zero_venue_split = venue_split[0].replaceAll(" Ct", "");;
                        if (venue_usage.includes(zero_venue_split)){
                            var court = cells.item(1).innerText.split("Ct")[1];
                            var team_a = cells.item(2).innerText;
                            var team_b = cells.item(5).innerText;
                            var duty = " ";
                            var time_hr = " ";
                            var time_min = " ";
                            try { duty = cells.item(7).innerText.slice(5);}
                            catch (e){
                                console.log(e)
                                duty = " ";}
                            var division = leagues[j];
                            var _date = date.split('-');
                            var date_dd = _date[2];
                            var date_mm = _date[1];
                            var date_yyyy = _date[0]
                            try {
                                var time = cells.item(0).innerText.split(":")
                                time_hr = time[0].padStart(2, "0");
                                time_min = time[1];
                            } catch (e) {
                                console.log(e);
                                time_hr = " ";
                                time_min = " ";
                            }
                            var tmp_venue = VENUE_SPLIT[zero_venue_split.toLowerCase()].split("*");
                            var venue_0 = tmp_venue[0]
                            var venue_1 = tmp_venue[1]
                            var venue_2 = tmp_venue[2]
                            var venue_full = VENUE_SPLIT[zero_venue_split.toLowerCase()].replaceAll("*"," ").trimLeft();
                            var sorting = venue_full + " " + court + " " + time_hr
                            var fix = new Fixture(zero_venue_split, venue_0, venue_1, venue_2, venue_full, court,
                                team_a, team_b, duty, division, date_dd, date_mm, date_yyyy, time_hr, time_min, sorting)

                            fixtures.push(fix)
                            done = done + 1;
                        }

                    }
                } catch (e) {
                    console.log(e + " " + url)
                    done = done + 1
                }
            }
        }
        xhttp.open("GET", url, false);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
        xhttp.send();
    }
    var sorted_fixtures = fixtures.sort((a,b) => (a.sorting > b.sorting) ? 1 : ((b.sorting > a.sorting) ? -1 : 0))
    console.log(sorted_fixtures)
    return sorted_fixtures
}