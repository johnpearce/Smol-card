from setuptools import setup, find_packages

setup(
    name='appspace_scraper',
    version='1.0',
    packages=find_packages(),
    entry_points={'scrapy': ['settings = appspace_scraper.settings']},
    install_requires=[
        'Scrapy',
    ],
    zip_safe=False
)