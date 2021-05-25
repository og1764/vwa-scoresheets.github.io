import pandas as pd
import definitions
import os.path
import random
import string
import readPDF
from flask import Flask, render_template, request, send_from_directory, Response
from flask import Flask, render_template, session, request, redirect, url_for
from flask import send_file
import jinja2

app = Flask(__name__)


@app.route("/")
def home():
    items = []
    venues = definitions.venues_list
    wavl = definitions.wavl_div_list
    wavjl = definitions.jl_div_list

    for i in range(max(len(venues), len(wavl), len(wavjl))):
        venue_id = "venue_" + str(i)
        wavl_id = "wavl_" + str(i)
        wavjl_id = "wavjl_" + str(i)

        try:
            venue_name = venues[i]
            venue_exists = True
        except:
            venue_name = ""
            venue_exists = False
        try:
            wavl_name = definitions.div_dict[wavl[i]][0]
            wavl_exists = True
        except:
            wavl_name = ""
            wavl_exists = False
        try:
            wavjl_name = definitions.div_dict[wavjl[i]][0]
            wavjl_exists = True
        except:
            wavjl_name = ""
            wavjl_exists = False

        venue_dict = dict(id=venue_id, name=venue_name, exists=venue_exists)
        wavl_dict = dict(id=wavl_id, name=wavl_name, exists=wavl_exists)
        wavjl_dict = dict(id=wavjl_id, name=wavjl_name, exists=wavjl_exists)

        item = dict(wavl=wavl_dict, venue=venue_dict, wavjl=wavjl_dict)

        items.append(item)

    return render_template("vwa-export.html", items=items)


@app.route("/WAVL/PUT", methods=["PUT", "POST"])
def WAVL():
    venue_str = request.headers.get("VENUES")
    wavl_str = request.headers.get("WAVL")
    wavjl_str = request.headers.get("WAVjL")
    date = request.headers.get("yyyymmdd") # yyyy-mm-dd

    venue_usage = [definitions.venues_list[i] for i in range(len(definitions.venues_list)) if venue_str[i] == "1"]
    wavl_usage = [definitions.wavl_div_list[i] for i in range(len(definitions.wavl_div_list)) if wavl_str[i] == "1"]
    wavjl_usage = [definitions.jl_div_list[i] for i in range(len(definitions.jl_div_list)) if wavjl_str[i] == "1"]

    # token generation
    token = ''.join(random.choice(string.ascii_letters) for i in range(12))
    while os.path.exists(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + token):
        token = ''.join(random.choice(string.ascii_letters) for i in range(12))
    os.mkdir(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + token)

    wavl_fixtures = readPDF.get_fixtures(venue_usage, wavl_usage, date)
    wavjl_fixtures = readPDF.get_fixtures(venue_usage, wavjl_usage, date)

    wavl_files = readPDF.full_pdf(wavl_fixtures, token, list())
    wavjl_files = readPDF.jl_pdf(wavjl_fixtures, token, list())

    files = wavl_files + wavjl_files
    readPDF.generate_output(files, token)

    return token


@app.route("/WAVL/download/<token>", methods=["GET"])
def WAVL_download(token):
    token2 = request.headers.get("TOKEN")
    #print(token2)
    #print(definitions.APP_ROOT)
    #print(token)
    result = send_file(definitions.APP_ROOT + "\\output\\" + token + ".pdf",
                       mimetype="application/pdf",
                       as_attachment=True,
                       conditional=False,
                       attachment_filename="Scoresheets.pdf")
    result.headers["x-suggested-filename"] = "Scoresheets.pdf"
    return result


if __name__ == "__main__":
    app.run(host='localhost', port=5000)