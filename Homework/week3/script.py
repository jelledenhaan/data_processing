	# Jelle den Haan 11975458
# 
#
# This file reads a csv file, copies the data
# and puts in into output.json in json format
#

import csv
import json

# variables 
csv_file = 'data.csv'
data_set = []
average_windpeak = []
oct_days = 31
station = - 1 

# open csv file and read that file
with open (csv_file) as csvfile:
	 
	lines = csv.reader(csvfile)

	# read file and skip lines which start with "#" and append data to list
	for line in lines: 
		if not line[0].startswith('#'):
			temp = {'station': int(line[0]), 'wind': int(line[2])}
			data_set.append(temp)

	# save the values from dataset with appropriate key
	for el in range(len(data_set)):
		if data_set[el]['station'] != data_set[el - 1]['station']:
			temp = {'station': data_set[el]['station']}

	# append data to another list which is sorted per station
	for el in range(len(data_set)):
		if data_set[el]['station'] != data_set[el - 1]['station']:
			temp = {'station': data_set[el]['station'] , 'wind': data_set[el]['wind']}
			average_windpeak.append(temp)
			station += 1
		else:
			average_windpeak[station]['wind'] += data_set[el]['wind']

	# calculate the average windpeaks from october
	for el in range(len(average_windpeak)):
		average_windpeak[el]['wind'] = average_windpeak[el]['wind'] / oct_days		

	
	json_file = 'output.json'
	# copy data into json file which is called output.json
	with open(json_file, 'w') as outfile:
		json.dump(average_windpeak, outfile)





