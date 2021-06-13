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

function pdf_init(venues, wavl, wavjl, date) {
    var concatted = wavl.concat(wavjl)
    var leagues = []
    console.log(concatted)
    console.log("*")
    for (var i = 0; i < concatted.length; i++) {
        leagues.push(DIVISIONS[concatted[i]])
    }
    console.log("*")
    console.log(leagues)

    var mix = []
    //modifyPdf(fixtures[0]).then(value => {mix.push(value)})
    //modifyPdf(fixtures[1]).then(value => {mix.push(value)})
    Promise.all(get_fixtures(venues, leagues, date)).then(fix_val => {
        modifyPdf(fix_val).then(value => {
            Promise.all(value).then(value_3 => {
                mergePDFDocuments(value_3).then(value_2 => {
                    console.log(value_2);
                    download(value_2, "help.pdf", "application/pdf");
                })
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
    const {PDFDocument, StandardFonts, rgb} = PDFLib;
    var total = new Array(fixtures.length);
    console.log(fixtures)
    for (var i = 0; i < fixtures.length; i++) {
        var url = "";
        console.log(fixtures[i].division)
        if(fixtures[i].division[0][0] == "D" ||  fixtures[i].division[0][0] == "S"){
            url = "/static/def.pdf";
        }else{
            url = "/static/def_jl.pdf";
        }

        var existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        var pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes)
        var helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica)
        var helveticaBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
        var pages = await pdfDoc.getPages()
        var firstPage = await pages[0]

        if(fixtures[i].division[0][0] == "D" ||  fixtures[i].division[0][0] == "S"){
            await firstPage.drawText(fixtures[i].venue_0, {
                x: parseInt((310 - measureText(fixtures[i].venue_0,10)).toString()),
                y: 575,
                size: 10,
                font: helveticaFont
            })
            await firstPage.drawText(fixtures[i].venue_1, {
                x: parseInt((310 - measureText(fixtures[i].venue_1,10)).toString()),
                y: 566,
                size: 10,
                font: helveticaFont
            })
            await firstPage.drawText(fixtures[i].venue_2, {
                x: parseInt((310 - measureText(fixtures[i].venue_2,10)).toString()),
                y: 557,
                size: 10,
                font: helveticaFont
            })
            await firstPage.drawText(fixtures[i].court, {
                x: parseInt((400 - measureBold(fixtures[i].court,13)).toString()),
                y: 557,
                size: 13,
                font: helveticaBold
            })
            try {
                var hour = " ";
                if (parseInt(fixtures[i].time_hr).toString().length == 1) {
                    hour = " " + parseInt(fixtures[i].time_hr).toString()
                }else{hour = parseInt(fixtures[i].time_hr).toString()}
                await firstPage.drawText(hour, {
                    x: parseInt((492 - measureBold(hour,13) - measureBold(hour,13)).toString()),
                    y: 557,
                    size: 13,
                    font: helveticaBold
                })
                await firstPage.drawText(fixtures[i].time_min, {
                    x: 500,
                    y: 557,
                    size: 13,
                    font: helveticaBold
                })
            }catch (e){console.log(e);}
            // catch - continue
            var dd = " ";
            if (parseInt(fixtures[i].date_dd).toString().length == 1) {
                dd = " " + parseInt(fixtures[i].date_dd).toString()
            }else{dd = parseInt(fixtures[i].date_dd).toString()}

            await firstPage.drawText(dd, {
                x: parseInt((596 - measureBold(dd,13) - measureBold(dd,13)).toString()),
                y: 557,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(parseInt(fixtures[i].date_mm).toString(), {
                x: parseInt((611 - measureBold(fixtures[i].date_mm,13)).toString()),
                y: 557,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(fixtures[i].date_yyyy.slice(2,4), {
                x: 625,
                y: 557,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(fixtures[i].division[1], {
                x: parseInt((773 - measureBold(fixtures[i].division[1],13)).toString()),
                y: 557.5,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(fixtures[i].duty, {
                x: parseInt((710 - measureText(fixtures[i].duty,14)).toString()),
                y: 528,
                size: 14,
                font: helveticaFont
            })
            // if length > 18
            if(fixtures[i].team_a.length > 18 || fixtures[i].team_b.length > 18) {
                await firstPage.drawText(fixtures[i].team_a, {
                    x: parseInt((320 - measureText(fixtures[i].team_a,10)).toString()),
                    y: 527,
                    size: 10,
                    font: helveticaFont
                })
                await firstPage.drawText(fixtures[i].team_b, {
                    x: parseInt((460 - measureText(fixtures[i].team_b,10)).toString()),
                    y: 527,
                    size: 10,
                    font: helveticaFont
                })
            }else {
                pdfDoc.TextAlignment = 1;
                await firstPage.drawText(fixtures[i].team_a, {
                    x: parseInt((320 - measureText(fixtures[i].team_a,14)).toString()),
                    y: 527,
                    size: 14,
                    font: helveticaFont
                })
                await firstPage.drawText(fixtures[i].team_b, {
                    x: parseInt((460 - measureText(fixtures[i].team_b,14)).toString()),
                    y: 527,
                    size: 14,
                    font: helveticaFont
                })
            }
        }else{
            url = "/static/def_jl.pdf";
            console.log("Junior league...???")
        }

        var saved = await pdfDoc.saveAsBase64();
        total[i] = saved;
    }
    //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
    console.log(total);
    return await total;

}

async function mergePDFDocuments(documents) {
	var mergedPdf = await PDFLib.PDFDocument.create();
    for(var i = 0; i < documents.length; i++) {
        console.log(i)
        var docone = await PDFLib.PDFDocument.load(await documents[i]);
        var copiedPagesone = await mergedPdf.copyPages(docone, [0, 1]);
        await mergedPdf.addPage(await copiedPagesone[0]);
        await mergedPdf.addPage(await copiedPagesone[1]);
    }
	var saved = await mergedPdf.save();

	return await saved;

	//download(await mergedPdf, "pdf-lib_creation_example.pdf", "application/pdf");
}


function get_URLS(leagues, date){
    var all_urls = []
    for(var i = 0; i < leagues.length; i++){
        var url = head + leagues[k][2] + "/" + date.toString();
        all_urls.push(url)
    }
    return all_urls
}


async function get_fixtures(venue_usage, leagues, date) {
    const head = 'https://cors.bridged.cc/vwa.bracketpal.com/dailyform/';
    var fixtures_list = [];
    var html_list = [];

    if (venue_usage.includes("Methodist Ladies College")) {
        venue_usage.push("MLC");
    }

    for(var x = 0; x < all_html.length; x++) {
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(all_html[x], 'text/html');
        try {
            var table = htmlDoc.getElementsByTagName("table")[2]
            var rowLength = table.rows.length;
            for (var i = 1; i < rowLength; i++) {
                var cells = table.rows.item(i).cells;
                var venue = cells.item(1).innerText;
                console.log(venue);
                var venue_split = venue.split(" Ct")
                var zero_venue_split = venue_split[0].replaceAll(" Ct", "");
                ;
                if (venue_usage.includes(zero_venue_split)) {
                    var court = cells.item(1).innerText.split("Ct")[1];
                    var team_a = cells.item(2).innerText;
                    var team_b = cells.item(5).innerText;
                    var duty = " ";
                    var time_hr = " ";
                    var time_min = " ";
                    try {
                        duty = cells.item(7).innerText.slice(5);
                    } catch (e) {
                        console.log(e)
                        duty = " ";
                    }
                    var division = leagues[j];
                    console.log(division)
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
                    var venue_full = VENUE_SPLIT[zero_venue_split.toLowerCase()].replaceAll("*", " ").trimLeft();
                    var sorting = venue_full + " " + court + " " + time_hr
                    var fix = new Fixture(zero_venue_split, venue_0, venue_1, venue_2, venue_full, court,
                        team_a, team_b, duty, division, date_dd, date_mm, date_yyyy, time_hr, time_min, sorting)

                    fixtures_list.push(fix)
                    console.log(fixtures_list)
                } else {
                    console.log("UNUSED VENUE")
                    console.log(zero_venue_split)
                }

            }
        } catch (e) {
            console.log(e + " " + url)
        }
    }
    return fixtures_list
    /*
    for (var j = 0; j < leagues.length; j++){
        console.log(leagues[j])
        console.log("list of leagues")
        var url = head + leagues[j][2] + "/" + date.toString();
        var xhttp;
        fetch(url).then(responseText => {

        //xhttp = new XMLHttpRequest();
        //xhttp.onreadystatechange = function () {
        //    if (this.readyState == 4 && this.status == 200) {
                console.log(url)
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(responseText, 'text/html');
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
                            console.log(division)
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

                            fixtures_list.push(fix)
                            console.log(fixtures_list)
                        } else {
                            console.log("UNUSED VENUE")
                            console.log(zero_venue_split)
                        }

                    }
                } catch (e) {
                    console.log(e + " " + url)
                }
            }
        }
        xhttp.open("GET", url, false);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
        xhttp.send();
    } */
    //var sorted_fixtures = fixtures.sort((a,b) => (a.sorting > b.sorting) ? 1 : ((b.sorting > a.sorting) ? -1 : 0))
    //console.log(sorted_fixtures)
}

function measureText(string, fontSize = 10) {
    const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1546875,0.278125,0.4,0.721875,0.5609375,0.9609375,0.7203125,0.240625,0.4,0.4,0.48125,0.640625,0.278125,0.4,0.278125,0.4015625,0.5609375,0.55625,0.5609375,0.5609375,0.640625,0.5609375,0.5609375,0.5609375,0.5609375,0.5609375,0.278125,0.278125,0.640625,0.640625,0.640625,0.5609375,1.1203125,0.88125,0.7203125,0.8,0.7234375,0.7203125,0.640625,0.8,0.7234375,0.278125,0.5,0.8,0.640625,0.88125,0.7234375,0.8,0.7203125,0.8,0.8,0.7203125,0.640625,0.7234375,0.8015625,1.121875,0.8015625,0.8015625,0.721875,0.3203125,0.48125,0.3203125,0.48125,0.721875,0.334375,0.5609375,0.640625,0.5609375,0.5609375,0.5609375,0.48125,0.5609375,0.5609375,0.240625,0.321875,0.5609375,0.240625,0.88125,0.5609375,0.5609375,0.640625,0.5609375,0.4,0.5609375,0.4015625,0.5609375,0.6421875,0.88125,0.6421875,0.6421875,0.6421875,0.4,0.2609375,0.48125,0.640625]
    const avg = 0.5823026315789476
    try {
        var tmp = string
            .split('')
            .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
            .reduce((cur, acc) => acc + cur) * fontSize
        return tmp / 2;
    }catch{return 0}
}

function measureBold(string, fontSize = 10) {
    const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1265625,0.334375,0.409375,0.6421875,0.5609375,0.88125,0.8,0.18125,0.4,0.4,0.5,0.721875,0.25,0.4,0.25,0.4015625,0.5609375,0.5,0.5609375,0.5,0.5609375,0.5,0.5609375,0.5609375,0.5609375,0.5609375,0.278125,0.3203125,0.721875,0.721875,0.721875,0.48125,0.9609375,0.88125,0.8015625,0.7203125,0.88125,0.721875,0.721875,0.8,0.88125,0.4,0.5625,0.88125,0.721875,1.0421875,0.88125,0.8,0.721875,0.8,0.88125,0.5609375,0.640625,0.88125,0.88125,1.040625,0.88125,0.8,0.8015625,0.4,0.4015625,0.334375,0.6421875,0.6421875,0.334375,0.5609375,0.6421875,0.48125,0.5609375,0.48125,0.5609375,0.5609375,0.6421875,0.3203125,0.4390625,0.6421875,0.3203125,0.9625,0.6421875,0.5609375,0.6421875,0.5609375,0.48125,0.4,0.4015625,0.6421875,0.6421875,0.88125,0.6421875,0.6421875,0.5625,0.48125,0.2015625,0.48125,0.721875]
    const avg = 0.5999835526315791
    try {
        var tmp = string
            .split('')
            .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
            .reduce((cur, acc) => acc + cur) * fontSize
        return tmp / 2;
    }catch{return 0}
}


// Function to fetch Github info of a user.
const fetchGithubInfo = async (url) => {
  const githubInfo = await fetch(url).then((response) => response.text())
    return githubInfo // API call to get user info from Github.
}

// Iterates all users and returns their Github info.
const fetchUserInfo = async (url_list) => {
  const requests = url_list.map((url_ind) => {
    return fetchGithubInfo(url_ind) // Async function that fetches the user info.
     .then((a) => {
      return a // Returns the user info.
      })
  })
  return Promise.all(requests) // Waiting for all the requests to get resolved.
}


fetchUserInfo(['sindresorhus', 'yyx990803', 'gaearon'])
 .then(a => console.log(JSON.stringify(a)))

/* Client side, works in Chrome 55 and Firefox 52 without transpilation */
//https://blogs.msdn.microsoft.com/typescript/2016/11/08/typescript-2-1-rc-better-inference-async-functions-and-more/
async function fetchURLs(urls) {
try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
    var list_of_all = async (url)
      var data = await Promise.all([
        /* Alternatively store each in an array */
        // var [x, y, z] = await Promise.all([
        // parse results as json; fetch data response has several reader methods available:
        //.arrayBuffer()
        //.blob()
        //.formData()
        //.json()
        //.text()
        fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.text()),// parse each response as json
        fetch('https://jsonplaceholder.typicode.com/albums').then((response) => response.text()),
        fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.text())
      ]);

      for (var i of data) {
        console.log(`RESPONSE ITEM \n`);
        for (var obj of i) {
          console.log(obj);
          //logger utility method, logs output to screen
          console.log(obj);
        }
      }

    } catch (error) {
      console.log(error);
    }
}
