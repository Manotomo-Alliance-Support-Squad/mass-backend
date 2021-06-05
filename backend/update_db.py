import csv
import argparse

from enum import Enum

from main.server import db
from main.server.models import Announcement, Gallery, Games, Message, Video
from main.utils.dto import getDTOFromColData, MessageDTO, GalleryDTO, GameDTO, AnnouncementDTO, VideoDTO

class Status(Enum):
    OK = 0
    WARN = 1
    FAIL = 2

def insertTable(dbClass: object, data: object):
    row = dbClass(data)
    # querying for entries that are the exact same
    if dbClass.query.filter(row == row).first():
        return Status.WARN
    db.session.add(row)

def parse_csv(csv_path: str):
    with open(csv_path) as csv_f:
        csv_r = csv.reader(csv_f, delimiter=',')
        return [row for row in csv_r]

def main(args):
    csv = parse_csv(args.csv_path)
    fail=Status.OK
    switch = {
            "MESSAGES": [Message, MessageDTO],
            "GALLERY": [Gallery, GalleryDTO],
            "GAMES": [Games, GameDTO],
            "ANNOUNCEMENTS": [Announcement, AnnouncementDTO],
            "VIDEO": [Video, VideoDTO],
    }
    className, classNameDTO = switch.get(args.table_name)
    for data in csv[1:]:
        # note: duplicated columns aren't handled, and the last column will reflect upon the db
        dto = getDTOFromColData(classNameDTO, csv[0], data)
        res = insertTable(className, dto)
        RED="\033[31m"
        CLR="\033[00m"
        if res == Status.WARN:
            print(f"{RED}duplicate entry, skipping: {CLR}")
            print(data)
        if res == Status.FAIL:
            print(f"{RED}data was missing or column mismatch{CLR}")
            print(data)
    if not args.dry_run and fail != Status.FAIL: 
        db.session.commit()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
            description="update a database from a CSV file")
    parser.add_argument(
            "--csv", "-c", dest="csv_path", required=True,
            help="The path to the csv file")
    parser.add_argument(
            "--table", "-t", dest="table_name", required=True,
            help="The name of the table to insert into")
    parser.add_argument(
            "--dry-run", "-d", dest="dry_run", action='store_true', default=False,
            help="Do not commit the database")
    args = parser.parse_args()
    main(args)
