"""
This is a Handler Module with all the individual handlers for HelloWorld-Plugin.
"""
from notebook.utils import url_path_join
from notebook.base.handlers import APIHandler

def setup_handlers(web_app):
    """Setup all handlers for the "Hello World" plugin.

    Args:
        webapp:
    """
    host_pattern = '.*$'
    route_pattern = url_path_join(web_app.settings['base_url'], '/hello')
    web_app.add_handlers(host_pattern, [(route_pattern, HelloWorldHandler)])


class HelloWorldHandler(APIHandler):
    def get(self):
        self.finish('Hello, world!')
