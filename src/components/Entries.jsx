import { useEffect, useState } from "react";


const Entries = () => {
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(50)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [totalDoc, setTotalDoc] = useState()

    const [startDate, setStartDate] = useState(new Date('2022-04-01'))
    const [endDate, setEndDate] = useState(new Date('2022-08-24'))

    const [apiData, setApiData] = useState([])
    const [totalInstallApp, setTotalInstallApp] = useState(0)
    const [totalUninstallApp, setTotalUninstallApp] = useState(0)

   
    
    const getData = async() => {

        let res = await fetch(`https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${startDate}&todate=${endDate}&page=${page}&limit=${limit}`)

        let result = await res.json()
        setData(result.data.data)
        setTotalDoc(result.data.total_documents)
        setTotalPage(Math.ceil(totalDoc/limit))


        setApiData(result.data.data)

        let totalInstall  = 0
        let totalUninstall = 0
        data.map((item) => {
            totalInstall = totalInstall + item.ios_install + item.android_install
            totalUninstall += item.ios_uninstall + item.android_uninstall
            
        })

        setTotalUninstallApp(totalUninstall)
        setTotalInstallApp(totalInstall)
      
    }
    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    const handleStartDate = (date) => {
        if(date.target.value === ''){
            setStartDate(new Date('2022-04-01'))
        }
        setStartDate(date.target.value)
    }
    const handleEndDate = (date) => {
        if(date.target.value === ''){
            setEndDate(new Date('2022-08-24'))
        }
        setEndDate(date.target.value)
    }

    useEffect(() => {
        getData()
    }, [limit, page, endDate, startDate, totalDoc, totalUninstallApp, totalInstallApp])


  return (
      <div className="dashboard-content ">

<div className="dashboard-container">
        
            <div className="overall">

                <div className="row">

                    <div className="col-md-4 col-6 d-flex align-items-center dashboard-top-items">
                        <div className="icon-logo">
                        <i className="fa-sharp fa-solid fa-download"></i>
                        </div>
                        <div className="num">
                            <p>{totalInstallApp}</p>
                            <p>App Installed</p>
                        </div>
                    </div>
                    

                    <div className="col-md-4 col-6 d-flex align-items-center dashboard-top-items">
                        <div className="icon-logo">
                        <i className="fa-solid fa-eye"></i>
                        </div>
                        <div className="num">
                            <p>{totalInstallApp - totalUninstallApp}</p>
                            <p>Active Installed</p>
                        </div>
                    </div>

                    <div className="col-md-4 col-6 d-flex align-items-center dashboard-top-items">
                        <div className="icon-logo">
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                        </div>
                        <div className="num">
                            <p>{Math.floor((totalUninstallApp/totalInstallApp) * 100)}%</p>
                            <p>Churn Rate</p>
                        </div>
                    </div>

                    <div className="col-md-4 col-6 d-flex align-items-center dashboard-top-items">
                        <div className="icon-logo">
                        <i className="fa-solid fa-trash-can"></i>
                        </div>
                        <div className="num">
                            <p>{totalUninstallApp}</p>
                            <p>App Un-Installed</p>
                        </div>
                    </div>

                    <div className="col-md-4 col-6 d-flex align-items-center dashboard-top-items">
                        <div className="icon-logo">
                        <i className="fa-solid fa-square-check"></i>
                        </div>
                        <div className="num">
                            <p>{totalUninstallApp - (totalInstallApp - totalUninstallApp)}</p>
                            <p>Alive App-Users</p>
                        </div>
                    </div>

                    <div className="col-md-4 col-6 d-flex align-items-center dashboard-top-items">
                        <div className="icon-logo">
                        <i className="fa-solid fa-arrows-rotate"></i>
                        </div>
                        <div className="num">
                            <p>{Math.floor(totalUninstallApp - (totalUninstallApp - (totalInstallApp - totalUninstallApp)/100))  }%</p>
                            <p>Alive Churn Rate</p>
                        </div>
                    </div>

                </div>




            </div>
        

        <div className="overall">
            <div className="entries-container">
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <p className="show">Show 
                        <select onChange={(e) => setLimit(e.target.value)}>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                        </select> 
                        Entries
                    </p>

                    <div className="date-filter">
                        <div>
                            Start : <input min='2022-04-01' max='2022-08-24' type="date" className="input" onChange={(e) => handleStartDate(e) }/>
                        </div>
                        <div style={{marginLeft:'10px'}}>
                            End : <input max='2022-08-24' min='2022-04-01' type="date" className="input" onChange={(e) => handleEndDate(e) }/>
                        </div>
                    </div>

                </div>

                <table className="table mt-2">
                    <thead className="table-dark" >
                        <tr>
                            <td>Date</td>
                            <td>Day Installs</td>
                            <td>Plateform</td>
                            <td>Day Uninstalls</td>
                            <td>Plateform</td>
                            <td>Churn Rate</td>
                            <td>Churn Plateform</td>
                        </tr>
                    </thead>

                    <tbody>
                    
                        {
                            data.length > 0 
                            ? 
                            data.map((items, i)=> (

                            <tr key={i}>
                            <td>{items.created_At.split('T')[0].split('-').join('/')}</td>
                            <td>{items.totalinstall}</td>
                            <td className="plateform">
                                <span>
                                <i className="bi bi-android2"></i> {items.android_install}
                                </span>
                                <span>
                                <i className="bi bi-apple"></i> {items.ios_install}
                                </span>
                            </td>
                            <td>{items.totaluninstall}</td>
                            <td className="plateform">
                                <span>
                                <i className="bi bi-android2"></i> {items.android_uninstall} 
                                </span>
                                <span>
                                <i className="bi bi-apple"></i> {items.ios_uninstall}
                                </span>
                            </td>
                            <td>{Math.floor(items.totalchurn)}%</td>
                            <td className="plateform">
                                <span>
                                <i className="bi bi-android2"></i> {Math.floor(items.android_churn)}%
                                </span>
                                <span>
                                <i className="bi bi-apple"></i> {Math.floor(items.ios_churn)}%
                                </span>
                            </td>
                        </tr>
                                )  )
                            
                            : 
                            (<>
                            <tr><td className="text-center">No Records Found</td></tr>
                            </>)
                        }


                        

                        
                    </tbody>
                </table>
            </div>
            
            <div className="pagination">
                {
                    Array.from({length:totalPage}, (_, i) => {
                        return (
                            <button key={i} onClick={() => handlePageChange(i+1)} className={page === i+1 ? "active" : ''}>{i+1}</button>
                        )
                    })
                }
            </div>

        </div>
      </div>
    </div>

  );
};
export default Entries;
