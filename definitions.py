import PyPDF2
import os
import io
import pdfrw
import reportlab
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape


class Fixture:
    def __init__(self, venue, venue_0, venue_1, venue_2, court, team_a, team_b, duty, division, date_dd, date_mm, date_yyyy, time_hr, time_min):
        self.venue = venue
        self.venue_2 = venue_2
        self.venue_1 = venue_1
        self.venue_0 = venue_0
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
        print("Venue: %s, Court: %s, A: %s, B: %s, Duty: %s, Division: %s, Date: %s/%s/%s, Time: %s:%s" % (self.venue, self.court, self.team_a, self.team_b, self.duty, self.division, self.date_dd, self.date_mm, self.date_yyyy, self.time_hr, self.time_min))
        pass

    def get_dict(self):
        return {
            "venue": self.venue,
            "venue_0": self.venue_0,
            "venue_1": self.venue_1,
            "venue_2": self.venue_2,
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


venues_dict = {
    "aquinas college": "*Aquinas*College",
    "bendat": "**Bendat",
    "cockburn": "**Cockburn",
    "curtin stadium": "*Curtin*Stadium",
    "ecu mt. lawley": "*ECU*Mt. Lawley",
    "geographe leisure": "*Geographe*Leisure",
    "kingsway": "**Kingsway",
    "loftus": "**Loftus",
    "mandurah arc": "*Mandurah*ARC",
    "melville leisurefit": "*Melville*LeisureFit",
    "methodist l. col": "Methodist*Ladies*College",
    "mlc": "Methodist*Ladies*College",
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
    "Melville LeisureFit",
    "Methodist Ladies College",
    "The Rise",
    "UWA Rec. Centre",
    "Wesley College"
]

div_list = ["80", "81", "82", "83", "94", "95", "96", "97", "98", "99", "100", "101"]

div_dict = {
    '80': ['State League Women', 'SL Women'],
    '81': ['State League Men', 'SL Men'],
    '82': ['State League Reserve Men', 'SLR Men'],
    '83': ['State League Reserve Women', 'SLR Women'],
    '94': ['Division 1 Men', 'Div 1 M'],
    '95': ['Division 1 Women', 'Div 1 Women'],
    '96': ['Division 2 Men', 'Div 2 Men'],
    '97': ['Division 2 Women', 'Div 2 Women'],
    '98': ['Division 3 Men', 'Div 3 Men'],
    '99': ['Division 3 Women', 'Div 3 Women'],
    '100': ['Division 4 Men', 'Div 4 Men'],
    '101': ['Division 5 Men', 'Div 5 Men']
}

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

pdf_default = APP_ROOT + "\\WAVL Scoresheets\\def.pdf"


'''def fill_pdf(input_pdf_path, token, data_dict, default_pdf_path, APP_ROOT):
    ANNOT_KEY = '/Annots'
    ANNOT_FIELD_KEY = '/T'
    SUBTYPE_KEY = '/Subtype'
    WIDGET_SUBTYPE_KEY = '/Widget'

    ven = data_dict["venue"].lower() + ".pdf"
    print(ven)
    print(data_dict.keys())
    end_venue = data_dict["venue"]
    try:
        file = str(input_pdf_path + ven)
        print(file)
        template_pdf = pdfrw.PdfReader(file)
        data_dict.pop("venue")
    except IndexError:
        template_pdf = pdfrw.PdfReader(default_pdf_path)
        print("hehexd")
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))  # NEW
    for page in template_pdf.pages:
        annotations = page[ANNOT_KEY]
        try:
            for annotation in annotations:
                if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                    if annotation[ANNOT_FIELD_KEY]:
                        key = annotation[ANNOT_FIELD_KEY][1:-1]
                        if key in data_dict.keys():
                            if type(data_dict[key]) == bool:
                                if data_dict[key]:
                                    annotation.update(pdfrw.PdfDict(
                                        AS=pdfrw.PdfName('Yes')))
                                    annotation.update(pdfrw.PdfDict(Ff=1))
                            else:
                                annotation.update(
                                    pdfrw.PdfDict(V='{}'.format(data_dict[key]))
                                )
                                annotation.update(pdfrw.PdfDict(Ff=1))
                                annotation.update(pdfrw.PdfDict(AP=''))

        except TypeError:
            pass
    filename = APP_ROOT + "\\WAVL Scoresheets\\temp\\" + token + "\\" + end_venue + "-" + data_dict["court"] +\
               "-" + data_dict["time_hr"] + data_dict["time_min"] + ".pdf"
    pdfrw.PdfWriter().write(filename, template_pdf)
    print(filename)
    return filename
'''


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

#venue_0 = (x=282, y=573)
#venue_1 = (x=282, y=565)
#venue_2 = (x=282, y=557)
#court = (x=400, y=557)
#time_hr = (x=480, y=557)
#time_min = (x=500, y=557)
#date_dd = (x=580, y=557)
#date_mm = (x=605, y=557)
#date_yyyy = (x=625, y=557)
#duty = (x=615, y=528)
#team_a = (x=255, y=527)
#team_b = (x=400, y=527)




def get_overlay_canvas(fixture) -> io.BytesIO:
    data = io.BytesIO()
    pdf = canvas.Canvas(data)
    pdf.setPageSize(landscape(A4))
    pdf.setFont('Helvetica', 10)
    pdf.drawCentredString(x=310, y=575, text=fixture.venue_0)
    pdf.drawCentredString(x=310, y=566, text=fixture.venue_1)
    pdf.drawCentredString(x=310, y=557, text=fixture.venue_2)
    pdf.drawCentredString(x=400, y=557, text=fixture.court)
    pdf.drawString(x=480, y=557, text=str(int(fixture.time_hr)))
    pdf.drawString(x=500, y=557, text=fixture.time_min)
    pdf.drawString(x=583, y=557, text=fixture.date_dd)
    pdf.drawCentredString(x=610, y=557, text=str(int(fixture.date_mm)))
    pdf.drawString(x=625, y=557, text=fixture.date_yyyy)
    pdf.setFont('Helvetica', 13)
    pdf.drawCentredString(x=773, y=557, text=fixture.division)
    pdf.setFont('Helvetica', 14)
    pdf.drawCentredString(x=710, y=528, text=fixture.duty)

    if len(fixture.team_a) > 18:
        pdf.setFont('Helvetica', 10)
        pdf.drawCentredString(x=320, y=527, text=fixture.team_a)
    else:
        pdf.setFont('Helvetica', 14)
        pdf.drawCentredString(x=320, y=527, text=fixture.team_a)

    if len(fixture.team_b) > 18:
        pdf.setFont('Helvetica', 10)
        pdf.drawCentredString(x=460, y=527, text=fixture.team_b)
    else:
        pdf.setFont('Helvetica', 14)
        pdf.drawCentredString(x=460, y=527, text=fixture.team_b)

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