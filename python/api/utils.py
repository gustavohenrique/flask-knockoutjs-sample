from datetime import datetime
from api import app


DATE_FORMAT = app.config.get('DATE_FORMAT', '%Y-%m-%d')


def to_datetime(value):
    return datetime.strptime(value, DATE_FORMAT)


def to_date(value):
    return datetime.strptime(value, DATE_FORMAT).date()


def from_date(value):
    return datetime.strftime(value, DATE_FORMAT)
