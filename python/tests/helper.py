from flask import json
from api import models
import datetime
from decimal import Decimal
from dateutil.relativedelta import relativedelta
import os
import sqlalchemy

from tests import generators


def from_json(value):
    return json.loads(value)


def fixture(**kwargs):
    persist = kwargs.get('persist', False)
    cls = kwargs.get('cls')
    if cls:
        kwargs.pop('cls')
    else:
        raise Exception('class is missing')

    fields = cls.table.columns.keys()
    if 'id' in fields:
        fields.remove('id')

    ignored_fields = kwargs.get('ignored_fields', [])
    for ignored in ignored_fields:
        fields.remove(ignored)

    data = {}

    for field in fields:
        data.update({field: None})
        column = cls.table.columns.get(field)
        field_class = column.type.__class__
        value = None

        if len(column.foreign_keys) > 0:
            fk = field.replace('_id', '')
            if kwargs.get(field):
                value = kwargs.get(field)
            elif kwargs.get(fk):
                value = kwargs.get(fk).id
            else:
                sub_cls = models.__getattribute__(fk.title())
                sub_obj = fixture(cls=sub_cls, persist=persist)
                value = sub_obj.id if sub_obj.id else 0
        else:
            if (field_class == sqlalchemy.types.Unicode) or (field_class == sqlalchemy.types.UnicodeText):
                value = kwargs.get(field) if kwargs.get(field) else unicode(generators.gen_slug(10))

            elif field_class == sqlalchemy.types.Float:
                value = kwargs.get(field) if kwargs.get(field) else generators.gen_float()

            elif field_class == sqlalchemy.types.DECIMAL:
                value = kwargs.get(field) if kwargs.get(field) else generators.gen_decimal(10, 2)

            elif field_class == sqlalchemy.types.Integer:
                value = kwargs.get(field) if kwargs.get(field) else generators.gen_integer()

            elif field_class == sqlalchemy.types.Date:
                value = _to_date(kwargs.get(field)) if kwargs.get(field) else generators.gen_date()

            elif field_class == sqlalchemy.types.DateTime:
                value = _to_date(kwargs.get(field)) if kwargs.get(field) else generators.gen_datetime()

            elif field_class == sqlalchemy.types.Boolean:
                value = kwargs.get(field, True)

            else:
                data.pop(field)

        if value:
            data.update({field: value})

    obj = cls()
    obj.from_dict(data)
    if persist:
        obj.get_session.commit()
        #models.session.commit()
    return obj


def load_initial_data():
    admin = fixture(cls=models.User, persist=True, username=u'admin', password=u'admin')
    tux = fixture(cls=models.User, persist=True, username=u'tux', password=u'tux123')

    account1 = fixture(cls=models.Account, persist=True, key=u'1', name=u'account1', user=admin)
    account2 = fixture(cls=models.Account, persist=True, key=u'2', name=u'account2', user=admin)
    account3 = fixture(cls=models.Account, persist=True, key=u'3', name=u'account3', user=tux)

    category1 = fixture(cls=models.Category, persist=True, key=u'1', name=u'category1', user=admin)
    category2 = fixture(cls=models.Category, persist=True, key=u'2', name=u'category2', user=admin)
    category3 = fixture(cls=models.Category, persist=True, key=u'3', name=u'category3', user=tux)

    payee1 = fixture(cls=models.Payee, persist=True, key=u'1', name=u'payee1', user=admin)
    payee2 = fixture(cls=models.Payee, persist=True, key=u'2', name=u'payee2', user=admin)
    payee3 = fixture(cls=models.Payee, persist=True, key=u'3', name=u'payee3', user=tux)

    fixture(
        cls=models.Transaction,
        persist=True,
        account=account1,
        category=category1,
        payee=payee1,
        description=u'a1 c1 p1',
        amount=Decimal('-1.99'),
        transaction_date=u'2012-01-08',
        user=admin
    )

    fixture(
        cls=models.Transaction,
        persist=True,
        account=account1,
        category=category2,
        payee=payee2,
        description=u'a1 c2 p2',
        amount=Decimal('-5.6'),
        transaction_date=u'2012-01-09',
        user=admin
    )

    fixture(
        cls=models.Transaction,
        persist=True,
        account=account2,
        category=category1,
        payee=payee1,
        description=u'a2 c1 p1',
        amount=Decimal('-10.0'),
        transaction_date=u'2012-01-10',
        user=admin
    )

    fixture(
        cls=models.Transaction,
        persist=True,
        account=account2,
        category=category1,
        payee=payee2,
        description=u'a2 c1 p2',
        amount=Decimal('5.0'),
        transaction_date=u'2012-01-11',
        user=admin
    )

    fixture(
        cls=models.Transaction,
        persist=True,
        account=account2,
        category=category2,
        payee=payee2,
        description=u'a2 c2 p2',
        amount=-Decimal('6.0'),
        transaction_date=u'2012-01-12',
        user=admin
    )

    fixture(
        cls=models.Transaction,
        persist=True,
        account=account3,
        category=category3,
        payee=payee3,
        description=u'a3 c3 p3',
        amount=-Decimal('6.0'),
        transaction_date=u'2012-01-12',
        user=tux
    )

    # Scheduled Transactions
    today = datetime.datetime.today()
    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'abcd',
        account=account1,
        category=category1,
        payee=payee1,
        description=u'Internet service provider',
        amount=Decimal('-50.0'),
        transaction_date=format_date(today + relativedelta(months=+1), '%Y-%m-%d'),
        frequency=3,
        number_replications=1,
        unit_replications=u'months',
        user=admin
    )

    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'abcd',
        account=account1,
        category=category1,
        payee=payee1,
        description=u'Internet service provider',
        amount=Decimal('-50.0'),
        transaction_date=format_date(today + relativedelta(months=+2), '%Y-%m-%d'),
        frequency=3,
        number_replications=1,
        unit_replications=u'months',
        user=admin
    )

    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'abcd',
        account=account1,
        category=category1,
        payee=payee1,
        description=u'Internet service provider',
        amount=Decimal('-50.0'),
        transaction_date=format_date(today + relativedelta(months=+3), '%Y-%m-%d'),
        frequency=3,
        number_replications=1,
        unit_replications=u'months',
        user=admin
    )

    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'efgh',
        account=account2,
        category=category2,
        payee=payee2,
        description=u'Domain registration',
        amount=Decimal('-30.0'),
        transaction_date=format_date(today + relativedelta(years=+1), '%Y-%m-%d'),
        frequency=2,
        number_replications=1,
        unit_replications=u'years',
        user=admin
    )

    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'efgh',
        account=account2,
        category=category2,
        payee=payee2,
        description=u'Domain registration',
        amount=Decimal('-30.0'),
        transaction_date=format_date(today + relativedelta(years=+2), '%Y-%m-%d'),
        frequency=2,
        number_replications=1,
        unit_replications=u'years',
        user=admin
    )

    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'ijkl',
        account=account2,
        category=category2,
        payee=payee2,
        description=u'Park',
        amount=Decimal('-15.0'),
        transaction_date=format_date(today + relativedelta(weeks=+3), '%Y-%m-%d'),
        frequency=2,
        number_replications=1,
        unit_replications=u'weeks',
        user=admin
    )

    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'ijkl',
        account=account2,
        category=category2,
        payee=payee2,
        description=u'Park',
        amount=Decimal('-15.0'),
        transaction_date=format_date(today + relativedelta(weeks=+6), '%Y-%m-%d'),
        frequency=2,
        number_replications=1,
        unit_replications=u'weeks',
        user=admin
    )

    fixture(
        cls=models.ScheduledTransaction,
        persist=True,
        key=u'mnop',
        account=account3,
        category=category3,
        payee=payee3,
        description=u'Gas',
        amount=Decimal('-25.0'),
        transaction_date=format_date(today + relativedelta(weeks=+6), '%Y-%m-%d'),
        frequency=2,
        number_replications=1,
        unit_replications=u'weeks',
        user=tux
    )


def clean_initial_data():
    # problems with integrity
    # classes = models.entities
    classes = [models.Transaction, models.ScheduledTransaction, models.Account, models.Category, models.Payee, models.User]
    for cls in classes:
        clean_data(cls)


def clean_data(cls):
    for item in cls.query.all():
        item.delete()
    models.session.commit()


def resources_dir():
    return os.path.join(os.path.dirname(__file__), 'resources')


def _to_date(value):
    return datetime.datetime.strptime(value, '%Y-%m-%d')


def format_date(dt, f):
    return datetime.datetime.strftime(dt, f)
