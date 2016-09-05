import ujson
from dateutil.parser import parse
import time
import datetime

fullList = []

for i in range(1, 116):
	json_data = open('dumps/' + str(i) + '.txt').read()
	data = ujson.loads(json_data)
	fullList = fullList + data
	print(i)
	#print(data)

sortedList = sorted(fullList, key = lambda k: time.mktime(parse(k['created_time']).timetuple()))

with open('dumps/fullDataSorted2.json', 'w') as outfile:
    ujson.dump(sortedList, outfile)
