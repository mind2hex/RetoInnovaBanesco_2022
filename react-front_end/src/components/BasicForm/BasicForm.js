import { useState } from 'react';
import React from 'react';
import "./BasicForm.css";
import "../../pages/css/w3.css";


export const BasicForm = () => {
  const [formData, setFormData] = useState({ 
    serviceType: 'POS',
    clientType: 'legal',
    localType: '',
    socialReason: '',
    RUCNumber: '',
    operationYears: '',
    localName: '',
    comercialActivity: '',
    country: '',
    city: '',
    province: '',
    district: '',
    correg: '',
    urbanization: '',
    street: '',
    reference: '',
    building: '',
    localNumber: '',
    localPhone: '',
    localWeb: '',
    noticeOperation: '',
    publicRecord: '',
    localFachada: '',
    localMerchandise: '',
    localPOSplace: '',
    localITBMS: 'false',
    localDGI: ''
  });

  const [legalClient, setLegalClient] = useState({ 
    fname: '',
    lname: '',
    docType: 'identification',
    docText: '',
    docFile: '' ,
    position: '',
    phone: '',
    address: '',
    email: '',
    USA: 'false',
    PEP: 'false',
    PEPName: '',
  })

  const [natFormalClient, setNatFormalClient] = useState({
    fname: '',
    lname: '',
    docType: 'identification',
    docText: '',
    docFile: '',
    position: '',
    phone: '',
    address: '',
    email: '',
    USA: 'false',
    PEP: 'false',
    PEPName: '',
  })

  const [natInformalClient, setNatInformalClient] = useState({
    fname: '',
    lname: '',
    docType: 'identification',
    docText: '',
    docFile: '',
    position: '',
    phone: '',
    address: '',
    email: '',
    USA: 'false',
    PEP: 'false',
    PEPName: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    let response = '';
    if (formData.clientType == "legal"){
      let data = {
        ...formData,
        ...legalClient
      }
      response = postData("http://localhost:5000/afiliation",  data);
    }else if(formData.clientType == "natformal"){
      let data = {
        ...formData,
        ...natFormalClient
      }      
      response = postData("http://localhost:5000/afiliation", data);
    }else if(formData.clientType == "natinformal"){
      let data = {
        ...formData,
        ...natInformalClient
      }      
      response = postData("http://localhost:5000/afiliation", data);
    }
    
    console.log(response);
  };

  const handleFormChange = (event) => {
    // Se escribe la informacion introducida por el usuario en el estado formData
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLegalClientChange = (event) => {
    setLegalClient({ ...legalClient, [event.target.name]: event.target.value });
  }

  const handleNatFormalClientChange = (event) => {
    setNatFormalClient({ ...natFormalClient, [event.target.name]: event.target.value });
  }

  const handleNatInformalClientChange = (event) => {
    setNatInformalClient({ ...natInformalClient, [event.target.name]: event.target.value });
  }

  async function postData(url, data = {}){
    // esta funcion se usa para enviar los datos usando el metodo POST al backend
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    return response;
  };

  function basicInputForm(label_text, dest_val, dest_type, dest_name, dest_handler){
    return (
      <div className='row'>
          <div className='col-25'>
            <label>{label_text}</label>
          </div>
          <div className='col-75'>
            <input 
              value={dest_val}
              type={dest_type} 
              name={dest_name} 
              required
              onChange={dest_handler} />
          </div>
        </div>
      );
  }

  function clientType_document(clientType){
    if (clientType == "legal"){
      return (<>
        {basicInputForm("Nombre del representante legal:", legalClient.fname, "text", "fname", handleLegalClientChange)}
        {basicInputForm("Apellido del representante legal:", legalClient.lname, "text", "lname", handleLegalClientChange)}

        {/* tipo de documento [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>Tipo de documento:</label>
          </div>
          <div className='col-75'>
            <select value={legalClient.docType} name="docType" onChange={handleLegalClientChange}>
              <option value="identification">cedula</option>
              <option value="passport">pasaporte</option>
            </select>
          </div>
        </div>

        {/* documento del representante legal */}
        {
          (legalClient.docType == "identification") 
          ? <>{basicInputForm("Cedula del representante legal:", legalClient.docText, "text", "docText", handleLegalClientChange)} </>
          : <>{basicInputForm("Pasaporte del representante legal:", legalClient.docText, "text", "docText", handleLegalClientChange)} </>
        }  

        {/* archivo del documento del representante legal */}
        {
          (legalClient.docType == "identification") 
          ? <>{basicInputForm("Inserte la cedula:", legalClient.docFile, "file", "docFile", handleLegalClientChange)} </>
          : <>{basicInputForm("Inserte el pasaporte:", legalClient.docFile, "file", "docFile", handleLegalClientChange)} </>
        }
        
        {basicInputForm("Cargo del representante legal:", legalClient.position, "text", "position", handleLegalClientChange)}
        {basicInputForm("Celular del representante legal:", legalClient.phone, "text", "phone", handleLegalClientChange)}
        {basicInputForm("Direccion del representante legal:", legalClient.address, "text", "address", handleLegalClientChange)}
        {basicInputForm("Email del representante legal:", legalClient.email, "email", "email", handleLegalClientChange)}

        {/* residente de EEUU [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>¿Es residente de los Estados Unidos de America?</label>
          </div>
          <div className='col-75'>
            <select value={legalClient.USA} name="USA" onChange={handleLegalClientChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>    

        {/* residente de EEUU [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>¿Tiene algún familiar expuesto politicamente (PEP)?</label>
          </div>
          <div className='col-75'>
            <select value={legalClient.PEP} name="PEP" onChange={handleLegalClientChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>    
        
        {/* archivo del documento del representante legal */}
        {
          (legalClient.PEP == "true") 
          ? <>{basicInputForm("Inserte el nombre del familiar (PEP):", legalClient.PEPName, "text", "PEPName", handleLegalClientChange)} </>
          : <> </>
        }

      </>)
    }else if(clientType == "natformal"){
      return (<>
        {basicInputForm("Nombre:", natFormalClient.fname, "text", "fname", handleNatFormalClientChange)}
        {basicInputForm("Apellido:", natFormalClient.lname, "text", "lname", handleNatFormalClientChange)}

        {/* tipo de documento [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>Tipo de documento:</label>
          </div>
          <div className='col-75'>
            <select value={natFormalClient.docType} name="docType" onChange={handleNatFormalClientChange}>
              <option value="identification">cedula</option>
              <option value="passport">pasaporte</option>
            </select>
          </div>
        </div>

        {/* documento del representante legal */}
        {
          (natFormalClient.docType == "identification") 
          ? <>{basicInputForm("Cedula:", natFormalClient.docText, "text", "docText", handleNatFormalClientChange)} </>
          : <>{basicInputForm("Pasaporte:", natFormalClient.docText, "text", "docText", handleNatFormalClientChange)} </>
        }  

        {/* archivo del documento del representante legal */}
        {
          (natFormalClient.docType == "identification") 
          ? <>{basicInputForm("Inserte la cedula:", natFormalClient.docFile, "file", "docFile", handleNatFormalClientChange)} </>
          : <>{basicInputForm("Inserte el pasaporte:", natFormalClient.docFile, "file", "docFile", handleNatFormalClientChange)} </>
        }
        
        {basicInputForm("Cargo:", natFormalClient.position, "text", "position", handleNatFormalClientChange)}
        {basicInputForm("Celular:", natFormalClient.phone, "text", "phone", handleNatFormalClientChange)}
        {basicInputForm("Direccion:", natFormalClient.address, "text", "address", handleNatFormalClientChange)}
        {basicInputForm("Email:", natFormalClient.email, "email", "email", handleNatFormalClientChange)}

        {/* residente de EEUU [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>¿Es residente de los Estados Unidos de America?</label>
          </div>
          <div className='col-75'>
            <select value={natFormalClient.USA} name="USA" onChange={handleNatFormalClientChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>    

        {/* residente de EEUU [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>¿Tiene algún familiar expuesto politicamente (PEP)?</label>
          </div>
          <div className='col-75'>
            <select value={natFormalClient.PEP} name="PEP" onChange={handleNatFormalClientChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>    
        
        {/* archivo del documento del representante legal */}
        {
          (natFormalClient.PEP == "true") 
          ? <>{basicInputForm("Inserte el nombre del familiar (PEP):", natFormalClient.PEPName, "text", "PEPName", handleNatFormalClientChange)} </>
          : <> </>
        }

      </>)      
    }else if (clientType == "natinformal"){
      return (<>
        {basicInputForm("Nombre:", natInformalClient.fname, "text", "fname", handleNatInformalClientChange)}
        {basicInputForm("Apellido:", natInformalClient.lname, "text", "lname", handleNatInformalClientChange)}

        {/* tipo de documento [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>Tipo de documento:</label>
          </div>
          <div className='col-75'>
            <select value={natInformalClient.docType} name="docType" onChange={handleNatInformalClientChange}>
              <option value="identification">cedula</option>
              <option value="passport">pasaporte</option>
            </select>
          </div>
        </div>

        {/* documento del representante legal */}
        {
          (natInformalClient.docType == "identification") 
          ? <>{basicInputForm("Cedula:", natInformalClient.docText, "text", "docText", handleNatInformalClientChange)} </>
          : <>{basicInputForm("Pasaporte:", natInformalClient.docText, "text", "docText", handleNatInformalClientChange)} </>
        }  

        {/* archivo del documento del representante legal */}
        {
          (natInformalClient.docType == "identification") 
          ? <>{basicInputForm("Inserte la cedula:", natInformalClient.docFile, "file", "docFile", handleNatInformalClientChange)} </>
          : <>{basicInputForm("Inserte el pasaporte:", natInformalClient.docFile, "file", "docFile", handleNatInformalClientChange)} </>
        }
        
        {basicInputForm("Cargo:", natInformalClient.position, "text", "position", handleNatInformalClientChange)}
        {basicInputForm("Celular:", natInformalClient.phone, "text", "phone", handleNatInformalClientChange)}
        {basicInputForm("Direccion:", natInformalClient.address, "text", "address", handleNatInformalClientChange)}
        {basicInputForm("Email:", natInformalClient.email, "email", "email", handleNatInformalClientChange)}

        {/* residente de EEUU [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>¿Es residente de los Estados Unidos de America?</label>
          </div>
          <div className='col-75'>
            <select value={natInformalClient.USA} name="USA" onChange={handleNatInformalClientChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>    

        {/* residente de EEUU [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>¿Tiene algún familiar expuesto politicamente (PEP)?</label>
          </div>
          <div className='col-75'>
            <select value={natInformalClient.PEP} name="PEP" onChange={handleNatInformalClientChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>    
        
        {/* archivo del documento del representante legal */}
        {
          (natInformalClient.PEP == "true") 
          ? <>{basicInputForm("Inserte el nombre del familiar (PEP):", natInformalClient.PEPName, "text", "PEPName", handleNatInformalClientChange)} </>
          : <> </>
        }
      </>)     
    }
  }

  return (
    <div  className="container">
      <form onSubmit={handleSubmit} method="post">
        <br /> <br />
        <h1 align="center" className="title">Datos del Cliente</h1>
        {/* tipo de servicio [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>Tipo de servicio:</label>
          </div>
          <div className='col-75'>
            <select value={formData.serviceType} name="serviceType" onChange={handleFormChange}>
              <option value="POS">POS</option>
              <option value="MPOS">MPOS</option>
            </select>
          </div>
        </div>

        {/* tipo de cliente [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>Tipo de cliente:</label>
          </div>
          <div className='col-75'>
            <select value={formData.clientType} name="clientType" onChange={handleFormChange}>
              <option value="legal">Juridico</option>
              <option value="natformal">Natural Formal</option>
              <option value="natinformal">Natural Informal</option>
            </select>
          </div>
        </div>

        {clientType_document(formData.clientType)}

        <br />
        <h1 align="center" className="title">Datos del Establecimiento</h1>

        {
          (formData.clientType == "natinformal") 
          ? <></>
          : <>
        {/* tipo de local [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>Tipo de local:</label>
          </div>
          <div className='col-75'>
            <select value={formData.localType} name="localType" onChange={handleFormChange}>
              <option value="owner">Propietario</option>
              <option value="rented">Arrendado</option>
            </select>
          </div>
        </div>                     
          </>
        }

        {basicInputForm("Razon social:", formData.socialReason, "text", "socialReason", handleFormChange)}
        {basicInputForm("Número de RUC:", formData.RUCNumber, "text", "RUCNumber", handleFormChange)}
        
        {
          (formData.clientType == "natinformal") 
          ? <></>
          : <>{basicInputForm("Años de operacion:", formData.operationYears, "number", "operationYears", handleFormChange)}</>
        }
        
        {basicInputForm("Nombre del establecimiento:", formData.localName, "text", "localName", handleFormChange)}
        {basicInputForm("Actividad comercial:", formData.comercialActivity, "text", "comercialActivity", handleFormChange)}
        {basicInputForm("Pais de residencia:", formData.country, "text", "country", handleFormChange)}
        {basicInputForm("Ciudad:", formData.city, "text", "city", handleFormChange)}
        {basicInputForm("Provincia:", formData.province, "text", "province", handleFormChange)}
        {basicInputForm("Distrito:", formData.district, "text", "district", handleFormChange)}
        {basicInputForm("Corregimiento:", formData.correg, "text", "correg", handleFormChange)}
        {basicInputForm("Barriada/Urbanizacion:", formData.urbanization, "text", "urbanization", handleFormChange)}
        {basicInputForm("Calle/Avenida:", formData.street, "text", "street", handleFormChange)}
        {basicInputForm("Punto de referencia:", formData.reference, "text", "reference", handleFormChange)}
        {basicInputForm("Edificio:", formData.building, "text", "building", handleFormChange)}

        {
          (formData.clientType == "natinformal") 
          ? <></>
          : <>{basicInputForm("Numero de local:", formData.localNumber, "text", "localNumber", handleFormChange)}</>
        }        
        
        {basicInputForm("Numero de telefono:", formData.localPhone, "text", "localPhone", handleFormChange)}
        {basicInputForm("Pagina Web:", formData.localWeb, "text", "localWeb", handleFormChange)}
        
        {
          (formData.clientType == "natinformal") 
          ? <></>
          : <>{basicInputForm("Copia del aviso de operaciones:", formData.noticeOperation, "file", "noticeOperation", handleFormChange)}</>
        }          
        
        {
          (formData.clientType == "legal") 
          ? <>{basicInputForm("Copia de pacto social y enmiendas:", formData.publicRecord, "file", "publicRecord", handleFormChange)}</>
          : <></>
        }
        
        <br />
        <h1 align="center" className="title"> Fotografías del Establecimiento </h1>
        {basicInputForm("Fachada del establecimiento:", formData.localFachada, "file", "localFachada", handleFormChange)}
        {basicInputForm("Mercancia del establecimiento:", formData.localMerchandise, "file", "localMerchandise", handleFormChange)}
        {basicInputForm("Lugar de instalacion del POS:", formData.localPOSplace, "file", "localPOSplace", handleFormChange)}

        {/* Exonerado del itbms [Seleccion de opcion] */}
        <div className='row'>
          <div className='col-25'>
            <label>¿Cliente exonerado del ITBMS?:</label>
          </div>
          <div className='col-75'>
            <select value={formData.localITBMS} name="localITBMS" onChange={handleFormChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>                

        {/* archivo del documento del representante legal */}
        {
          (formData.localITBMS == "true") 
          ? <>{basicInputForm("Adjunte una copia del certificado de la DGI:", formData.localDGI, "file", "localDGI", handleFormChange)} </>
          : <></>
        }

        <br /><br />
        <input type="submit" />
      </form>
    </div>
  );
}      

/*
{basicInputForm("Nombre:", formData.name, "text", "name")}
{basicInputForm("Apellido:", formData.surname, "text", "surname")}
{basicInputForm("Correo electronico:", formData.email, "text", "email")}
{basicInputForm("Confirme su correo electronico:", formData.emailConf, "text", "emailConf")}
{basicInputForm("Telefono celular:", formData.phone, "text", "phone")}
{request_option("Tipo de documento:", formData.docType, "docType", )}
*/