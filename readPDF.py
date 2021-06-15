import pandas as pd
import definitions


def get_fixtures(venues, league, date):
    head = 'https://vwa.bracketpal.com/dailyform/'
    fixtures = list()
    if "Methodist Ladies College" in venues:
        venues.append("MLC")
    print(venues)
    for i in league:
        print("---------")
        url = head + str(i) + "/" + str(date)
        table_MN = pd.read_html(url)
        try:
            df = table_MN[2]
            for index, row in df.iterrows():
                if row[0] != "Time" and type(row[1]) != type(0.01):
                    venue = row[1].split(" Ct")[0].replace(" Ct", "")
                    print(venue)
                    if venue in venues:
                        court = row[1].split("Ct")[1]
                        team_a = row[2]
                        team_b = row[5]
                        try:
                            duty = row[7][5:]
                        except (TypeError, KeyError):
                            duty = " "
                        division = definitions.div_dict[url.split('/')[-2]]
                        _date = url.split('/')[-1].split('-')
                        date_dd = _date[2]
                        date_mm = _date[1]
                        date_yyyy = _date[0]
                        print(row)
                        if type(row[0]) == type(0.01):
                            time = ""
                            time_hr = " "
                            time_min = " "
                        else:
                            time = row[0].split(':')
                            time_hr = time[0].zfill(2)
                            time_min = time[1]

                        tmp_venue = definitions.venues_dict[venue.lower()].split("*")
                        venue_0 = tmp_venue[0]
                        venue_1 = tmp_venue[1]
                        venue_2 = tmp_venue[2]
                        venue_full = " ".join(tmp_venue)

                        fixture = definitions.Fixture(venue, venue_0, venue_1, venue_2, venue_full, court, team_a,
                                                      team_b, duty, division, date_dd, date_mm, date_yyyy, time_hr,
                                                      time_min)
                        fixtures.append(fixture)
                    else:
                        print(venue)
        except IndexError:
            pass

    return fixtures


def full_pdf(fixtures, token, files):
    for fixture in fixtures:
        file_out = definitions.APP_ROOT + "\\Scoresheets\\temp\\" + token + "\\" + fixture.venue + "-" \
                   + fixture.court + "-" + fixture.time_hr + fixture.time_min + ".pdf"
        canvas_data = definitions.get_overlay_canvas_wavl(fixture)
        form = definitions.merge(canvas_data, template_path=definitions.wavl_pdf_default)
        definitions.save(form, filename=file_out)
        files.append(file_out)
    return files


def jl_pdf(fixtures, token, files):
    for fixture in fixtures:
        file_out = definitions.APP_ROOT + "\\Scoresheets\\temp\\" + token + "\\" + fixture.venue + "-" \
                   + fixture.court + "-" + fixture.time_hr + fixture.time_min + ".pdf"
        canvas_data = definitions.get_overlay_canvas_jl(fixture)
        form = definitions.merge(canvas_data, template_path=definitions.jl_pdf_default)
        definitions.save(form, filename=file_out)
        files.append(file_out)
    return files


def gen_pdfs(fixtures, date):
    all_files = []
    for fixture in fixtures:
        file_out = definitions.APP_ROOT + "\\Scoresheets\\temp\\" + date + "\\" + fixture.venue + "-" \
                   + fixture.court + "-" + fixture.time_hr + fixture.time_min + "-" + fixture.division[2] + ".pdf"
        if fixture.division[2] in definitions.jl_div_list:
            canvas_data = definitions.get_overlay_canvas_jl(fixture)
            form = definitions.merge(canvas_data, template_path=definitions.jl_pdf_default)
        if fixture.division[2] in definitions.wavl_div_list:
            canvas_data = definitions.get_overlay_canvas_wavl(fixture)
            form = definitions.merge(canvas_data, template_path=definitions.wavl_pdf_default)
        definitions.save(form, filename=file_out)
        all_files.append(file_out)
    return all_files


def gen_file_list(all_files, venue_usage, wavl_usage, wavjl_usage):
    file_list = []

    for file in all_files:
        splitted = file.split('\\')[-1].split("-")
        venue = splitted[0]
        division = splitted[-1].replace(".pdf", "")

        if venue in venue_usage and (division in wavl_usage or division in wavjl_usage):
            file_list.append(file)
    return file_list


def generate_output(files, token):
    output = definitions.APP_ROOT + "\\output\\" + token + ".pdf"
    files.sort()
    definitions.merge_pdfs(files, output)
