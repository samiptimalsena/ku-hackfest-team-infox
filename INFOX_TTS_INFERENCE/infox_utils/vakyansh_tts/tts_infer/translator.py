from google.transliteration import transliterate_text

def transliterate_to_nepali(text:str)->str:
    return transliterate_text(text, lang_code='ne')