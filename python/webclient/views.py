# -*- coding: utf-8 -*-
from flask import render_template
from run import app


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/show/accounts")
def accounts():
    return render_template('accounts.html')


@app.route("/show/categories")
def categories():
    return render_template('categories.html')


@app.route("/show/payees")
def payees():
    return render_template('payees.html')


@app.route("/show/transactions")
def transactions():
    return render_template('transactions.html')


@app.route("/show/scheduled/transactions")
def scheduled_transactions():
    return render_template('scheduled_transactions.html')


@app.route("/show/homebank")
def homebank():
    return render_template('homebank.html')


@app.route("/show/csv")
def csv():
    return render_template('csv.html')


@app.route("/show/reports/balance")
def balance():
    return render_template('balance.html')


@app.route("/authentication/signup")
def signup():
    return render_template('signup.html')


@app.route("/authentication/login")
def signin():
    return render_template('login.html')


@app.route("/calculator")
def calculator():
    return render_template('calculator.html')
