from StringIO import StringIO
import views_test as unittest
from os.path import join


class HomeBankTest(unittest.TestCase):

    URL = '/api/v1/importing/homebank'

    def test_upload_valid_homebank_xml(self):
        filename = join(self.helper.resources_dir(), 'homebank-sample.xhb')
        xml = open(filename, 'r')

        response = self.app.post(
            self.URL,
            data={'filename': xml}
        )
        self.assertEqual(200, response.status_code)

    def test_upload_empty_homebank_file(self):
        filename = join(self.helper.resources_dir(), 'empty.xhb')
        xml = open(filename, 'r')

        response = self.app.post(
            self.URL,
            data={'filename': xml}
        )
        # data = self.helper.from_json(response.data)
        self.assertEqual(500, response.status_code)

    def test_upload_invalid_homebank_file(self):
        response = self.app.post(
            self.URL,
            data={'filename': (StringIO('my file contents'), 'myfile.xhb')}
        )
        self.assertEqual(500, response.status_code)


class CsvTest(unittest.TestCase):

    URL = '/api/v1/importing/csv'

    def test_upload_valid_file(self):
        filename = join(self.helper.resources_dir(), 'itau.csv')
        csv = open(filename, 'r')

        response = self.app.post(
            self.URL,
            data={'filename': csv}
        )
        self.assertEqual(200, response.status_code)

        data = self.helper.from_json(response.data)
        fields = data.get('fields')
        self.assertEqual(15, len(fields))

    def test_upload_invalid_file(self):
        filename = join(self.helper.resources_dir(), 'empty.xhb')
        csv = open(filename, 'r')

        response = self.app.post(
            self.URL,
            data={'filename': csv}
        )

        self.assertEqual(500, response.status_code)
        self.assertEqual('{"status": 500, "fields": [], "total": 0, "messages": [], "success": true}', response.data)
