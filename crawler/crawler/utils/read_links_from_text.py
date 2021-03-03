def get_links_from_text_file(file):
    links = []
    with open(file, "r") as f:
        try:
            lines = f.readlines()
            for line in lines:
                links.append(line.strip())
        except:
            pass
    return links