import urllib2
import json
import time

def getMessages(runID, nextLink):
	fullData = []

	index = 0;

	#for i in range(9):
	while (True):
		response = ''
		data = []
		try:
			response = urllib2.urlopen(nextLink)
			data = json.load(response)
		except:
			print('Stopped at URL:');
			print(nextLink)
			return {
				'data': fullData,
				'index': index,
				'nextLink': nextLink
			}

		if ((index - 1) % 50 == 0):
			fullData = []

		nextLink = data['paging']['next']
		fullData = fullData + data['data']
		date = data['data'][0]["created_time"];
		print str(index) + ';' + date[:10] + '; Total length = ' + str(len(fullData))

		index = index + 1;
		if (index % 50 == 0):
			writeToFile(fullData, runID, index);
		#data = json.load(response)
		#print (data['data'])

	return fullData

def writeToFile(data, runID, index):
	with open('dumps/data' + '_' + str(runID) + '_' + str(index) + '.txt', 'w') as outfile:
	    json.dump(data, outfile)


nextLink = "https://graph.facebook.com/v2.3/277315352418689/comments?limit=25&__paging_token=enc_AdDjFfZB3Jrh6cqCSsqwfQr0SgK7314UGliAFQg27qMk6FZBwrPgVWgVAVYlhmmM1AGcli1T9HlJvnHW3DbD0TF5Dp&access_token=EAACEdEose0cBAE3fnuBOmDrGWlZCZA8VZCBRYnlobLPNkOdFDbGZC6BZCUZCcsNrrZAZA3C57J1pNEOpHs7kuZByZCIEeZAMqDrtalBPZBh9dE09yu7HCsirwLJGPfI8ZChJuJekqeMCbZCAK8hEwWxIKJpHDng0nzqnJgl1IZAiIqxcddPWAZDZD&until=1420629983"


for runID in range(13, 50):
	print("################### Run " + str(runID) + " ###################")
	stoppedObject = getMessages(runID, nextLink)
	if (stoppedObject['index'] > 0):
		writeToFile(stoppedObject['data'], runID, stoppedObject['index'])
	nextLink = stoppedObject['nextLink']
	time.sleep(360);

