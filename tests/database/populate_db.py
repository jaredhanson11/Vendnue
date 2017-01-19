import MySQLdb
import codecs
import csv
import os
curr_dir = os.getcwd()


db = MySQLdb.connect('sql.mit.edu', 'hansonj', 'password', 'hansonj+vendnue')
cursor = db.cursor()


def insert_table(filename, table_name):
    sql_inserts = []
    csv_dict_reader = csv.DictReader(codecs.open(filename, 'ru', 'utf-8'))
    headers = csv_dict_reader.fieldnames
    headers_string = '(' + ','.join(headers) + ')'
    values_string = '(' + ','.join(['%s' for i in headers]) + ')'
    sql_insert = 'INSERT INTO ' + table_name + ' ' + headers_string + ' VALUES ' + values_string
    for row_dict in csv_dict_reader:
        values = []
        for header in headers:
            values.append(row_dict[header])
        sql_inserts.append(sql_insert)
        try:
            cursor.execute(sql_insert, values)
        except:
            print 'Failed to insert'
            print sql_insert, values
    db.commit()

def main():
    #for filename in os.listdir(os.getcwd()):
    #    if filename.endswith('.csv'):
    #        insert_table(filename, filename[:-4])
    for filename in ['users', 'artists', 'venues', 'concerts', 'maps', 'sections', 'tickets', 'section_bids']:
        insert_table(filename + '.csv', filename)
main()
