// import Dashboard from "./Dashboard"
import Entries from "./Entries"

const Sidenav = () => {
  return (
    <div className="d-flex">
      
        <div className="sidenav" style={{margin:"20px 0 20px"}}>
          
            <div className="logo">
                <p style={{textAlign:"center"}}><span>WOW.</span>TALENT</p>
                <hr />
            </div>
            <ul style={{padding:'0'}}>
                <li style={{textAlign:"center", minWidth:'150px', width:'150px'}} > DASHBOARD</li>
            </ul>
        </div>

        
        <Entries/>
       

    </div>
  )
}
export default Sidenav