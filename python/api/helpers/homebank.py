import os
import datetime
from xml.dom import minidom
from api import models


def create(**kwargs):
    xml = kwargs.get('file')
    user = kwargs.get('user')
    if os.path.isfile(xml):
        f = open(xml, 'r')
        data = f.read()
        f.close()
        dom = minidom.parseString(data)
        root = dom.documentElement

        _parse(tag='account', root=root, cls=models.Account, user=user)
        _parse(tag='pay', root=root, cls=models.Payee, user=user)
        _parse(tag='cat', root=root, cls=models.Category, user=user)

        transactions = root.getElementsByTagName('ope')
        for t in transactions:
            transaction = models.Transaction()
            transaction.description = t.getAttributeNode('wording').nodeValue
            transaction.amount = float(t.getAttributeNode('amount').nodeValue)
            transaction.transaction_date = _todate(t.getAttributeNode('date').nodeValue)
            transaction.account_id = _get_obj(cls=models.Account, key=t.getAttributeNode('account').nodeValue)
            transaction.payee_id = _get_obj(cls=models.Payee, key=t.getAttributeNode('payee').nodeValue)
            transaction.category_id = _get_obj(cls=models.Category, key=t.getAttributeNode('category').nodeValue)
            transaction.user_id = user.id
            transaction.get_session.commit()
    else:
        raise Exception('file not found')


def _parse(**kwargs):
    root = kwargs.get('root')
    user = kwargs.get('user')
    nodelist = root.getElementsByTagName(kwargs.get('tag'))
    for node in nodelist:
        cls = kwargs.get('cls')
        name = node.getAttributeNode('name').nodeValue
        # check if already exists
        obj = cls.query.filter_by(name=name).first()
        if obj is None:
            obj = cls()
            obj.key = unicode(node.getAttributeNode('key').nodeValue)
            obj.name = unicode(name)
            obj.user_id = user.id
            obj.get_session.commit()


def _get_obj(**kwargs):
    cls = kwargs.get('cls')
    obj = cls.query.filter_by(key=kwargs.get('key')).first()
    return obj.id if obj is not None else None


def _todate(value):
    begin = datetime.datetime(1, 1, 1)
    return begin + datetime.timedelta(days=int(value))
