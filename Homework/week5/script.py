import csv
import json 


file_list = ['leeuwarden.csv', 'schiphol.csv'] 
output_file = ['outputl.json','outputs.json']

for i in range(2):
	with open (file_list[i]) as csvfile:
		data_set = []
		
		lines = csv.reader(csvfile)

		for line in lines:
			if not line[0].startswith('#'):
				temp = {'station': int(line[0]), 'date': line[1], 'average_temp': int(line[2]), 'min_temp': int(line[3]), 'max_temp': int(line[4])}
				data_set.append(temp)

		for line in data_set:
			year = line['date'][0:4]
			month = line['date'][4:6]
			day = line['date'][6:8]
			line['date'] = month + '/' + day + '/' + year

		json_file = output_file[i]
		# copy data into json file which is called output1.json
		with open(json_file, 'w') as outfile:
			json.dump(data_set, outfile)

