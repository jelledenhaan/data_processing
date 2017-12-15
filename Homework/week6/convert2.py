import csv
import json 

year = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]
csv_file = "populatie.csv"


with open (csv_file) as csvfile:
	data_set = {}
	
	lines = csv.reader(csvfile)

	for line in lines:
		# print(lines)
		data_set[line[0]] = [{"year" : year[0], "value": line[2]},{"year" : year[1], "value": line[3]},{"year" : year[2], "value": line[4]},{"year" : year[3], "value": line[5]},{"year" : year[4], "value": line[6]},{"year" : year[5], "value": line[7]},{"year" : year[6], "value": line[8]},{"year" : year[7], "value": line[9]},{"year" : year[8], "value": line[10]},{"year" : year[9], "value": line[11]},{"year" : year[10], "value": line[12]},{"year" : year[11], "value": line[13]},{"year" : year[12], "value": line[14]},{"year" : year[13], "value": line[15]},{"year" : year[14], "value": line[16]},{"year" : year[15], "value": line[17]},{"year" : year[16], "value": line[18]},{"year" : year[17], "value": line[19]}]
		
	
	json_file = "outputLine2.json"
	# copy data into json file which is called output1.json
	with open(json_file, 'w') as outfile:
		json.dump(data_set, outfile)
