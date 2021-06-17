const __CONFIG__ = {
  "venues": [
    {"name": "Cockburn",
      "top": "",
      "mid": "",
      "bot": "Cockburn",
      "alias": []
    },
    {"name": "Loftus",
      "top": "",
      "mid": "",
      "bot": "Loftus",
      "alias": []
    },
    {"name": "Warwick",
      "top": "",
      "mid": "",
      "bot": "Warwick",
      "alias": ["Warwick Stadium"]
    },
    {"name": "Aquinas College",
      "top": "",
      "mid": "Aquinas",
      "bot": "College",
      "alias": ["Aquinas"]
    },
    {"name": "Bendat",
      "top": "",
      "mid": "",
      "bot": "Bendat",
      "alias": []
    },
    {"name": "Curtin Stadium",
      "top": "",
      "mid": "Curtin",
      "bot": "Stadium",
      "alias": ["Curtin"]
    },
    {"name": "ECU Mt. Lawley",
      "top": "",
      "mid": "ECU",
      "bot": "Mt. Lawley",
      "alias": ["ECU", "ECU Mount Lawley"]
    },
    {"name": "Geographe Leisure Centre",
      "top": "Geographe",
      "mid": "Leisure",
      "bot": "Centre",
      "alias": ["Geographe", "Geographe Leisure"]
    },
    {"name": "Kingsway",
      "top": "",
      "mid": "",
      "bot": "Kingsway",
      "alias": []
    },
    {"name": "Mandurah ARC",
      "top": "",
      "mid": "Mandurah",
      "bot": "ARC",
      "alias": []
    },
    {"name": "MBC",
      "top": "",
      "mid": "",
      "bot": "MBC",
      "alias": ["Mandurah Baptist College"]
    },
    {"name": "Melville LeisureFit",
      "top": "",
      "mid": "Melville",
      "bot": "LeisureFit",
      "alias": []
    },
    {"name": "Methodist Ladies College",
      "top": "Methodist",
      "mid": "Ladies",
      "bot": "College",
      "alias": ["MLC", "Methodist L. Col"]
    },
    {"name": "Penrhos College",
      "top": "",
      "mid": "Penrhos",
      "bot": "College",
      "alias": ["Penrhos"]
    },
    {"name": "Rossmoyne",
      "top": "",
      "mid": "",
      "bot": "Rossmoyne",
      "alias": []
    },
    {"name": "St Mary's",
      "top": "",
      "mid": "",
      "bot": "St Mary's",
      "alias": []
    },
    {"name": "The Rise",
      "top": "",
      "mid": "",
      "bot": "The Rise",
      "alias": []
    },
    {"name": "UWA Recreation Centre",
      "top": "UWA",
      "mid": "Recreation",
      "bot": "Centre",
      "alias": ["UWA", "UWA Rec. Centre"]
    },
    {"name": "Wesley College",
      "top": "",
      "mid": "Wesley",
      "bot": "College",
      "alias": ["Wesley"]
    }
  ],
  "wavl": [
    { "id": 80,
      "long": "State League Women",
      "short": "SL Women"
    },
    { "id": 81,
      "long": "State League Men",
      "short": "SL Men"
    },
    { "id": 82,
      "long": "State League Reserve Women",
      "short": "SLR Women"
    },
    { "id": 83,
      "long": "State League Reserve Men",
      "short": "SLR Men"
    },
    { "id": 94,
      "long": "Division 1 Women",
      "short": "Div 1 W"
    },
    { "id": 95,
      "long": "Division 1 Men",
      "short": "Div 1 M"
    },
    { "id": 96,
      "long": "Division 2 Women",
      "short": "Div 2 W"
    },
    { "id": 97,
      "long": "Division 2 Men",
      "short": "Div 2 M"
    },
    { "id": 98,
      "long": "Division 3 Women",
      "short": "Div 3 W"
    },
    { "id": 99,
      "long": "Division 3 Men",
      "short": "Div 3 M"
    },
    { "id": 100,
      "long": "Division 4 Men",
      "short": "Div 4 M"
    },
    { "id": 101,
      "long": "Division 5 Men",
      "short": "Div 5 M"
    }
  ],
  "jl": [
    { "id": 84,
      "long": "7/8 Female Pool 1",
      "short": "7/8 F 1"
    },
    { "id": 85,
      "long": "7/8 Female Pool 2",
      "short": "7/8 F 2"
    },
    { "id": 92,
      "long": "7/8 Male",
      "short": "7/8 M"
    },
    { "id": 86,
      "long": "9/10 Female Pool 1",
      "short": "9/10 F 1"
    },
    { "id": 87,
      "long": "9/10 Female Pool 2",
      "short": "9/10 F 2"
    },
    { "id": 90,
      "long": "9/10 Male Pool 1",
      "short": "9/10 M 1"
    },
    { "id": 91,
      "long": "9/10 Male Pool 2",
      "short": "9/10 M 2"
    },
    { "id": 88,
      "long": "11/12 Female",
      "short": "SL Women"
    },
    { "id": 89,
      "long": "11/12 Male",
      "short": "11/12 M"
    }
  ], "div": {80:["W", "State League Women", "SL W"]}

}









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

    var fixtures = []
    //modifyPdf(fixtures[0]).then(value => {mix.push(value)})
    //modifyPdf(fixtures[1]).then(value => {mix.push(value)})

    for(var i = 0; i < leagues.length; i++){
        var indiv = get_single_fixture(venues, leagues[i], date);
        console.log(indiv);
        fixtures.push(indiv);
    }

    //Promise.all(get_fixtures(venues, leagues, date)).then(fix_val => {
    Promise.all(fixtures).then(fix_val => {
        modifyPdf(fix_val, venues, leagues, date).then(value => {
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


async function get_single_fixture(venues, division, date){
    const {PDFDocument, StandardFonts, rgb} = PDFLib;
    axios;
    const head = 'https://cors.bridged.cc/vwa.bracketpal.com/dailyform/';

    var url = head + division[2] + "/" + date.toString();
    return await axios.get(url)
}

// [zero_venue_split, _venue_0, _venue_1, _venue_2, _venue_full, _court, _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting]
// [     0              1          2          3          4         5        6         7     8         9        10         11         12        13          14       15
async function modifyPdf(fix, venues, leagues, dates) {
    console.log(venues);
    console.log(leagues);
    var fixtures = html_to_fixture(venues, leagues, dates, fix)

    const {PDFDocument, StandardFonts, rgb} = PDFLib;
    var total = new Array(fixtures.length);
    console.log(fixtures)
    for (var i = 0; i < fixtures.length; i++) {
        var url = "";
        console.log(fixtures[i][9])
        if(fixtures[i][9][0][0] == "D" ||  fixtures[i][9][0][0] == "S"){
            url = "../static/def.pdf";
        }else{
            url = "../static/def_jl.pdf";
        }

        var existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        var pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes)
        var helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica)
        var helveticaBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
        var pages = await pdfDoc.getPages()
        var firstPage = await pages[0]

        if(fixtures[i][9][0][0] == "D" ||  fixtures[i][9][0][0] == "S"){
            await firstPage.drawText(fixtures[i][1], {
                x: parseInt((310 - measureText(fixtures[i][1],10)).toString()),
                y: 575,
                size: 10,
                font: helveticaFont
            })
            await firstPage.drawText(fixtures[i][2], {
                x: parseInt((310 - measureText(fixtures[i][2],10)).toString()),
                y: 566,
                size: 10,
                font: helveticaFont
            })
            await firstPage.drawText(fixtures[i][3], {
                x: parseInt((310 - measureText(fixtures[i][3],10)).toString()),
                y: 557,
                size: 10,
                font: helveticaFont
            })
            await firstPage.drawText(fixtures[i][5], {
                x: parseInt((400 - measureBold(fixtures[i][5],13)).toString()),
                y: 557,
                size: 13,
                font: helveticaBold
            })
            try {
                var hour = " ";
                if (parseInt(fixtures[i][13]).toString().length == 1) {
                    hour = " " + parseInt(fixtures[i][13]).toString()
                }else{hour = parseInt(fixtures[i][13]).toString()}
                await firstPage.drawText(hour, {
                    x: parseInt((492 - measureBold(hour,13) - measureBold(hour,13)).toString()),
                    y: 557,
                    size: 13,
                    font: helveticaBold
                })
                await firstPage.drawText(fixtures[i][14], {
                    x: 500,
                    y: 557,
                    size: 13,
                    font: helveticaBold
                })
            }catch (e){console.log(e);}
            // catch - continue
            var dd = " ";
            if (parseInt(fixtures[i][10]).toString().length == 1) {
                dd = " " + parseInt(fixtures[i][10]).toString()
            }else{dd = parseInt(fixtures[i][10]).toString()}

            await firstPage.drawText(dd, {
                x: parseInt((596 - measureBold(dd,13) - measureBold(dd,13)).toString()),
                y: 557,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(parseInt(fixtures[i][11]).toString(), {
                x: parseInt((613 - measureBold(fixtures[i][11],13)).toString()),
                y: 557,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(fixtures[i][12].slice(2,4), {
                x: 625,
                y: 557,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(fixtures[i][9][1], {
                x: parseInt((773 - measureBold(fixtures[i][9][1],13)).toString()),
                y: 557.5,
                size: 13,
                font: helveticaBold
            })
            await firstPage.drawText(fixtures[i][8], {
                x: parseInt((710 - measureText(fixtures[i][8],14)).toString()),
                y: 528,
                size: 14,
                font: helveticaFont
            })
            // if length > 18
            if(fixtures[i][6].length > 18 || fixtures[i][7].length > 18) {
                await firstPage.drawText(fixtures[i][6], {
                    x: parseInt((320 - measureText(fixtures[i][6],10)).toString()),
                    y: 527,
                    size: 10,
                    font: helveticaFont
                })
                await firstPage.drawText(fixtures[i][7], {
                    x: parseInt((460 - measureText(fixtures[i][7],10)).toString()),
                    y: 527,
                    size: 10,
                    font: helveticaFont
                })
            }else {
                pdfDoc.TextAlignment = 1;
                await firstPage.drawText(fixtures[i][6], {
                    x: parseInt((320 - measureText(fixtures[i][6],14)).toString()),
                    y: 527,
                    size: 14,
                    font: helveticaFont
                })
                await firstPage.drawText(fixtures[i][7], {
                    x: parseInt((460 - measureText(fixtures[i][7],14)).toString()),
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
    console.log(documents);
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

function div_from_id(id){
    for(var i = 0; i < __CONFIG__.wavl.length; i++){
        if(__CONFIG__.wavl[i].id == id){
            return [__CONFIG__.wavl[i].long,__CONFIG__.wavl[i].short,__CONFIG__.wavl[i].id]
        }
    }
    for(var i = 0; i < __CONFIG__.jl.length; i++){
        if(__CONFIG__.jl[i].id == id) {
            return [__CONFIG__.jl[i].long, __CONFIG__.jl[i].short, __CONFIG__.jl[i].id]
        }
    }
    return false
}

function add_aliases(venues){
    var resultant = [];
    var low_venues = [];
    for(var j = 0; j < venues.length; j++){low_venues.push(venues[j].toLowerCase())}

    console.log(low_venues)
    for(var i = 0; i < __CONFIG__.venues.length; i++){
        console.log(__CONFIG__.venues[i].name.toLowerCase())
        if(low_venues.includes(__CONFIG__.venues[i].name.toLowerCase())){
            resultant.push(__CONFIG__.venues[i].name);
            for(var k = 0; k < __CONFIG__.venues[i].alias.length; k++){
                var _alias = __CONFIG__.venues[i].alias[k];
                resultant.push(_alias)
            }
        }
    }
    return resultant;
}

function html_to_fixture(venues, leagues, date, all_html) {
    let fixtures_list = []
    console.log(leagues);
    console.log(all_html);
    let venue_usage = add_aliases(venues);
    console.log(venue_usage)
    console.log("HERE HERE HERE")
    for(let x = 0; x < all_html.length; x++) {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(all_html[x].data, 'text/html');
        console.log(all_html[x].request.responseURL)
        try {
            let div_table = htmlDoc.getElementsByTagName("table")[1]
            console.log("***")
            console.log(div_table.rows.item(1).cells.item(2).innerText)
            let temp_div = DIVISIONS[div_table.rows.item(1).cells.item(2).innerText]
            let table = htmlDoc.getElementsByTagName("table")[2]
            let rowLength = table.rows.length;
            for (let i = 1; i < rowLength; i++) {
                let cells = table.rows.item(i).cells;
                let venue = cells.item(1).innerText;
                console.log(venue);
                let venue_split = venue.split(" Ct")
                let zero_venue_split = venue_split[0].replaceAll(" Ct", "");
                console.log(venue_usage);
                console.log(zero_venue_split);
                if (venue_usage.includes(zero_venue_split)) {
                    let _court = cells.item(1).innerText.split("Ct")[1];
                    const _team_a = cells.item(2).innerText;
                    const _team_b = cells.item(5).innerText;
                    console.log(_team_a);
                    console.log(x)
                    let _duty = " ";
                    let _time_hr = " ";
                    let _time_min = " ";
                    try {
                        _duty = cells.item(7).innerText.slice(5);
                    } catch (e) {
                        console.log(e)
                        _duty = " ";
                    }
                    //var division = leagues[j];
                    let url = all_html[x].request.responseURL;
                    let split_url = url.split('/');
                    let _division = temp_div;

                    //let _division = __CONFIG__
                    console.log(_division)
                    let _date = date.split('-');
                    let _date_dd = _date[2];
                    let _date_mm = _date[1];
                    let _date_yyyy = _date[0]
                    try {
                        let time = cells.item(0).innerText.split(":")
                        _time_hr = time[0].padStart(2, "0");
                        _time_min = time[1];
                    } catch (e) {
                        console.log(e);
                        _time_hr = " ";
                        _time_min = " ";
                    }
                    let _tmp_venue = VENUE_SPLIT[zero_venue_split.toLowerCase()].split("*");
                    const _venue_0 = _tmp_venue[0]
                    const _venue_1 = _tmp_venue[1]
                    const _venue_2 = _tmp_venue[2]
                    let _venue_full = VENUE_SPLIT[zero_venue_split.toLowerCase()].replaceAll("*", " ").trimLeft();
                    let _sorting = _venue_full + " " + _court + " " + _time_hr
                    /*fix['venue'] = zero_venue_split;
                    fix['venue_0'] = _venue_0
                    fix['venue_1'] = _venue_1
                    fix['venue_2'] = _venue_2
                    fix['venue_full'] = _venue_full
                    fix['court'] = _court
                    fix['team_a'] = _team_a
                    fix['team_b'] = _team_b
                    fix['duty'] = _duty
                    fix['division'] = _division
                    fix['date_dd'] = _date_dd
                    fix['date_mm'] = _date_mm
                    fix['date_yyyy'] = _date_yyyy
                    fix['time_hr'] = _time_hr
                    fix['time_min'] = _time_min
                    fix['sorting'] = _sorting
*/
                    console.log(zero_venue_split)
                    console.log(_venue_0)
                    console.log(_venue_1)
                    console.log(_venue_2)
                    console.log(_team_a)
                    console.log(_team_b)
                    console.log(_duty)

                    //const fix = new Fixture(zero_venue_split, _venue_0, _venue_1, _venue_2, _venue_full, _court,
                    //    _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting)
                    //console.log(fix)
                    fixtures_list.push([zero_venue_split, _venue_0, _venue_1, _venue_2, _venue_full, _court,
                        _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting])
                    console.log(fixtures_list)

                } else {
                    console.log("UNUSED VENUE")
                    console.log(zero_venue_split)
                }

            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log(fixtures_list);
    return fixtures_list
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

function generate_Table(){
    var venue_list = [];
    var wavl_list = [];
    var jl_list = [];

    var table = document.getElementById("Table1")

    console.log(__CONFIG__.venues.length)
    console.log(__CONFIG__.wavl.length)
    console.log(__CONFIG__.jl.length)
    console.log(__CONFIG__.jl[3].name)
    for(var i = 0; i < Math.max(__CONFIG__.venues.length, __CONFIG__.wavl.length, __CONFIG__.jl.length); i++){
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        var cell8 = row.insertCell(8);
        var cell9 = row.insertCell(9);

        // venue
        cell0.classList.add("cell12");
        cell0.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        try {
            var venue = __CONFIG__.venues[i];
            cell1.classList.add("cell2")
            cell1.innerHTML = '<div id="venue_' + i.toString() + '" style="display:inline-block;width:16px;height:20px;z-index:56;">' +
                '<input type="checkbox" id="checkvenue_'+ i.toString() + '" name="Venues" value="on" checked="" style="display:inline-block;opacity:0;" title="'+ venue.name +'">' +
                '<label for="checkvenue_'+ i.toString() + '"></label>' +
                '</div>'

            cell2.classList.add("cell9")
            cell2.innerHTML = '<div id="wb_Text8">' +
                '<span style="color:#000000;font-family:Arial;font-size:16px;">' + venue.name + '</span>' +
                '</div>'
        } catch (e) {
            console.log(e)
            cell1.classList.add("cell10")
            cell1.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
            cell2.classList.add("cell11")
            cell2.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
        }

        cell3.classList.add("cell1")
        cell3.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        try{
            var wavl = __CONFIG__.wavl[i];
            cell4.classList.add("cell2")
            cell4.innerHTML = '<div id="wavl_' + i.toString() + '" style="display:inline-block;width:16px;height:20px;z-index:58;">' +
                '<input type="checkbox" id="checkwavl_' + i.toString() + '" name="WAVL_teams" value="on" checked="" style="display:inline-block;opacity:0;" title="' + wavl.long + '">' +
                '<label for="checkwavl_' + i.toString() + '"></label>' +
                '</div>'

            cell5.classList.add("cell9")
            cell5.innerHTML = '<div id="wb_Text32">' +
                '<span style="color:#000000;font-family:Arial;font-size:16px;">' + wavl.long + '</span>' +
                '</div>'
        } catch (e) {
            console.log(e)
            console.log(i)
            cell4.classList.add("cell10")
            cell4.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
            cell5.classList.add("cell11")
            cell5.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
        }

        cell6.classList.add("cell1")
        cell6.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        try{
            var jl = __CONFIG__.jl[i]
            cell7.classList.add("cell2")
            cell7.innerHTML = '<div id="wavjl_' + i.toString() + '" style="display:inline-block;width:16px;height:20px;z-index:60;">' +
                '<input type="checkbox" id="checkwavjl_' + i.toString() + '" name="WAVjL_teams" value="on" checked="" style="display:inline-block;opacity:0;" title="' + jl.long + '">' +
                '<label for="checkwavjl_' + i.toString() + '"></label>' +
                '</div>'

            cell8.classList.add("cell9")
            cell8.innerHTML = '<div id="wb_Text49">' +
                '<span style="color:#000000;font-family:Arial;font-size:16px;">' + jl.long + '</span>' +
                '</div>'
        } catch (e) {
            console.log(e)
            console.log(i)
            cell7.classList.add("cell10")
            cell7.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
            cell8.classList.add("cell11")
            cell8.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        }
    }
    var fin_row = table.insertRow(-1);
    var fin_cell = fin_row.insertCell(0);
    fin_cell.classList.add("cell99")
}

generate_Table()
