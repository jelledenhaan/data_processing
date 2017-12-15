import csv
import json 

csv_file = "life.csv"
with open (csv_file) as csvfile:
	data_set = []
	
	lines = csv.reader(csvfile)

	for line in lines:
		temp = {'country': line[0], 'values': [{"value": float(line[1]), "sort": "life_index"}, {"value": float(line[2]), "sort": "purchase_index"},{"value": float(line[3]), "sort": "safety_index"}]}
		data_set.append(temp)
	
	json_file = "outputGbar.json"
	# copy data into json file which is called output1.json
	with open(json_file, 'w') as outfile:
		json.dump(data_set, outfile)

