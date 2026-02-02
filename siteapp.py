from flask import Flask, render_template, jsonify
import joblib
import numpy as np
import serial
import requests

app = Flask(__name__)

model = joblib.load("gesture_model.pkl")   

PORT = "COM3"  
BAUD = 9600
ser = None   

def get_sensor_data():
    global ser
    try:
        if ser is None or not ser.is_open:
            ser = serial.Serial(PORT, BAUD, timeout=1)
            print(f"✅ Reconnected to {PORT}")

        line = ser.readline().decode(errors='ignore').strip()
        if line:
            print("Raw line:", line)
            sensors = list(map(int, line.split(',')))
            if len(sensors) == 5:
                return sensors
    except Exception as e:
        print("Error:", e)
        if ser:
            try:
                ser.close()
            except:
                pass
        ser = None
        return []
    return []