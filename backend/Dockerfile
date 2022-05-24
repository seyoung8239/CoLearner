FROM python:3.10.4

WORKDIR /usr/src/app

COPY . .

RUN pip install --upgrade pip
RUN apt-get update
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "./app.py"]