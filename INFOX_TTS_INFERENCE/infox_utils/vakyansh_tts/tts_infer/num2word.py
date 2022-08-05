import re
import string

supported_lang = ["ne", "en"]

all_num = {
    "en": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "ne": ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
}

num_dict = dict()

num_dict["ne"] = {
    '0': 'सुन्ना',
    '1': 'एक',
    '2': 'दुइ',
    '3': 'तीन',
    '4': 'चार',
    '5': 'पाँच',
    '6': 'छ',
    '7': 'सात',
    '8': 'आठ',
    '9': 'नौ',
    '10': 'दश',
    '11': 'एघार',
    '12': 'बाह्र',
    '13': 'तेह्र',
    '14': 'चौध',
    '15': 'पन्ध्र',
    '16': 'सोह्र',
    '17': 'सत्र',
    '18': 'अठार',
    '19': 'उन्नाइस', 
    '20': 'बिस',
    '21': 'एक्काइस',
    '22': 'बाइस',
    '23': 'तेईस',
    '24': 'चौबिस',
    '25': 'पच्चिस',
    '26': 'छब्बिस',
    '27': 'सत्ताइस',
    '28': 'अठ्ठाईस',
    '29': 'उनन्तिस', 
    '30': 'तिस',
    '31': 'एकत्तिस',
    '32': 'बत्तिस',
    '33': 'तेत्तिस ',
    '34': 'चौँतिस',
    '35': 'पैँतिस',
    '36': 'छत्तिस',
    '37': 'सैँतीस',
    '38': 'अठतीस',
    '39': 'उनन्चालीस',
    '40': 'चालीस',
    '41': 'एकचालीस',
    '42': 'बयालीस',
    '43': 'त्रियालीस',
    '44': 'चवालीस',
    '45': 'पैँतालीस',
    '46': 'छयालीस',
    '47': 'सच्चालीस',
    '48': 'अठचालीस',
    '49': 'उनन्चास',  
    '50': 'पचास',
    '51': 'एकाउन्न',
    '52 ': 'बाउन्न',
    '53': 'त्रिपन्न',
    '54': 'चवन्न',
    '55': 'पचपन्न',
    '56': 'छपन्न',
    '57': 'सन्ताउन्न',
    '58': 'अन्ठाउन्न',
    '59': 'उनन्साठी',  
    '60': 'साठी',
    '61': 'एकसट्ठी',
    '62': 'बयसट्ठी',
    '63': 'त्रिसट्ठी',
    '64': 'चौंसट्ठी',
    '65': 'पैंसट्ठी',
    '66': 'छयसट्ठी',
    '67': 'सतसट्ठी',
    '68': 'अठसट्ठी',
    '69': 'उनन्सत्तरी',  
    '70': 'सत्तरी',
    '71': 'एकहत्तर',
    '72': 'बहत्तर',
    '73': 'त्रिहत्तर',
    '74': 'चौहत्तर',
    '75': 'पचहत्तर',
    '76': 'छयहत्तर',
    '77': 'सतहत्तर',
    '78': 'अठहत्तर',
    '79': 'उनासी',   
    '80': 'असी',
    '81': 'एकासी',
    '82': 'बयासी',
    '83': 'त्रियासी',
    '84': 'चौरासी',
    '85': 'पचासी',
    '86': 'छयासी',
    '87': 'सतासी',
    '88': 'अठासी',
    '89': 'उनान्नब्बे',    
    '90': 'नब्बे',
    '91': 'एकान्नब्बे',
    '92': 'बयानब्बे',
    '93': 'त्रियान्नब्बे',
    '94': 'चौरान्नब्बे',
    '95': 'पन्चानब्बे',
    '96': 'छयान्नब्बे',
    '97': 'सन्तान्नब्बे',
    '98': 'अन्ठान्नब्बे',
    '99': 'उनान्सय',
    '100': 'सय',
    '1000': 'हजार',
    '100000': 'लाख',
    '10000000': 'करोड',
    '1000000000': 'अर्ब',
}


def num_to_word(num, lang, separator=", ", combiner=" "):
    """
    Main Method
    :param num: Number digits from any indian language
    :param lang: Language Code from supported Language
    :param separator: Separator character i.e. separator = '-' --> 'two hundred-sixty'
    :param combiner: combine number with position i.e. combiner = '-' --> 'two-hundred sixty'
    :return: UTF-8 String of numbers in words
    """
    lang = lang.lower()
    num = str(num)

    # Load dictionary according to language code
    assert lang in supported_lang, "Language not supported"
    num_dic = num_dict[lang]

    # dash default combiner for english-india
    if (lang == "en") & (combiner == " "):
        combiner = "-"

    # Remove punctuations from numbers
    num = str(num).replace(",", "").replace(" ", "")
    
    # return word as it is if not number
    if not num.isdecimal():
        return num

    # Replace native language numbers with english digits
    for language in supported_lang:
        for num_index in range(10):
            num = num.replace(all_num[language][num_index], all_num["en"][num_index])

    # Assert that input contains only integer number
    for digit in num:
        assert digit in all_num["en"], "Give proper input"

    # Process
    # For Number longer than 9 digits
    def all_two_digit(digits_2):
        if len(digits_2) <= 1:  # Provided only one/zero digit
            return num_dic.get(digits_2, "")
        elif digits_2 == "00":  # Two Zero provided
            return num_dic["0"] + separator + num_dic["0"]
        elif digits_2[0] == "0":  # First digit is zero
            return num_dic["0"] + separator + num_dic[digits_2[1]]
        else:  # Both digit provided
            return num_dic[digits_2]

    # For Number less than 9 digits
    def two_digit(digits_2):
        digits_2 = digits_2.lstrip("0")
        if len(digits_2) != 0:
            return num_dic[digits_2]
        else:
            return ""

    def all_digit(digits):
        digits = digits.lstrip("0")
        digit_len = len(digits)
        if digit_len > 3:
            num_of_digits_to_process = (digit_len % 2) + 1
            process_digits = digits[:num_of_digits_to_process]
            base = str(10 ** (int(digit_len / 2) * 2 - 1))
            remain_digits = digits[num_of_digits_to_process:]
            return (
                num_dic[process_digits]
                + combiner
                + num_dic[base]
                + separator
                + all_digit(remain_digits)
            )
        elif len(digits) == 3:
            return (
                num_dic[digits[:1]]
                + combiner
                + num_dic["100"]
                + separator
                + two_digit(digits[1:])
            )
        else:
            return two_digit(digits)

    num = num.lstrip("0")
    full_digit_len = len(num)

    if full_digit_len == 0:
        output = num_dic["0"]
    elif full_digit_len <= 9:
        output = all_digit(num)
    else:
        iteration = round(full_digit_len / 2)
        output = all_two_digit(num[:2])  # First to digit
        for i in range(1, iteration):
            output = (
                output + separator + all_two_digit(num[i * 2 : (i + 1) * 2])
            )  # Next two digit pairs
        remaining_digits = num[iteration * 2 :]
        if not all_two_digit(remaining_digits) == "":
            output = (
                output + separator + all_two_digit(remaining_digits)
            )  # remaining Last one/two digits

    output = output.strip(separator)

    return output


# --------------------------------- num_to_word_on_a_sent ---------------------------------


def is_digit(word, digit_pattern):
    return re.search(digit_pattern, word)


def remove_punct(sent):
    clean = re.sub("[%s]" % re.escape(string.punctuation), " ", sent)
    return " ".join([word for word in clean.split() if word])


def normalize_nums(text, lang):
    """
    text: str (eg)
    lang: lang code ['en', 'hi']
    returns: str
    (eg)
    """

    if lang in supported_lang:
        text = text.replace('-',' - ') # space separate hyphen
        words = text.split()
        lang_digits = [str(i) for i in range(0, 10)]

        digit_pattern = "[" + "".join(lang_digits) + "]"
        num_indices = [
            ind for ind, word in enumerate(words) if is_digit(word, digit_pattern)
        ]

        words_up = [
            num_to_word(word, lang, separator=" ", combiner=" ")
            if ind in num_indices
            else word
            for ind, word in enumerate(words)
        ]
        return " ".join(words_up)
    else:
        return text

if __name__ == "__main__":
    print(normalize_nums("रीटा के पास 134 बिल्लियाँ हैं।", "ne"))