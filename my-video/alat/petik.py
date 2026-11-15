import re


def tanpa_petik(teks):
    teks = re.sub(r"[\"“”«»‘’„]", "", teks)
    teks = re.sub(r"(?<!\w)'|'(?!\w)", "", teks)
    return re.sub(r"\s{2,}", " ", teks).strip()
