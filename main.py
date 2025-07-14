from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
import os
import uuid
from datetime import timedelta, datetime
import pandas as pd
from io import StringIO
import time
import schedule

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Data(db.Model):
    session_id = db.Column(db.String(36), primary_key=True)
    json_data = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()
    
def delete_old_csv_files():
    current_time = time.time()
    csv_dir = 'src/csv'

    for filename in os.listdir(csv_dir):
        file_path = os.path.join(csv_dir, filename)
        if os.path.isfile(file_path) and filename.endswith('.csv'):
            file_age = current_time - os.path.getctime(file_path)
            if file_age > 24 * 60 * 60:
                os.remove(file_path)

@app.route('/')
def index():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload():
    session_id = str(uuid.uuid4())
    
    if 'csv_file' not in request.files:
        return 'No file part'

    file = request.files['csv_file']

    if file.filename == '':
        return 'No selected file'

    if file:
        file.save(f'src/csv/{session_id}.csv')

        data = []

        df = pd.read_csv(f'src/csv/{session_id}.csv')
        data_json = df.to_json(orient='records')
        
        with app.app_context():
            db.session.add(Data(session_id=session_id, json_data=data_json))
            db.session.commit()

        return redirect(url_for('show_data', session_id=session_id))

@app.route('/show_data/<session_id>')
def show_data(session_id):
    result = Data.query.filter_by(session_id=session_id).first()

    if result is None:
        return redirect(url_for('index'))

    data_json = result.json_data

    data = pd.read_json(StringIO(data_json), orient='records')

    data_list = data.to_dict(orient='records')

    return render_template('show_data.html', data=data_list, current=0)

@app.route('/about')
def about():
    return render_template('about.html')
    
if __name__ == '__main__':
    schedule.every(1).hours.do(delete_old_csv_files)
    
    app.run(host="0.0.0.0", port=5000, debug=False)
    
    while True:
        schedule.run_pending()
        time.sleep(1)
