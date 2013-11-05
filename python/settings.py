class TestingConfig(object):
    DEBUG = False
    TESTING = True
    MONGOALCHEMY_DATABASE = 'poupaniquel_testing'
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///poupaniquel.db'
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:root@localhost/poupaniquel_testing'
    SECRET_KEY = '9m4u0nw5yy5eijqcaydwzv+6ukj8m!+a)*00wz!wfkfs-td*e3'


class DevelopmentConfig(object):
    DEBUG = True
    TESTING = False
    MONGOALCHEMY_DATABASE = 'poupaniquel'
    SQLALCHEMY_DATABASE_URI = 'mysql://root:root@localhost/poupaniquel'
    SECRET_KEY = '9m4u0nw5yy5eijqcaydwzv+6ukj8m!+a)*00wz!wfkfs-td*e3'


class ProductionConfig(object):
    DEBUG = False
    TESTING = False
    MONGOALCHEMY_DATABASE = 'poupaniquel'
    SQLALCHEMY_DATABASE_URI = 'mysql://root:root@localhost/poupaniquel'
    SECRET_KEY = '9m4u0nw5yy5eijqcaydwzv+6ukj8m!+a)*00wz!wfkfs-td*e3'
