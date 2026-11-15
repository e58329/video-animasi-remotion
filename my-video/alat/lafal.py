import json, os, re

_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lafal.json")


def _muat():
    try:
        with open(_PATH, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def lafalkan(teks):
    """Ganti ejaan hanya untuk suara. Teks subtitle tidak disentuh."""
    for kata, ucap in _muat().items():
        teks = re.sub(r"\b" + re.escape(kata) + r"\b", ucap, teks, flags=re.IGNORECASE)
    return teks
