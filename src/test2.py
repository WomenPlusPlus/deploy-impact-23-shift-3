#!/usr/bin/env python

"""Script for Mapper in HDFS"""
import sys
import re


def main():
    """
    This function parses an .xml file to extract a year and a tag from each valid entry row.
    It uses only information about the years 2010 and 2016.
    It outputs the year and tag pair with the count 1 per each input line.
    """
    key_words = ["<row", "CreationDate", "Tags"]
    years = ["2010", "2016", "2008"]
    reg_year = r" CreationDate=\"(\d{4})"
    reg_tags = r" Tags=\"(.*?)\""
    reg_tag = "&lt;(.*?)&gt;"

    for line in sys.stdin:
        if not all([_ in line for _ in key_words]):
            continue
        year = re.search(reg_year,line).group(1)
        if year not in years:
            continue
        tags_str = re.search(reg_tags,line)
        if not tags_str:
            continue
        tags = set(re.findall(reg_tag,tags_str.group(1)))
        if tags:
            for tag in tags:
                print(year, tag.lower(),"1", sep="\t")


if __name__ == "__main__":
    main()
