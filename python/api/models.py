# -*- coding: utf-8 -*-
from api import app

import string
import uuid
import hashlib
from random import choice
from decimal import Decimal

from elixir import *
from elixir_validations import *


metadata.bind = app.config.get('SQLALCHEMY_DATABASE_URI')
metadata.bind.echo = app.config.get('DEBUG')


class User(Entity):
    using_options(tablename='users')

    username = Field(Unicode(50), unique=True, required=True, index=True)
    password = Field(Unicode(128), required=True)
    password_reset_key = Field(Unicode(128), default=u'')
    active = Field(Boolean, default=True)
    token = Field(Unicode(50), unique=True, required=False)

    accounts = OneToMany('Account')
    categories = OneToMany('Category')
    payees = OneToMany('Payee')
    transactions = OneToMany('Transaction')

    validates_uniqueness_of('username', 'token')
    validates_presence_of('username', 'password')

    @property
    def get_session(self):
        return session

    def is_active(self):
        return self.active

    def is_anonymous(self):
        return False if self.id else True

    def is_authenticated(self):
        return not(self.is_anonymous())

    def get_id(self):
        return self.id

    def generate_token(self):
        return unicode(uuid.uuid4())

    @classmethod
    def encrypt(self, password):
        return unicode(hashlib.sha1(password).hexdigest())

    def from_dict(self, data):
        if data:
            data.update({'password': User.encrypt(data.get('password'))})
            data.update({'token': self.generate_token()})
        super(User, self).from_dict(data)


class Account(Entity):
    using_options(tablename='accounts')

    key = Field(Unicode(10))
    name = Field(Unicode(50), unique=True, required=True)
    transactions = OneToMany('Transaction')
    user = ManyToOne('User', ondelete='cascade', required=True)

    validates_presence_of('name')

    @property
    def get_session(self):
        return session


class Category(Entity):
    using_options(tablename='categories')

    key = Field(Unicode(10))
    name = Field(Unicode(50), required=True)
    transactions = OneToMany('Transaction')
    user = ManyToOne('User', ondelete='cascade', required=True)

    validates_presence_of('name')

    @property
    def get_session(self):
        return session


class Payee(Entity):
    using_options(tablename='payees')

    key = Field(Unicode(10))
    name = Field(Unicode(50), required=True)
    transactions = OneToMany('Transaction')
    user = ManyToOne('User', ondelete='cascade', required=True)

    validates_presence_of('name')

    @property
    def get_session(self):
        return session


class Transaction(Entity):
    using_options(tablename='transactions')

    description = Field(Unicode(250), required=True)
    amount = Field(DECIMAL(10, 2), required=True)
    transaction_date = Field(Date, required=True)
    user = ManyToOne('User', ondelete='cascade')
    account = ManyToOne('Account', ondelete='set null')
    category = ManyToOne('Category', ondelete='set null')
    payee = ManyToOne('Payee', ondelete='set null')

    validates_presence_of('description', 'amount', 'transaction_date')

    def __repr__(self):
        return '<Transaction> %s %s' % (self.description, self.amount)

    @property
    def get_session(self):
        return session

    def to_dict(self):
        data = super(Transaction, self).to_dict()
        data.update(self.__dict('account'))
        data.update(self.__dict('category'))
        data.update(self.__dict('payee'))
        return data

    def from_dict(self, data):
        if data:
            data.update({'amount': Decimal(data.get('amount', 0))})
            data = _replace_obj_by_id(data, 'account')
            data = _replace_obj_by_id(data, 'category')
            data = _replace_obj_by_id(data, 'payee')
        super(Transaction, self).from_dict(data)

    def __dict(self, fieldname):
        field = self.__getattribute__(fieldname)
        d = {'id': field.id, 'name': field.name} if field else {'id': 0, 'name': ''}
        return {fieldname: d}


class ScheduledTransaction(Entity):
    using_options(tablename='scheduled_transactions')

    description = Field(Unicode(250), required=True)
    amount = Field(DECIMAL(10, 2), required=True)
    transaction_date = Field(Date, required=True)
    user = ManyToOne('User', ondelete='cascade')
    account = ManyToOne('Account', ondelete='set null')
    category = ManyToOne('Category', ondelete='set null')
    payee = ManyToOne('Payee', ondelete='set null')

    frequency = Field(Integer)
    number_replications = Field(Integer)
    unit_replications = Field(Unicode(20))
    key = Field(Unicode(30), required=True)

    # validates_presence_of('description', 'amount', 'transaction_date')

    @property
    def get_session(self):
        return session

    def __repr__(self):
        return u'<Scheduled> key=%s' % self.key

    def to_dict(self):
        data = super(ScheduledTransaction, self).to_dict()
        data.update(self.__dict('account'))
        data.update(self.__dict('category'))
        data.update(self.__dict('payee'))
        return data

    def from_dict(self, data):
        if data:
            key = ''.join(choice(string.lowercase) for i in range(5))
            data.update({'key': data.get('key', key)})
            data.update({'amount': Decimal(data.get('amount', 0))})
            data.update({'frequency': int(data.get('frequency', 0))})
            data.update({'number_replications': int(data.get('number_replications', 0))})
            data = _replace_obj_by_id(data, 'account')
            data = _replace_obj_by_id(data, 'category')
            data = _replace_obj_by_id(data, 'payee')
        super(ScheduledTransaction, self).from_dict(data)

    def __dict(self, fieldname):
        field = self.__getattribute__(fieldname)
        d = {'id': field.id, 'name': field.name} if field else {'id': 0, 'name': ''}
        return {fieldname: d}


def _replace_obj_by_id(data, key):
    if key in data:
        i = data.get(key)
        fk_field = '%s_id' % key
        if i:
            data_id = i.get('id') if i else None
            if data_id:
                data.update({fk_field: data_id})
        data.pop(key)
    return data


setup_all(True)
