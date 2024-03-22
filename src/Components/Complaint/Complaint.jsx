import React, { useEffect, useState } from 'react'
import {
    Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
   
  } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { deleteDepatmentData } from '../../API/depatment.services';

export default function Complaint() {
  const navigate = useNavigate();

  const onClickDelete = (id) => {
    Swal.fire({
      title: "هل انت متاكد ؟",
      text: "سيتم حذف بيانات القسم",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف بيانات القسم.",
          icon: "success"
        });
        // navigate("/add_problem")
        deleteDepatmentData('http://localhost:3001/department',id);

      }
    });
  }

  const [department, setDepartment] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/department') 
      .then(response => response.json())
      .then(data => {
        setDepartment(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <Box py={5}   ml={{ sm: 0, md: "240px" }}>
    <TableContainer p={3} >
      <Table variant='striped' >
        <Thead>
          <Tr>
            <Th>رقم</Th>
            <Th>اسم القسم </Th>
          </Tr>
        </Thead>
        <Tbody>
               {
                department?.map((item,index)=>(
                  <Tr>
                  <Td>{index+1}</Td>
                  <Td>{item.departmentName}</Td>
                  <Td>
                        <Button onClick={() => onClickDelete(item.id)} bg='whitesmoke' color='facebook.500'><DeleteIcon /></Button>
                      </Td>
                </Tr>
          
                ))
               
               }
          
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
  )
}
