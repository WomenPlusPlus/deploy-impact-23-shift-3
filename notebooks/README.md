## deploy-impact-23-shift-3 notebooks

This folder contains the code that was used for parsing the datasets with job descriptions and candidates' profiles.

One can download the dataset for candidates from [here](https://www.kaggle.com/datasets/heet9022/linkedin-dataset) and the dataset with jobs from [here](https://www.kaggle.com/datasets/andresionek/data-jobs-listings-glassdoor) and add the path to the datasets to the respective .yml files.

The following logical steps are used to clean the datasets:
* filter tech-related, Swiss-based, entry-level items
* for job descriptions: use only descriptions written in English using [langid](https://github.com/saffsd/langid.py) package
* extract soft and hard skills using [SkillNer](https://skillner.vercel.app/)
* extract languages using [language ISO list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 
* reorganize the columns (rename, drop ones not to be uploaded to the database, reset the index)
