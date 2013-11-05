#!/usr/bin/env python                                                                                                                                        
from setuptools import setup, find_packages

setup(version = '0.1',
    name = 'poupaniquel',
    description = 'Financial software',
    author = 'Gustavo Henrique',
    author_email = 'gustavo@gustavohenrique.net',
    packages = find_packages(exclude=['docs', 'tests']),
    install_requires = ['flask', 'Flask-MongoAlchemy'],
    test_suite = 'tests',
    tests_require=['nose', 'coverage', 'flask', 'Flask-MongoAlchemy']
)
