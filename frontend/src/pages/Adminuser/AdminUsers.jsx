import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { ImCross } from 'react-icons/im'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import axios from 'axios'
import { baseUrl } from '../../config/BaseUrl'
import { useSnackbar } from 'notistack'
function AdminUsers() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users,setUsers]=useState([])
  useEffect(()=>{
      getUser()
  },[])
  const getUser=async()=>{
    axios.get(`${baseUrl}/admin/users`).then((response)=>{
      setUsers(response.data)
    })
  }
  const handleDelete=async(id)=>{
   
   try {
    axios.delete(`${baseUrl}/admin/users/${id}`).then(()=>{
      enqueueSnackbar("deleted successfully", {
        variant: "success",
      });
      getUser();
      handleClose();
    })
   } catch (error) {
    conlsole.log(error)
   }
  }
  const data=users.filter((val)=>val.isAdmin===false)
  return (
    <div className='adminuser-section'>
        <h1>Users</h1>
       <Table responsive="md" striped bordered hover variant="dark">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Username </th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Goal</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((val,index)=>(
                <>
                <tr className="text-center" key={val._id}>
              <td>{index+1}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.number}</td>
              <td>{val.goals}</td>
              <td>{val.weight}</td>
              <td>{val.height}</td>
              
              <td className="text-center">
                <ImCross className="fs-5 delete-user" onClick={handleShow} />
              </td>
            </tr>
            <Modal show={show} onHide={handleClose} animation={false} >
        <Modal.Header closeButton closeVariant="white" className="text-bg-dark">
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-bg-dark">Are You Sure To Delete</Modal.Body>
        <Modal.Footer className="text-bg-dark">
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button variant="success" onClick={()=>handleDelete(val._id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
                </>
              ))
            }
          </tbody>
            
        </Table>
        
    </div>
  )
}

export default AdminUsers