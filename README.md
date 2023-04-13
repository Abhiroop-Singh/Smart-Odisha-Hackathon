# Project Title

Swachhta-A step towards sanity
# Project Description
 
The "Swachhta" Project is an innovative web-based solution that helps residents of Odisha request municipal services such as waste pickup, drainage issues, sewage issues, etc. 

In addition, Swachhta empowers citizens to report improper waste disposal by industries to the appropriate authorities.

Furthermore, it has a feature that is ML-based where citizens can scan the waste to know what type of waste it is. 

This project will help in increasing the segregation of waste and will also help in classification and seperation of recyclable waste , especially e-waste that will also be a source of revenue;

This will also increase public participation by providing them the facility to know whether the waste is recyclable or not, and also by enabling them to complaint about industries easily
## Installation

Install Swachhta by following the below mentioned steps

```bash
  git clone https://github.com/Abhiroop-Singh/Swachhta.git
  cd Swachhta
```
## installation of create react app
```bash
  npm i
```

## installation of backend packages
```bash
  cd backend
  npm i
```

## set up the virtual environment for AI Model
```bash
  py -m venv my_env
  .\my_env\Scripts\activate = to activate virtual environment
  ```

  ## Install the required packages for virtual environment
  ```bash
      pip install tensorflow
      pip install numpy flask scipy
      pip install google-auth
      pip install gunicorn h5py
      pip install gevent
      pip install Pillow
```
## Steps to run the project
     Open 3 terminals simulataneously
    
```bash
On First Terminal
          npm run start
```

```bash
On Second Terminal
          cd backend
          node index.js
```

```bash
On Third Terminal
          .\my_env\Scripts\activate
          cd Waste-classification-app
          py app.py
```
