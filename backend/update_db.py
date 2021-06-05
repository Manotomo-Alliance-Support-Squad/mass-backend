import csv
import argparse

from main.server import db
from main.server.status import Status
from main.utils.dto import getDTOFromColData, MessageDTO, GalleryDTO, GameDTO, AnnouncementDTO, VideoDTO
from main.utils.insert import insertAnnouncement, insertGallery, insertGame, insertMessage, insertVideo

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
    stat=Status.OK
    switch = {
            "MESSAGES": [insertMessage, MessageDTO],
            "GALLERY": [insertGallery, GalleryDTO],
            "GAMES": [insertGame, GameDTO],
            "ANNOUNCEMENTS": [insertAnnouncement, AnnouncementDTO],
            "VIDEO": [insertVideo, VideoDTO],
    }
    insert, classNameDTO = switch.get(args.table_name)
    for data in csv[1:]:
        # note: duplicated columns aren't handled, and the last column will reflect upon the db
        dto = getDTOFromColData(classNameDTO, csv[0], data)
        res = insert(dto)
        RED="\033[31m"
        CLR="\033[00m"
        if res == Status.WARN:
            print(f"{RED}duplicate entry, skipping: {CLR}")
            print(data)
        if res == Status.FAIL:
            print(f"{RED}data was missing or column mismatch{CLR}")
            print(data)
            stat = res
    if not args.dry_run and stat != Status.FAIL: 
        db.session.commit()
    return stat

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
            "--dry-run", "-d", dest="dry_run", action='store_true',
            help="Do not commit the database")
    args = parser.parse_args()
    main(args)
