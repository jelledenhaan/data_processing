import csv
import json 

csv_file = "life.csv"
with open (csv_file) as csvfile:
	data_set = []
	
	lines = csv.reader(csvfile)

	for line in lines:
		temp = {'country': line[0], 'life_index': float(line[1]), 'power_index': float(line[2]), 'safety_index': float(line[3])}
		data_set.append(temp)
	
	json_file = "outputGbar.json"
	# copy data into json file which is called output1.json
	with open(json_file, 'w') as outfile:
		json.dump(data_set, outfile)

