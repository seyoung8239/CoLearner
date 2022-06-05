from requests_html import HTML
from requests_html import HTMLSession

class google:
    def get_google_links(self, keywords):
        query = ""
        output = []
        for i, word in enumerate(keywords):
            if word == '':
                continue
            query += word if i == 0 else "+"+word

        url = 'https://www.google.com/search?q='+query

        session = HTMLSession()
        response = session.get(url)

        css_identifier_result = ".tF2Cxc"
        css_identifier_title = "h3"
        css_identifier_link = ".yuRUbf a"

        results = response.html.find(css_identifier_result)[:3]

        for result in results:
            title = result.find(css_identifier_title, first=True).text
            url = result.find(css_identifier_link, first=True).attrs['href']
            output.append(self.create_dict(title,url))
        
        return output

    def create_dict(self, title, url):
        result = {
            "type" : "google",
            "title" : title,
            "url" : url
        }
        return result