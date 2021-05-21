import pandas as pd
import definitions
import os.path
import random
import string
import readPDF
from flask import Flask, render_template, request, send_from_directory, Response
from flask import Flask, render_template, session, request, redirect, url_for
from flask import send_file

app = Flask(__name__)


@app.route("/WAVL")
def home():
    return render_template("home.html")


@app.route("/WAVL/PUT", methods=["PUT", "POST"])
def WAVL():
    venue_str = request.headers.get("VENUES")
    div_str = request.headers.get("DIVISIONS")
    date = request.headers.get("yyyymmdd") # yyyy-mm-dd

    # TODO: Add Venues
    #venue_usage = [definitions.venues_list[i] for i in range(len(definitions.venues_list)) if venue_str[i] == "1"]
    #league_usage = [definitions.wavl_div_list[i] for i in range(len(definitions.wavl_div_list)) if div_str[i] == "1"]

    date = "2021-05-21"
    league_usage = definitions.jl_div_list
    #venue_usage = definitions.venues_list
    venue_usage=["The Rise"]

    # token generation
    token = ''.join(random.choice(string.ascii_letters) for i in range(12))
    while os.path.exists(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + token):
        token = ''.join(random.choice(string.ascii_letters) for i in range(12))
    os.mkdir(definitions.APP_ROOT + "\\Scoresheets\\temp\\" + token)

    fixtures = readPDF.get_fixtures(venue_usage, league_usage, date)

    files = readPDF.jl_pdf(fixtures, token, list())

    readPDF.generate_output(files, token)

    return token


@app.route("/WAVL/download/<token>", methods=["GET"])
def WAVL_download(token):
    token2 = request.headers.get("TOKEN")
    print(token2)
    print(definitions.APP_ROOT)
    print(token)
    return send_file(definitions.APP_ROOT + "\\output\\" + token + ".pdf")



#token = ''.join(random.choice(string.ascii_letters) for i in range(12))
#while os.path.exists(definitions.APP_ROOT + "\\WAVL Scoresheets\\temp\\" + token):
#    token = ''.join(random.choice(string.ascii_letters) for i in range(12))
#
#os.mkdir(definitions.APP_ROOT + "\\WAVL Scoresheets\\temp\\" + token)
'''
_date = "2021-05-16"
# leagues = ["83"]
leagues = ["80", "81", "82", "83", "94", "95", "96", "97", "98", "99", "100", "101"]
head = 'https://vwa.bracketpal.com/dailyform/'
fixtures = list()

for i in leagues:
    url = head + str(i) + "/" + _date
    table_MN = pd.read_html(url)
    try:
        df = table_MN[2]
        for index, row in df.iterrows():
            if row[0] != "Time" and type(row[1]) != type(0.01):
                venue = row[1].split(" Ct")[0].replace(" Ct", "")
                court = row[1].split("Ct")[1]
                team_a = row[2]
                team_b = row[5]
                try:
                    duty = row[7][5:]
                except TypeError:
                    duty = " "
                division = definitions.div_dict[url.split('/')[-2]][1]
                date = url.split('/')[-1].split('-')
                date_dd = date[2]
                date_mm = date[1]
                date_yyyy = date[0]
                time = row[0].split(':')
                time_hr = time[0].zfill(2)
                time_min = time[1]

                tmp_venue = definitions.venues_dict[venue.lower()].split("*")
                venue_0 = tmp_venue[0]
                venue_1 = tmp_venue[1]
                venue_2 = tmp_venue[2]

                fixture = definitions.Fixture(venue, venue_0, venue_1, venue_2, court, team_a, team_b, duty, division,
                                              date_dd, date_mm, date_yyyy, time_hr, time_min)
                fixtures.append(fixture)
    except IndexError:
        pass



wavl_pdf_default = definitions.APP_ROOT + "\\WAVL Scoresheets\\def.pdf"

files = []
for i in fixtures:
    file_out = definitions.APP_ROOT + "\\WAVL Scoresheets\\temp\\" + token + "\\" + i.venue + "-" + i.court + "-" + i.time_hr + i.time_min + ".pdf"
    canvas_data = definitions.get_overlay_canvas(i)
    form = definitions.merge(canvas_data, template_path=wavl_pdf_default)
    definitions.save(form, filename=file_out)
    files.append(file_out)

output = definitions.APP_ROOT + "\\WAVL Scoresheets\\output\\" + token + ".pdf"
files.sort()
definitions.merge_pdfs(files, output)
'''
# df.info()
# df[0].astype('string')
# df.head()
# df.info()
# print(x.text)

# table = etree.HTML(x.text).findall("body/table")
# first_table = table[0]
# table_as_list = list(first_table)
# table_headers = [col.text for col in table_as_list[0]]
# table_list_dict = [dict(zip(table_headers, [col.text for col in row])) for row in table_as_list[1:]]
# [print(dictionary) for dictionary in table_list_dict]


if __name__ == "__main__":
    app.run(host='localhost', port=5000)