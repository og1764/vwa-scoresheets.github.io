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
import shutil
import time
import datetime

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

    return render_template("volleyballwa.github.io.html", items=items)


@app.route("/WAVL/PUT", methods=["PUT", "POST", "GET"])
def WAVL():
    print('start')
    token = request.headers.get("TOKEN")
    force = request.headers.get("FORCE")
    venue_str = ""
    wavl_str = ""
    wavjl_str = ""
    date = ""
    venue_usage = []
    wavl_usage = []
    wavjl_usage = []

    # parsed_token = [Venues, WAVL, WAVJL, yyyy-mm-dd]
    parsed_token = definitions.decrypt_token(token)
    venue_str = parsed_token[0]
    wavl_str = parsed_token[1]
    wavjl_str = parsed_token[2]
    date = parsed_token[3]
    print(venue_str)
    venue_usage = [definitions.venues_list[i] for i in range(len(definitions.venues_list)) if venue_str[i] == "1"]
    wavl_usage = [definitions.wavl_div_list[i] for i in range(len(definitions.wavl_div_list)) if wavl_str[i] == "1"]
    wavjl_usage = [definitions.jl_div_list[i] for i in range(len(definitions.jl_div_list)) if wavjl_str[i] == "1"]

    if os.path.exists(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + date) \
            or os.path.isfile(definitions.APP_ROOT + "\\output\\" + token + ".pdf"):
        print(80)
        if force != "true":
            print(82)
            print(force)
            try:
                shutil.rmtree(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + date)
            except:
                pass
            try:
                os.rmdir(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + date)
            except:
                pass
            os.mkdir(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + date)
            try:
                os.remove(definitions.APP_ROOT + "\\output\\" + token + ".pdf")
            except:
                pass
        else:
            if os.path.isfile(definitions.APP_ROOT + "\\output\\" + token + ".pdf"):
                waitcounter = 0
                print(95)
                while not os.path.isfile(definitions.APP_ROOT + "\\output\\" + token + ".pdf"):
                    print(97)
                    time.sleep(10)
                    waitcounter += 1
                    if waitcounter > 10:
                        return "timeout", 408
                #result = send_file(definitions.APP_ROOT + "\\output\\" + token + ".pdf",
                #                   mimetype="application/pdf",
                #                   as_attachment=True,
                #                   conditional=False,
                #                   attachment_filename="Scoresheets.pdf")
                #result.headers["x-suggested-filename"] = "Scoresheets.pdf"
                return "True"
            else:
                print(117)
                directory = definitions.APP_ROOT + "\\Scoresheets\\temp\\" + date + "\\"

                all_files = [directory + i for i in os.listdir(directory)]

                files = readPDF.gen_file_list(all_files, venue_usage, wavl_usage, wavjl_usage)

                readPDF.generate_output(files, token)

                result = send_file(definitions.APP_ROOT + "\\output\\" + token + ".pdf",
                                   mimetype="application/pdf",
                                   as_attachment=True,
                                   conditional=False,
                                   attachment_filename="Scoresheets.pdf")
                result.headers["x-suggested-filename"] = "Scoresheets.pdf"
                return "True"

    print(109)
    try:
        os.mkdir(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + date)
    except FileExistsError:
        pass

    # get fixtures for ALL matches on that date
    # save PDF's to TEMP with a useful filename
    # probably somthing like:
    # venue - division(int) - (current filename)
    # files = gen_file_list(all_files, venue_usage, wavl_usage, wavjl_usage)

    all_div_list = definitions.wavl_div_list + definitions.jl_div_list

    all_fixtures = readPDF.get_fixtures(definitions.venues_list, all_div_list, date)

    all_files = readPDF.gen_pdfs(all_fixtures, date)

    files = readPDF.gen_file_list(all_files, venue_usage, wavl_usage, wavjl_usage)

    #wavl_fixtures = readPDF.get_fixtures(venue_usage, wavl_usage, date)
    #wavjl_fixtures = readPDF.get_fixtures(venue_usage, wavjl_usage, date)

    #wavl_files = readPDF.full_pdf(wavl_fixtures, token, list())
    #wavjl_files = readPDF.jl_pdf(wavjl_fixtures, token, list())

    #files = wavl_files + wavjl_files
    readPDF.generate_output(files, token)

    result = send_file(definitions.APP_ROOT + "\\output\\" + token + ".pdf",
                       mimetype="application/pdf",
                       as_attachment=True,
                       conditional=False,
                       attachment_filename="Scoresheets.pdf")
    result.headers["x-suggested-filename"] = "Scoresheets.pdf"
    return "True"


@app.route("/WAVL/download/<token>", methods=["GET"])
def WAVL_download(token):
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


@app.route("/cleanup", methods=["GET"])
def cleanup():
    directory = os.fsencode(definitions.APP_ROOT + "\\output\\")

    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        print(filename)
        if filename != "placeholder_for_github.txt":
            file_date = datetime.datetime.strptime(filename[0:10], "%Y-%m-%d") + datetime.timedelta(days=2)
            curr_date = datetime.datetime.now()
            if file_date < curr_date:
                os.remove(definitions.APP_ROOT + "\\output\\" + str(filename))
                shutil.rmtree(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + str(filename[0:10]))

    return "True"


if __name__ == "__main__":
    app.run(host='localhost', port=5000)
