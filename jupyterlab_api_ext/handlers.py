"""
This is a Handler Module with all the individual handlers for HelloWorld-Plugin.
"""
import json

from notebook.utils import url_path_join
from notebook.base.handlers import APIHandler

def setup_handlers(web_app):
    """Setup all handlers for the "Hello World" plugin.

    Args:
        webapp:
    """
    host_pattern = '.*$'
    web_app.add_handlers(host_pattern, 
                         [(url_path_join(web_app.settings['base_url'], '/hello'), HelloWorldHandler),
                          (url_path_join(web_app.settings['base_url'], '/hello/personal'), PersonalHelloHandler)])


class HelloWorldHandler(APIHandler):
    def get(self):
        """Function handling GET method.
        
        Here sends simple greeting back.
        """
        self.finish('Hello, world!')
    
    def post(self):
        """Function handling POST method.
        
        Here sends simple greeting back.
        """
        self.finish('Hello, world!')


class PersonalHelloHandler(APIHandler):
    def post(self):
        """Function handling POST method.

        Get the name from the request body and returns a customized greeting.
        """
        # input_data is a dictionnary with a key 'name'
        input_data = json.loads(self.request.body.decode('utf-8'))
        data = {
            'greetings': 'Hello {}, enjoy JupyterLab!'.format(input_data['name'])
        }
        self.finish(json.dumps(data))
