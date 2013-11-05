export POUPANIQUEL_SETTINGS=

all: test

clean:
	@find . -name "*.pyc" -delete
	@rm -rf *.egg-info coverage.xml nosetests.xml *.report

fulltest: clean
	@nosetests tests -v --with-xcoverage --with-xunit --cover-package tests --cover-erase
	@pylint --rcfile=.pylint --disable=C0111,C0103,W0401,F0401,W0703 --ignore=settings.py,models.py,generic.py -f parseable api tests | tee pylint.report
	@pep8 --max-line-length=150 api tests | tee pep8.report

test: clean
	@nosetests tests -v

run: clean
	@python run.py --env dev

dist: clean
	@python setup.py sdist
