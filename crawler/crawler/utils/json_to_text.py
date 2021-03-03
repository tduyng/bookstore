import json
import re


with open("data.json", "r") as f:
    data_dict = json.load(f)
    with open("data_text.txt", "w") as write_file:
        for data in data_dict:
            if len(data["content"].strip()) != 0:
                write_file.write(re.sub(r"\s+", " ", data["content"]) + u"\n")
f.close()
"""
with open("data_text.txt",'r') as g:
	data_text = g.readlines()
g.close()
print(len(data_text))
"""