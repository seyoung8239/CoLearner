from konlpy.tag import Kkma
from konlpy.utils import pprint
from nltk.tokenize import word_tokenize
import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
import re

test = '''
  hello my name is seyoug. nice to meet you. 만나서 반갑습니다 제 이름은 박세영 입니다. 저는 컴퓨터공학을 공부하고 있으며, 앞으로 개발자가 되고 싶습니다.
'''

def extract_keyword(pdf_s):
  word_d = {}
  kkma = Kkma()
  wlist = word_tokenize(pdf_s)

  reg_eng = re.compile(r'[a-zA-Z]')
  reg_kor = re.compile(r'[가-힣]') 

  for w in wlist:
    if reg_eng.match(w):
      eng_list = nltk.pos_tag([w])
      for ew in eng_list:
        if ew[1] in ['NN', 'NNS', 'NNP', 'NNPS']:
          if ew[0] not in word_d:
            word_d[ew[0]] = 0
          word_d[ew[0]] += 1
    elif reg_kor.match(w):
      kor_list = kkma.pos(w)
      for kw in kor_list:
        if kw[1] == 'NNG':
          if kw[0] not in word_d:
            word_d[kw[0]] = 0
          word_d[kw[0]] += 1
  
  dict(sorted(word_d.items(), key=lambda item: item[1], reverse=True))
  result = list(word_d.keys()) + ['', '', '']
  return result[0:3]

if __name__ == '__main__':
  print(extract_keyword)

