from datetime import datetime, date
from postDB import FinalPostdb
from bidDB import FinalBiddb
from flask import Flask, request, session, redirect, url_for, abort, \
    render_template, flash, jsonify  # prune g
from user import Customer, Freelancer

app = Flask(__name__)
app.config['SECRET_KEY'] = 'BATMANJOKER'

@app.route('/')
def hello_world():
    return 'Hello World!'



@app.route('/logout')
def logout():
    session['logged_in'] = False
    return redirect(url_for('homepage'))


@app.route('/<string:ctype>/signup', methods=['GET', 'POST'])
def signup(ctype):
    if session.get('logged_in'):
        return render_template('welcome.html')

    if request.method == 'GET':
        return render_template('signup.html')

    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        if ctype == 'customer':
            u = Customer.register(username=username, password=password, email=email)
            u.put()
        elif ctype == 'freelancer':
            u = Freelancer.register(username=username, password=password, email=email)
            u.put()

        return redirect(url_for('login', ctype=ctype))


@app.route('/<string:ctype>/login', methods=['GET', 'POST'])
def login(ctype):

    if session.get('logged_in'):
        return render_template('welcome.html')

    if request.method == 'GET':
        return render_template('login.html')

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if ctype == 'customer':
            u, e = Customer.login(username, password)
            if u:

                session['logged_in'] = True
                print username
                session['username'] = username
                print 'guitar'

                return redirect(url_for('customerpost'))
            else:
                return render_template('login.html', **e)
        elif ctype == 'freelancer':
            u, e = Freelancer.login(username, password)
            if u:
                session['username'] = username
                session['logged_in'] = True
                return render_template('welcome.html')
            else:
                return render_template('login.html', **e)


@app.route('/homepage', methods=['GET', 'POST'])
def homepage():
    if request.method == 'GET':
        return render_template('homepage.html')


@app.route('/customerpost', methods=['GET', 'POST'])
def customerpost():
    if request.method == 'GET':
        return render_template('customerpost.html', e='')

    if request.method == 'POST':

        title = request.form['title']
        description = request.form['description']
        start_date = request.form['start_date']
        format_str = '%m/%d/%Y'
        start_date = datetime.strptime(start_date, format_str)
        end_date = request.form['end_date']
        end_date = datetime.strptime(end_date, format_str)
        min_bid = request.form['min_bid']
        max_bid = request.form['max_bid']
        print 'reached'
        FinalPostdb.add_post(session['username'], title, description, min_bid, max_bid, start_date.date(), end_date.date())
        return redirect(url_for("hello_world"))


@app.route('/bids', methods=['GET', 'POST'])
def get_bids():
    if request.method == 'GET':
        posts = list(FinalPostdb.all())
        return render_template('bids.html', posts=posts)
    if request.method == 'POST':
        bid_value = request.form['amount']
        post_id = request.form['post_id']
        FinalBiddb.add_bid(session['username'], post_id, bid_value)


if __name__ == '__main__':
    app.run(threaded=True)
