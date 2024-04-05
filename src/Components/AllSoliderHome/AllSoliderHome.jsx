import React, { useEffect, useState } from 'react'
import {
    Box, Button, FormControl, HStack, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
   
  } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { deleteHomeData } from '../../API/home.services.js';

export default function AllSoliderHome() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    name: "",
  });
  const onClickDelete = (id) => {
    Swal.fire({
      title: "هل انت متاكد ؟",
      text: "سيتم حذف بيانات القوة",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف بيانات القوة.",
          icon: "success"
        });
        // navigate("/add_problem")
        deleteHomeData('http://localhost:3001/home',id);

      }
    });
  }

  const [department, setDepartment] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/home') 
      .then(response => response.json())
      .then(data => {
        setDepartment(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  const filteredData = department.filter((item) => {
    const nameMatch = item.departmentName.includes(filter.name);
      return (
        nameMatch
      );
   
  });
  return (
    <Box py={5}   ml={{ sm: 0, md: "240px" }}>
    <HStack>
            <FormControl>
              <Input
                placeholder="ابحث بالاسم"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
            </FormControl>
          
          </HStack>
    <TableContainer p={3} >
      <Table variant='striped' >
        <Thead>
          <Tr>
            <Th>رقم</Th>
            <Th>اسم القوة</Th>
          </Tr>
        </Thead>
        <Tbody>
               {
                filteredData?.map((item,index)=>(
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
