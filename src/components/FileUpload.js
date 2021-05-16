import React, { Fragment, useState } from 'react'
import axios from 'axios';

export const FileUpload = () => {
  const[file, setFile] = useState('');
  const[fileName, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const onChange = e => {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);

      try{
          const res = await axios.post('/upload', formData, {
              headers:{
                  'Content-Type' : 'multipart/form-data'
              }
          });
        
          const { fileName, filePath} = res.data;
          setUploadedFile({ fileName, filePath});
      } catch(err){
          if(err.response.status === 500){
              console.log('There was a problem with the server');
            }
            else{
                console.log(err.response);
            }
      }
  };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
            <div className="input-group">
  <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={onChange} />
  
</div>

<br />
       
<div className="d-grid gap-2">
  <button className="btn btn-primary" type="submit">Upload</button>
  
</div>
            </form>
            { uploadedFile ?(<div className = "row mt-5">
                  <div className = "col-md-6 m-auto">
                      <h3 className="text-center">{ uploadedFile.fileName }</h3>
                    <img style={{ width: '100%'}} src={uploadedFile.filePath}></img>
                  </div>
            </div>)  : null}
        </Fragment>
    )
}

export default FileUpload;
