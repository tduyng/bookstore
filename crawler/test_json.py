import json

a_dictionary = {"d": 4, "e": 5, "f": 6}

with open("data.json", "r+") as file:
    try:
        data = json.load(file)
    except:
        data = {"books": []}
    print(data)
    data["books"].append(a_dictionary)
    file.seek(0)
    json.dump(data, file)