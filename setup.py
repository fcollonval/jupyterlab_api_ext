"""
Setup Module to setup Python Handlers for the "Hello World" Plugin.
"""
import setuptools

setuptools.setup(
    name='jupyterlab_api_ext',
    version='0.1.0',
    packages=setuptools.find_packages(),
    install_requires=[
        'notebook'
    ],
    package_data={'jupyterlab_api_ext': ['*']},
)
