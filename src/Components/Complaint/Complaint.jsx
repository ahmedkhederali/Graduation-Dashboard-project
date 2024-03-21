import React from 'react'
import {
    Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
   
  } from '@chakra-ui/react'
import { departments } from '../../assets/Constant/MenuData'

export default function Complaint() {
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
                departments?.map((item,index)=>(
                  <Tr>
                  <Td>{index+1}</Td>
                  <Td>{item.name}</Td>
                 
                </Tr>
          
                ))
               
               }
          
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
  )
}
