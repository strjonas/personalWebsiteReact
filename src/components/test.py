
from flask import Flask, render_template, url_for, request, redirect, send_from_directory, session, g, abort, current_app as app, flash

app = Flask(__name__)


@app.route('/')
def App_don():
    Approval_don = [{"text": "hallo"}]
    print(Approval_don)
    return render_template('blabla.html', todos=Approval_don)


@app.route('/Sel_App_don/<string:name>')
def Sel_App_don(name):
    if name:
        return render_template('new.html', var=name)


app.run(debug=True)
