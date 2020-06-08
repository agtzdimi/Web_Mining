import geograpy3
import nltk
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--text', required=True)

args = parser.parse_args()
nltk.download('punkt', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)
nltk.download('maxent_ne_chunker', quiet=True)
nltk.download('words', quiet=True)
places = geograpy3.get_place_context(text = args.text)
print(places.countries)