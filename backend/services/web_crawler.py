from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser
from dotenv import load_dotenv
import requests, os

def build_youtube_search(api_key):
    return build("youtube", "v3", developerKey = api_key)

def get_search_response(youtube, query):
    search_response = youtube.search().list(
        q = query,
        order = "relevance",
        part = "snippet",
        maxResults = 5
    ).execute()
    return search_response

def get_youtube_links(keywords):
    query=""
    links = []
    load_dotenv()
    youtube = build_youtube_search(os.environ.get('API_KEY'))

    for i, word in enumerate(keywords):
        query += word if i == 0 else "+"+word
    
    search_response = get_search_response(youtube, query)

    for item in search_response['items']:
        links.append(create_dict(item['snippet']['title'], item['snippet']['description'], item['id']['videoId']))

    return links

def create_dict(title, description, videoId):
    result = {
        "title" : title,
        "description" : description,
        "url" : 'https://www.youtube.com/watch?v='+videoId,
    }
    return result