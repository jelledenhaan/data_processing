#!/usr/bin/env python
# Name: Jelle den Haan
# Student number: 11975458
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM, plaintext
TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    # list to store all values in
    movielist = []
    
    
    # iterate over list to search for desired data
    for movies in dom("div.lister-item.mode-advanced"):
        
        # variables to store values in 
        movie_data = {}
        actorlist = []
        
        # get title for desired movie and put it into dictionary with the right key
        for header in movies("h3.lister-item-header"): 
            for title in header("a"):
                movie_data["title"] = title.content
        
        # get runtime and genre(s) for desired movie and put it into dictionary with the right key
        for header in movies("p.text-muted"):
            for runtime in header("span.runtime"):
                runtime = runtime.content.strip("min")
                movie_data["runtime"] = runtime
            for genre in header("span.genre"):
                genre = genre.content.strip()
                movie_data["genre"] = genre    
        
        # get rating for desired movie and put it into dictionary with right key
        for header in movies("p"):
            for actor in header("a"):
                actorlist.append(actor.content)
                movie_data["actor"] = ", ".join(actorlist)

        # get rating from for desired movie from imdb site and put it into dictionary with the right key
        for header in movies("div.inline-block.ratings-imdb-rating"):
            for rating in header("strong"):
                movie_data["rating"] = rating.content
        # append all data to the list            
        movielist.append(movie_data)

    return movielist  


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    # write all data in tvseries.csv
    for tvserie in tvseries: 
        writer.writerow([tvserie["title"].encode("utf-8"), tvserie["rating"], tvserie["genre"], tvserie["actor"].encode("utf-8"), tvserie["runtime"]])
    

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)