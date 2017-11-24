import csv 
import json


csv_file = 'good_data.csv'
data = []

# read csv file and append data to data list
with open (csv_file) as csvfile:
	
	lines = csv.reader(csvfile)

	for line in lines:
		temp = {'country': line[0], 'happy': line[1], 'population': line[2], 'gdp': line[3], 'continent': line[4]}
		data.append(temp)
json_file = 'output4.json'
# copy data into json file which is called output.json4
with open(json_file, 'w') as outfile:
	json.dump(data, outfile)