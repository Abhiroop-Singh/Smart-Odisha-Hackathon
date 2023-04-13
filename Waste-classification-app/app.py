from tensorflow.keras.utils import load_img,img_to_array
# from __future__ import division, print_function
import sys
import os
import glob
import re
import numpy as np

# tensorflow
import tensorflow as tf
from tensorflow.keras.preprocessing import image

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

app = Flask(__name__)

# model = tf.keras.models.load_model('model/waste.h5')
model = tf.keras.models.load_model('model/train1.h5')

def model_predict(img_path,model):
    
    categ=[
        'bio-waste/ବାୟୋ ଆବର୍ଜନା |',
        'brown-glass',
        'cardboard',
        'clothes',
        'e_waste/This can be recyled at a decent price',
        'green-glass',
        'metal',
        'paper/କାଗଜ',
        'plastic/ପ୍ଲାଷ୍ଟିକ୍',
        'shoes',
        'trash',
        'white-glass'
        ]
    img=load_img(img_path,target_size=(300,300))
    x=img_to_array(img)
    x=x/255
    x=np.expand_dims(x,axis=0)
    # print(x.shape)
    images=np.vstack([x])
    # print(images)
    classes=model.predict(images,batch_size=10)
    return categ[np.argmax(classes)]
    # img = image.load_img(img_path,target_size=(64,64))
    # #Preprocessing the image
    # x=image.img_to_array(img)
    # x=np.expand_dims(x,axis=0)
    # result = model.predict(x)

    # prediction = ''

    # if result[0][0] == 1:
    #    prediction = 'recyclable waste'
    # else:
    #   prediction = 'organic waste'

    # return prediction

@app.route('/',methods=['GET'])
def index():
    # Main page
    return render_template('index.html')

@app.route('/predict', methods=['GET','POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        #save the file ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath,'uploads',secure_filename(f.filename))
        f.save(file_path)

        # make prediction
        preds = model_predict(file_path,model)

        return preds
    return None

if __name__ == '__main__':

    # app.run(port=5002, debug=True)

    # Serve the app with gevent
    #http_server = WSGIServer(('', 5000), app)
    #http_server.serve_forever()
    
    #app.run(host="192.168.29.186", port=800, debug=False)

    app.run()







