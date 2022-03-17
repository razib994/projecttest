import React, {useEffect, useState} from 'react';

function AddForm(props) {
    const [lists, setList] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
            fetch('http://localhost/api/get_form.php')
                .then((res)=>{
                    if(!res.ok){
                        throw Error('Get Form is Not Successfull');
                    }else {
                        return res.json();
                    }
                })
                .then((data)=>{
                    setList(data);
                    setLoading(false);
                }).catch((error)=>{
                setError(error.message);
            });
    }, []);
    return (
        <div>
            <div className="container">
                <div className="row pt-5 pb-2">
                    <div className="col-md-12">
                        <h4>{isLoading && "Loading.... "}</h4>
                        <form>
                        {lists && lists.data.fields.map((item) =>
                            Object.values(item).map((titles) =>

                                 <div className="mb-3 row">
                                     {console.log(titles)}
                                    <label className="col-sm-2 col-form-label">  {titles.title} </label>
                                     <div className="col-sm-10">
                                         {(titles.type == 'text' || titles.type =='email') ? <input type={titles.type} required={(titles.required == true) ? "required":""} className={titles.html_attr.class} id={titles.html_attr.id}/>:(titles.type == 'radio') ? "":""}
                                     </div>
                                </div>
                            )
                        )}
                            <div className="mb-3 row">
                                <label  className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddForm;