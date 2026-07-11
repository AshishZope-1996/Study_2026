import logging
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'ConfigFile'))

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

SENDER_EMAIL = "zope17ashish@gmail.com"
SENDER_PASSWORD = "usyz ihns dxsn vcfd"

# Recipients are loaded from the database in EmailWrapper.py.
RECEIVERS = []
