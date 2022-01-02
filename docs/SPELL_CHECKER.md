# cspell
We use cspell as spell checker for our code.
cspell checks for the languages english, typescript as well as custom dictionaries .

# Custom Dictionaries
We've defined some dictionaries to split up domain language from other words.
Dictionaries are text files ending with a `.dict` and contain words (split by line break) which are allowed to be used in our code base.

## Domain Language
Domain language can be found in [domain.dict](domain.dict).

# Validation
Merges are only allowed if cspell checks pass. If they don't, the developer must define the reported words in a dictionary or change the occurrences with appropriated words.
