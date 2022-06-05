from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser
from dotenv import load_dotenv
import os

class youtube:
    def get_search_response(self, youtube, query):
        search_response = youtube.search().list(
            q = query,
            order = "relevance",
            part = "snippet",
            maxResults = 2
        ).execute()
        return search_response

    def get_youtube_links(self, keywords):
        query=""
        links = []
        load_dotenv()
        
        youtube = build("youtube", "v3", developerKey = os.environ.get('API_KEY'))

        for i, word in enumerate(keywords):
            if word == '':
                continue
            query += word if i == 0 else "+"+word
        
        search_response = self.get_search_response(youtube, query)

        for item in search_response['items']:
            if 'videoId' in item['id']:
                links.append(self.create_dict(item['id']['videoId']))

        return links

    def create_dict(self, videoId):
        result = {
            "type" : 'youtube',
            "title" : "",
            "url" : 'https://www.youtube.com/embed/'+videoId,
        }
        return result