# Vendnue

## Setting Up

To set up Vendnue on your local computer, make sure you have
[nginx](http://nginx.org/en/download.html) installed. The following assumes
it's installed at `/usr/local/nginx/`, as is default on MacOS.

It also assumes you have virtualenv installed. Run `$ pip install virtualenv`
if you don't.

1. Checkout the repo
```bash
$ git clone https://github.com/jaredhanson11/Vendnue.git
$ cd Vendnue/
```
2. Customize and then copy your config files to the proper location.
```bash
$ cp -i config/nginx.conf.template config/nginx.conf
$ vim config/nginx.conf
$ cp -i config/nginx.conf /usr/local/etc/nginx/

$ cp -i config/config.py.template config/config.py
$ vim config/config.py
$ cp -i config/config.py server/config.py
```
3. Set up your virtual environment and install python dependencies
```bash
$ cd server/
$ virtualenv venv
$ . venv/bin/activate
$ pip install -r ../config/requirements.txt
```
4. If you decided to use the sqlite dev database in your config, initialize
   your database as follows.
   - TODO: write a script that populates the db with values, don't want it on
       github because it'll change values too much
```
$ python
>>> from server import db
>>> db.create_all()
>>> exit()
```
5. Install React dependencies and build your bundles
```bash
$ cd Vendnue/client/
$ npm install
$ webpack
```

## Running Vendnue Locally

### Server
You can start the server one of two ways.

#### Flask's built in development server
```bash
$ cd Vendnue/server/
$ . venv/bin/activate
$ python run.py
```

#### Gunicorn
```bash
$ cd Vendnue/server/
$ . venv/bin/activate
$ gunicorn server:app -b "127.0.0.1:5000"
```

### Client

#### Serving Client with Nginx
```bash
$ nginx -s stop
$ nginx
```

#### Starting the webpack
```bash
$ cd Vendnue/client/
$ webpack
```
