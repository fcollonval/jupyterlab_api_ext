"""
Python module to initialize Server Extension & Notebook Extension
"""
from jupyterlab_api_ext.handlers import setup_handlers
from notebook.notebookapp import NotebookWebApplication

def _jupyter_server_extension_paths():
    """
    Function to declare Jupyter Server Extension Paths.
    """
    return [{
        'module': 'jupyterlab_api_ext',
    }]


def _jupyter_nbextension_paths():
    """
    Function to declare Jupyter Notebook Extension Paths.
    """
    return [{"section": "notebook", "dest": "jupyterlab_api_ext"}]


def load_jupyter_server_extension(nbapp: NotebookWebApplication):
    """
    Function to load Jupyter Server Extension.

    Args:
        nbapp (NotebookWebApplication): handle to the Notebook webserver instance.
    """
    setup_handlers(nbapp.web_app)
