# Mano Aloe messages of support backend

Flask backend api for distributing and storing the messages of support for the community website project of theMano Aloe Support Squad (M.A.S.S) discord server [Link](https://discord.gg/Y4BBfyM)

## Installation & Usage

List of commands to run in order to get the server to work.

```bash
pip install -r requirements.txt
py3 manage.py db init
py3 manage.py db migrate
py3 manage.py create_db
py3 manage.py runserver
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Pre-Commit

This repo supports pre-commit with some generic rules. To make life easier, install and use [pre-commit](https://pre-commit.com/) when developing here.

## License
[MIT](https://choosealicense.com/licenses/mit/)
