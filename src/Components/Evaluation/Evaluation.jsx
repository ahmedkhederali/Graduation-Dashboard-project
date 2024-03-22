import React, { useState } from 'react'
import {
    Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
   
  } from '@chakra-ui/react'
  import Swal from 'sweetalert2'

import {  dataloopsf, degree, departments, governorates, qualifications, solideHome } from '../../assets/Constant/MenuData'
import UserChallenge from '../User Challenge/UserChallenge';
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

function convertToArabicDigits(number) {
  const digitsMap = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩'
  };

  return String(number).replace(/[0-9]/g, digit => digitsMap[digit]);
}
export default function Evaluation() {
  const [editable,setEditable]=useState(null)
  const navigate = useNavigate();

  const onClickEdit = (item) => {
    setEditable(item)
    
  };
  
  const onClickDelete = (id) => {
    Swal.fire({
      title: "هل انت متاكد ؟",
      text: "سيتم حذف بيانات الصف",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف بيانات الصف.",
          icon: "success"
        });
        navigate("/user_chanllenge")
      }
    });
  }
  return (
    <Box py={5}   ml={{ sm: 0, md: "240px" }}>
     {
      editable ? <><UserChallenge mar={true} data={editable} /></>:<TableContainer p={3} >
      <Table variant='striped' >
        <Thead>
          <Tr>
            <Th>رقم</Th>
            <Th>اسم العسكري</Th>
            <Th>رقم العسكري</Th>
            <Th>رقم القومي</Th>
            <Th>رقم التليفون</Th>
            <Th>المؤهل</Th>
            <Th>القوة الاساسية</Th>
            <Th>تاريخ التجنيد</Th>
            <Th>تاريخ الانضمام</Th>
            <Th>الدرجة</Th>
            <Th>المحافظة</Th>
            <Th>المدينة/القرية</Th>
            <Th>العنوان الداخلي</Th>
            <Th>القسم التابع له</Th>
          </Tr>
        </Thead>
        <Tbody>
               {
                dataloopsf?.map((item,index)=>(
                  <Tr>
                  <Td>{index+1}</Td>
                  <Td>{convertToArabicDigits(item.solidername)}</Td>
                  <Td>{convertToArabicDigits(item.soliderrkm)}</Td>
                  <Td>{convertToArabicDigits(item.soliderSSn)}</Td>
                  <Td>{convertToArabicDigits(item.phonenumber)}</Td>
                  <Td>{qualifications.filter(qual => qual.id === parseInt(item.qualification))[0]?.name}</Td>
                  <Td>{solideHome.filter(qual => qual.id === parseInt(item.soliderhome))[0]?.name}</Td>
                  <Td>{convertToArabicDigits(item.solidertagneed)}</Td>
                  <Td>{convertToArabicDigits(item.soliderendmam)}</Td>
                  <Td>{item.degree}</Td>
                  <Td>{governorates.filter(qual => parseInt(qual.id )=== parseInt(item.selectedGovernorate))[0]?.governorate_name_ar}</Td>
                  <Td>{item.selectedCity}</Td>
                  <Td>{item.address}</Td>
                  <Td>{departments.filter(qual => qual.id === parseInt(item.department))[0]?.name}</Td>
                  <Td>
                        <Button onClick={() => onClickEdit(item)} colorScheme='facebook' m={2}><EditIcon /></Button>
                        <Button onClick={() => onClickDelete(item)} bg='whitesmoke' color='facebook.500'><DeleteIcon /></Button>
                      </Td>
                </Tr>
          
                ))
               
               }
          
        </Tbody>
      </Table>
    </TableContainer>
    }
  </Box>
  )
}
