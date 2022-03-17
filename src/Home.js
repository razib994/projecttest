import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function Home(props) {
   const searchArray = [];
    const [lists, setLists] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState('');

    useEffect(() => {
        fetch('http://localhost/api/list.php')
            .then((res)=>{
                if(!res.ok){
                    throw Error('Fecting is Not Successfull');
                }else {
                    return res.json();
                }
            })
            .then((data)=>{
                setLists(data);
                setLoading(false);
                let sortableItems = [...lists];
                if (sortConfig !== null) {
                    sortableItems.sort((a, b) => {
                        if (a[sortConfig.key] < b[sortConfig.key]) {
                            return sortConfig.direction === 'ascending' ? -1 : 1;
                        }
                        if (a[sortConfig.key] > b[sortConfig.key]) {
                            return sortConfig.direction === 'ascending' ? 1 : -1;
                        }
                        return 0;
                    });
                }
                return sortableItems;
            }).catch((error)=>{
            setError(error.message);
        });
    }, []);


function OnFilteringData(e){
    setSearch(e.target.value)
}

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    return (
        <div>
            <div className="container">
                <div className="row pt-5 pb-2">
                    <div className="col-md-12">
                        <form>
                            <input type="text" className="form-control" onChange={OnFilteringData} placeholder="search this result....."/>
                        </form>
                    </div>
                    <div className="col-md-12">
                        <h4>{isLoading && "Loading.... "}</h4>
                        <table className="table table-bordered">
                            {lists && lists.data.headers.map((item) =>
                               <thead>
                                <tr key={item}>
                                    {Array(Object.values(item)).map((it) =>
                                        it.map((focus, fkes) =>
                                        (focus.hidden == false) ? <th key={fkes}><span className="tofinal" onClick={() => requestSort(focus.title)}>{ focus.title } </span>{(focus.sortable == true) ? "sort":"" } <br/> <input type={(focus.searchable == true) ? "text":"hidden"} onChange={OnFilteringData}  />  </th> : ""
                                        )
                                    )}
                                </tr>
                                </thead>
                             )}
                            <tbody>
                            {lists && lists.data.rows.filter((item) => {
                                if(search =="") {
                                    return item;
                                }else if (item.name.toLowerCase().includes(search.toLowerCase())){
                                    return item;
                                }

                            }).map((item) =>

                                <tr key={item.id} >
                                    <td><Link to="/UpdateForm/"> { item.id  } </Link></td>
                                    <td><Link to="/UpdateForm/" >{ item.name  } </Link></td>
                                    <td><Link to="/UpdateForm/" >{item.message}</Link></td>
                                    <td>{ item.created_at }  </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;