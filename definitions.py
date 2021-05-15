import pdfrw
import re


class Fixture:
    def __init__(self, venue, court, team_a, team_b, duty, division, date_dd, date_mm, date_yyyy, time_hr, time_min):
        self.venue = venue
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


def fill_pdf(input_pdf_path, output_pdf_path, data_dict, default_pdf_path):
    ANNOT_KEY = '/Annots'
    ANNOT_FIELD_KEY = '/T'
    ANNOT_VAL_KEY = '/V'
    ANNOT_RECT_KEY = '/Rect'
    SUBTYPE_KEY = '/Subtype'
    WIDGET_SUBTYPE_KEY = '/Widget'

    ven = data_dict["venue"].lower() + ".pdf"
    print(ven)
    print(data_dict.keys())
    try:
        file = str(input_pdf_path + ven)
        print(file)
        template_pdf = pdfrw.PdfReader(file)
        data_dict.pop("venue")
    except IndexError:
        template_pdf = pdfrw.PdfReader(default_pdf_path)
        print("hehexd")

    for page in template_pdf.pages:
        annotations = page[ANNOT_KEY]
        try:
            for annotation in annotations:
                if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                    if annotation[ANNOT_FIELD_KEY]:
                        key = annotation[ANNOT_FIELD_KEY][1:-1]
                        if key in data_dict.keys():
                            if type(data_dict[key]) == bool:
                                if data_dict[key] == True:
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
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))  # NEW
    pdfrw.PdfWriter().write(output_pdf_path, template_pdf)