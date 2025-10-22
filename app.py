from flask import Flask, render_template, request, session, redirect, url_for
import datetime

app = Flask(__name__)
app.secret_key = 'manor_of_shadow_secret_key_2024'

# Room passwords (can be customized)
ROOM_PASSWORDS = {
    'room1': '1892',
    'room2': 'VENUS',
    'room3': '4321',
    'final': 'SHADOW'
}

@app.route('/')
def index():
    session.clear()
    session['start_time'] = datetime.datetime.now().isoformat()
    return render_template('index.html')

@app.route('/room1', methods=['GET', 'POST'])
def room1():
    if request.method == 'POST':
        password = request.form.get('password', '')
        if password.upper() == ROOM_PASSWORDS['room1']:
            session['room1_complete'] = True
            return redirect(url_for('room2'))
        else:
            return render_template('room1.html', error="Incorrect code. Look for clues in the books!")
    
    return render_template('room1.html')

@app.route('/room2', methods=['GET', 'POST'])
def room2():
    if not session.get('room1_complete'):
        return redirect(url_for('room1'))
    
    if request.method == 'POST':
        password = request.form.get('password', '')
        if password.upper() == ROOM_PASSWORDS['room2']:
            session['room2_complete'] = True
            return redirect(url_for('room3'))
        else:
            return render_template('room2.html', error="Wrong combination! Study the paintings carefully.")
    
    return render_template('room2.html')

@app.route('/room3', methods=['GET', 'POST'])
def room3():
    if not session.get('room2_complete'):
        return redirect(url_for('room2'))
    
    if request.method == 'POST':
        password = request.form.get('password', '')
        if password.upper() == ROOM_PASSWORDS['room3']:
            session['room3_complete'] = True
            return redirect(url_for('final_room'))
        else:
            return render_template('room3.html', error="Incorrect sequence! Check the candle patterns.")
    
    return render_template('room3.html')

@app.route('/final', methods=['GET', 'POST'])
def final_room():
    if not session.get('room3_complete'):
        return redirect(url_for('room3'))
    
    if request.method == 'POST':
        password = request.form.get('password', '')
        if password.upper() == ROOM_PASSWORDS['final']:
            session['final_complete'] = True
            end_time = datetime.datetime.now()
            start_time = datetime.datetime.fromisoformat(session['start_time'])
            escape_time = end_time - start_time
            session['escape_time'] = str(escape_time).split('.')[0]  # Remove microseconds
            return redirect(url_for('success'))
        else:
            return render_template('final.html', error="Master lock remains closed. Combine all previous clues!")
    
    return render_template('final.html')

@app.route('/success')
def success():
    if not session.get('final_complete'):
        return redirect(url_for('index'))
    return render_template('success.html', escape_time=session.get('escape_time', 'Unknown'))

if __name__ == '__main__':
    app.run(debug=True)