import React from 'react'
import {
    Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
   
  } from '@chakra-ui/react'
import { dataloop, dataloopsf, degree, departments, governorates, qualifications, solideHome } from '../../assets/Constant/MenuData'
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
  return (
    <Box py={5}   ml={{ sm: 0, md: "240px" }}>
    <TableContainer p={3} >
      <Table variant='striped' >
        <Thead>
          <Tr>
            <Th>رقم</Th>
            <Th>اسم الصف </Th>
            <Th>رقم العسكري</Th>
            <Th>رقم القومي</Th>
            <Th>رقم التليفون</Th>
            <Th>المؤهل</Th>
            <Th>القوة الاساسية</Th>
            <Th>تاريخ التجنيد</Th>
            <Th>تاريخ الانضمام</Th>
            <Th> الدرجة</Th>
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
                  <Td>{degree.filter(qual => qual.id === parseInt(item.soliderhome))[0]?.name}</Td>
                  <Td>{governorates.filter(qual => parseInt(qual.id )=== parseInt(item.selectedGovernorate))[0]?.governorate_name_ar}</Td>
                  <Td>{item.selectedCity}</Td>
                  <Td>{item.address}</Td>
                  <Td>{departments.filter(qual => qual.id === parseInt(item.department))[0]?.name}</Td>
                </Tr>
          
                ))
               
               }
          
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
  )
}
