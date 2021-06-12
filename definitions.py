import PyPDF2
import os
import io
import pdfrw
import reportlab
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape


class Fixture:
    def __init__(self, venue, venue_0, venue_1, venue_2, venue_full, court, team_a, team_b, duty, division, date_dd,
                 date_mm, date_yyyy, time_hr, time_min):
        self.venue = venue
        self.venue_2 = venue_2
        self.venue_1 = venue_1
        self.venue_0 = venue_0
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
        pass

    def prnt(self):
        print("Venue: %s, Court: %s, A: %s, B: %s, Duty: %s, Division: %s, Date: %s/%s/%s, Time: %s:%s" %
              (self.venue, self.court, self.team_a, self.team_b, self.duty, self.division, self.date_dd, self.date_mm,
               self.date_yyyy, self.time_hr, self.time_min))
        pass

    def get_dict(self):
        return {
            "venue": self.venue,
            "venue_0": self.venue_0,
            "venue_1": self.venue_1,
            "venue_2": self.venue_2,
            "venue_full": self.venue_full,
            "court": self.court,
            "team_a": self.team_a,
            "team_b": self.team_b,
            "duty": self.duty,
            "division": self.division,
            "date_dd": self.date_dd,
            "date_mm": self.date_mm,
            "date_yyyy": self.date_yyyy,
            "time_hr": self.time_hr,
            "time_min": self.time_min
                }

#class Row:
#    def __init__(self, venue, wavl, wavjl):

venues_dict = {
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

venues_list = [
    "Cockburn",
    "Loftus",
    "Warwick",
    "Aquinas College",
    "Bendat",
    "Curtin Stadium",
    "ECU Mt. Lawley",
    "Geographe Leisure",
    "Kingsway",
    "Mandurah ARC",
    "MBC",
    "Melville LeisureFit",
    "Methodist Ladies College",
    "Penrhos College",
    "Rossmoyne",
    "St Mary's",
    "The Rise",
    "UWA Rec. Centre",
    "Wesley College"
]

wavl_div_list = ["80", "81", "82", "83", "94", "95", "96", "97", "98", "99", "100", "101"]

jl_div_list = ['84', '85', '86', '87', '88', '89', '90', '91', '92']

div_dict = {
    '80': ['State League Women', 'SL Women', '80'],
    '81': ['State League Men', 'SL Men', '81'],
    '82': ['State League Reserve Men', 'SLR Men', '82'],
    '83': ['State League Reserve Women', 'SLR Women', '83'],
    '84': ['7/8 Female Pool 1', '7/8 F 1', '84'],
    '85': ['7/8 Female Pool 2', '7/8 F 2', '85'],
    '86': ['9/10 Female Pool 1', '9/10 F 1', '86'],
    '87': ['9/10 Female Pool 2', '9/10 F 2', '87'],
    '88': ['11/12 Female', '11/12 F', '88'],
    '89': ['11/12 Male', '11/12 M', '89'],
    '90': ['9/10 Male Pool 1', '9/10 M 1', '90'],
    '91': ['9/10 Male Pool 2', '9/10 M 2', '91'],
    '92': ['7/8 Male', '7/8 M', '92'],
    '94': ['Division 1 Men', 'Div 1 M', '94'],
    '95': ['Division 1 Women', 'Div 1 Women', '95'],
    '96': ['Division 2 Men', 'Div 2 Men', '96'],
    '97': ['Division 2 Women', 'Div 2 Women', '97'],
    '98': ['Division 3 Men', 'Div 3 Men', '98'],
    '99': ['Division 3 Women', 'Div 3 Women', '99'],
    '100': ['Division 4 Men', 'Div 4 Men', '100'],
    '101': ['Division 5 Men', 'Div 5 Men', '101']
}

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
wavl_pdf_default = APP_ROOT + "\\Scoresheets\\def.pdf"
jl_pdf_default = APP_ROOT + "\\Scoresheets\\def_jl.pdf"


def merge_pdfs(paths, output):
    pdf_writer = PyPDF2.PdfFileWriter()
    for path in paths:
        pdf_reader = PyPDF2.PdfFileReader(path)
        for page in range(pdf_reader.getNumPages()):
            # Add each page to the writer object
            pdf_writer.addPage(pdf_reader.getPage(page))
    # Write out the merged PDF
    with open(output, 'wb') as out:
        pdf_writer.write(out)


def get_overlay_canvas_wavl(fixture) -> io.BytesIO:
    data = io.BytesIO()
    pdf = canvas.Canvas(data)
    pdf.setPageSize(landscape(A4))
    pdf.setFont('Helvetica', 10)
    pdf.drawCentredString(x=310, y=575, text=fixture.venue_0)
    pdf.drawCentredString(x=310, y=566, text=fixture.venue_1)
    pdf.drawCentredString(x=310, y=557, text=fixture.venue_2)
    pdf.setFont('Helvetica-Bold', 13)
    pdf.drawCentredString(x=400, y=557, text=fixture.court)
    try:
        pdf.drawRightString(x=492, y=557, text=str(int(fixture.time_hr)))
        pdf.drawString(x=500, y=557, text=fixture.time_min)
    except ValueError:
        pass
    pdf.drawRightString(x=596, y=557, text=str(int(fixture.date_dd)))
    pdf.drawCentredString(x=610, y=557, text=str(int(fixture.date_mm)))
    pdf.drawString(x=625, y=557, text=fixture.date_yyyy[2:4])
    pdf.drawCentredString(x=773, y=557.5, text=fixture.division[1])
    pdf.setFont('Helvetica', 14)
    pdf.drawCentredString(x=710, y=528, text=fixture.duty)

    if len(fixture.team_a) > 18 or len(fixture.team_b) > 18:
        pdf.setFont('Helvetica', 10)
        pdf.drawCentredString(x=320, y=527, text=fixture.team_a)
        pdf.drawCentredString(x=460, y=527, text=fixture.team_b)
    else:
        pdf.setFont('Helvetica', 14)
        pdf.drawCentredString(x=320, y=527, text=fixture.team_a)
        pdf.drawCentredString(x=460, y=527, text=fixture.team_b)

    pdf.save()
    data.seek(0)
    return data


def get_overlay_canvas_jl(fixture) -> io.BytesIO:
    data = io.BytesIO()
    pdf = canvas.Canvas(data)
    pdf.setPageSize(landscape(A4))
    pdf.setFont('Helvetica', 13)
    pdf.drawCentredString(x=180, y=504, text=fixture.venue_full)
    pdf.drawCentredString(x=562, y=504, text=fixture.court)
    pdf.drawString(x=442, y=504, text=str(int(fixture.time_hr)) + ":" + fixture.time_min)
    pdf.drawString(x=315, y=504, text=str(int(fixture.date_dd)) + "/" + str(int(fixture.date_mm)) + "/" + fixture.date_yyyy)
    pdf.drawCentredString(x=720, y=504, text=fixture.division[0])

    if len(fixture.team_a) > 25 or len(fixture.team_b) > 25:
        pdf.setFont('Helvetica', 10)
        pdf.drawCentredString(x=250, y=472, text=fixture.team_a)
        pdf.drawCentredString(x=660, y=472, text=fixture.team_b)
    else:
        pdf.setFont('Helvetica', 14)
        pdf.drawCentredString(x=250, y=472, text=fixture.team_a)
        pdf.drawCentredString(x=660, y=472, text=fixture.team_b)

    pdf.save()
    data.seek(0)
    return data


def merge(overlay_canvas: io.BytesIO, template_path: str) -> io.BytesIO:
    template_pdf = pdfrw.PdfReader(template_path)
    overlay_pdf = pdfrw.PdfReader(overlay_canvas)
    for page, data in zip(template_pdf.pages, overlay_pdf.pages):
        overlay = pdfrw.PageMerge().add(data)[0]
        pdfrw.PageMerge(page).add(overlay).render()
    form = io.BytesIO()
    pdfrw.PdfWriter().write(form, template_pdf)
    form.seek(0)
    return form


def save(form: io.BytesIO, filename: str):
    with open(filename, 'wb') as f:
        f.write(form.read())


def decrypt_token(token):
    elements = token.split("-")
    year = elements[0]
    month = elements[1]
    day = elements[2]

    integer = int(elements[3], 16)
    length = elements[4]
    venues = f'{integer:0>{length}b}'

    integer = int(elements[5], 16)
    length = elements[6]
    wavl = f'{integer:0>{length}b}'

    integer = int(elements[7], 16)
    length = elements[8]
    wavjl = f'{integer:0>{length}b}'

    yyyy_mm_dd = "-".join([year, month, day])
    results = [venues, wavl, wavjl, yyyy_mm_dd]
    print(results)

    return results
