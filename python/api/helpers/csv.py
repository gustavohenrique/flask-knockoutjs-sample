import unicodecsv as csv
import codecs
from datetime import datetime
from decimal import Decimal
from api import models


def create(**kwargs):
    csv_file = kwargs.get('file')
    user = kwargs.get('user')
    dialect = kwargs.get('dialect', None)
    result = []
    try:
        f = codecs.open(csv_file, 'rU')
        if not dialect:
            dialect = csv.excel()
            dialect.delimiter = ';'
            dialect.skipinitialspace = True
        csv_content = csv.reader(format_lines(f), dialect)

        template = kwargs.get('template')
        account = kwargs.get('account')
        while True:
            try:
                row = csv_content.next()
                data = {}
                i = 0
                for item in row:
                    i = i + 1
                    data.update({'field%s' % i: item.strip()})

                if template == 'bradescopj':
                    _persist_bradescopj(data, account, user)
                elif template == 'itaupf':
                    _persist_itaupf(data, account, user)

                result.append(data)
            except StopIteration:
                break

    finally:
        f.close()

    return result


def format_lines(unicode_csv_data):
    for line in unicode_csv_data:
        # ignore comments and empty lines
        if not line.startswith(';') and len(line) > 1:
            # encode to utf-8
            yield unicode(line, errors='ignore')


def _persist_bradescopj(data, account, user):
    positive_amount = len(data.get('field4', [])) > 1
    negative_amount = len(data.get('field5', [])) > 1
    if data.get('field1') != 'DATA' and (positive_amount or negative_amount):
        d = {
            'transaction_date': _to_date(data.get('field1'), '%d/%m/%y'),
            'description': data.get('field2')
        }
        amount = Decimal('0.0')
        if positive_amount:
            amount = _format_decimal(data.get('field4'))
        elif negative_amount:
            amount = _format_decimal(data.get('field5')) * -1
        d.update({'amount': amount})
        _persist_skipping_already_exists(d, account, user)


def _persist_itaupf(data, account, user):
    d = {
        'transaction_date': _to_date(data.get('field1'), '%d/%m/%Y'),
        'description': data.get('field2'),
        'amount': _format_decimal(data.get('field3'))
    }
    _persist_skipping_already_exists(d, account, user)


def _persist_skipping_already_exists(data, account, user):
    if account:
        data.update({'account_id': account.id})

    data.update({'user_id': user.id})

    qry = ''
    for k in data.keys():
        qry += '%s="%s" and ' % (k, data.get(k))
    qry += '1=1'
    try:
        transaction = models.Transaction.query.filter(qry).first()
        if transaction is None:
            transaction = models.Transaction()
            transaction.from_dict(data)
            #transaction.get_session.commit()
            models.session.commit()
    except Exception as e:
        print e.message
        models.session.rollback()


def _to_date(value, date_format):
    return datetime.strptime(value, date_format).date()


def _format_decimal(value):
    return Decimal(value.replace('.', '').replace(',', '.'))
