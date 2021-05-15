import PyPDF2
import subprocess
import sys
import pip
import requests
#import xml.etree.ElementTree as ET
# importing required modules
import PyPDF2
from lxml import etree
import pandas as pd
import definitions
import numpy as np
#import matplotlib.pyplot as plt
import pdfrw

div_dict = dict()
f = open("Leagues.txt")
for line in f:
    line = line.strip('\n')
    (key, val, short) = line.split(",")
    div_dict[key] = [val, short]

url = 'https://vwa.bracketpal.com/dailyform/83/2021-05-16'

table_MN = pd.read_html(url)
print(f'Total tables: {len(table_MN)}')
df = table_MN[2]
print(df.head())
print(df[1:2])
fixtures = []

for index, row in df.iterrows():
    if row[0] != "Time" and type(row[1]) != type(0.01):
        print(row[1])
        print(type(row[1]))
        print(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7])
        venue = row[1].split(" Ct")[0].replace(" Ct", "")
        court = row[1].split("Ct")[1]
        team_a = row[2]
        team_b = row[5]
        try:
            duty = row[7][5:]
        except TypeError:
            duty = " "
        division = div_dict[url.split('/')[-2]][1]
        date = url.split('/')[-1].split('-')
        date_dd = date[2]
        date_mm = date[1]
        date_yyyy = date[0]
        time = row[0].split(':')
        time_hr = time[0]
        time_min = time[1]
        fixture = definitions.Fixture(venue, court, team_a, team_b, duty, division,
                                      date_dd, date_mm, date_yyyy, time_hr, time_min)
        fixtures.append(fixture)

for i in fixtures:
    data = i.get_dict()

pdf_template = "C:\\Users\\The Guaz\\Desktop\\WAVL Scoresheets\\"
pdf_default = "C:\\Users\\The Guaz\\Desktop\\WAVL Scoresheets\\default_annots.pdf"
pdf_output = "C:\\Users\\The Guaz\\Desktop\\WAVL Scoresheets\\WAVL SCORESHEETS ANNOTS - OUTPUT.pdf"
# template_pdf  # uncomment to see all the data captured from this PDF.

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'

data = fixtures[1].get_dict()
definitions.fill_pdf(pdf_template, pdf_output, data, pdf_default)

#df.info()
#df[0].astype('string')
#df.head()
#df.info()
# print(x.text)

# table = etree.HTML(x.text).findall("body/table")
# first_table = table[0]
# table_as_list = list(first_table)
# table_headers = [col.text for col in table_as_list[0]]
# table_list_dict = [dict(zip(table_headers, [col.text for col in row])) for row in table_as_list[1:]]
# [print(dictionary) for dictionary in table_list_dict]
