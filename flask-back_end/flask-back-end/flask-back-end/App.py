from flask import Flask,render_template,request,redirect,url_for,flash
from flask_mysqldb import MySQL
from flask_cors import CORS
import base64
import string
import random

app = Flask(__name__)
CORS(app)
# Coneccion a la base de datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'Banesco_User'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'Banesco_POS_MPOS'
app.config['MYSQL_PORT'] = 3306
mysql = MySQL(app)



@app.route('/afiliation',methods = ['GET', 'POST']) #Inserta datos en la tnañ
def add_contact():
    # obteniendo los datos del front end
    data = request.get_json()
    
    # verificando la longitud de los parametros suministrados desde el front end
    if len(data['docText']) > 15:
        return "<h1>El documento de identidad no puede ser mayor a 15 caracteres</h1>"
    elif data['serviceType'] not in ['MPOS', 'POS']:
        return "<h1>El tipo de servicio no es valido</h1>"
    elif data["clientType"] not in ['legal', 'natformal', 'natinformal']:
        return "<h1>El tipo de cliente no es valido</h1>"
    elif len(data["fname"]) > 20: 
        return "<h1>El nombre no puede ser mayor a 20 caracteres</h1>"
    elif len(data["lname"]) > 20:
        return "<h1>El apellido no puede ser mayor a 20 caracteres</h1>"
    elif len(data["email"]) > 35:
        return "<h1>El email no puede ser mayor a 35 caracteres</h1>"
    elif len(data["phone"]) > 9 or data["phone"].isdigit() == False:
        return "<h1>El telefono no puede ser mayor a 9 caracteres y solo debe contener numeros</h1>"
    elif len(data['address']) > 35:
        return "<h1>La direccion no puede ser mayor a 35 caracteres</h1>"

    # estableciendo conexion con el servicio mysql
    cur = mysql.connection.cursor()
    
    # generando el numero aleatorio para la cuenta bancaria
    # y verificando que no exista en la base de datos
    while True:
        account_number = str(generate_account_number(12))
        print("[!] Generando numero de cuenta: %s" % account_number)
        cur.execute("SELECT * FROM Customer WHERE accountNumber = %s", [account_number])
        if (cur.rowcount == 0):
            print("[!] El numero de cuenta %s no existe en la base de datos" % account_number)
            print("[!] Procediendo con la creacion de la cuenta")
            break

    merchant_id = str(generate_account_number(12))
    serial_id = str(generate_account_number(12))
    

    # verificando que la identidad de la persona no ese creada en la base de datos
    cur.execute("SELECT * FROM Customer WHERE docText = %s", [data['docText']])
    if (cur.rowcount > 0):
        print("[!] El numero de identidad %s ya existe en la base de datos" % data['docText'])
        return "<h1> El numero de identidad %s ya existe en la base de datos</h1>" % data['docText']

    # insertando los datos del cliente en la base de datos...
    for key, value in data.items():
        print("%20s: %s" % (key, value))

    cur.execute("INSERT INTO Customer (docText, accountNumber, serviceType, fName, lName, clientType, email, phone, address, localITBMS, Firma) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
    (data['docText'], account_number, data['serviceType'], data['fname'], data['lname'], data['clientType'], data['email'], data['phone'], data['address'], data['localITBMS'], 'Firma'))
    mysql.connection.commit()
        
    return f"""
    <h1> El numero de cuenta ha sido creado correctamente </h1>
    <p> Numero de cuenta: {account_number} </p>
    <p> El merchant ID: {merchant_id} </p>
    <p> El serial ID: {serial_id} </p>"""


    
def generate_account_number(length):
    return random.randint(10**(length-1), (10**length)-1)
    

    

if __name__ == '__main__':
    app.run(debug = True ,port=5000)
    



