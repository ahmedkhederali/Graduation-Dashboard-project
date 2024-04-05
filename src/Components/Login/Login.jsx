'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import Swal from "sweetalert2";

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function ResetPasswordForm({setAdmin}) {
    const navigate = useNavigate();
    const [data, setDate] = useState({
        email: "",
        password: "",
      });
    const handleLogin =()=>{
        
         if(data.email === "shafai" && data.password === "123"){
            setAdmin(true)
            localStorage.setItem('admin',true)
            Swal.fire({
                title: "تم تسجيل الدخول بنجاح",
                text: "تم تسجيل الدخول بنجاح",
                icon: "success",
              }); 
              navigate("/");
         }else{
            Swal.fire({
                title: "خطا في الايميل او الباسورد",
                text: "خطا في الايميل او الباسورد",
                icon: "warning",
              });  
         }

    }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          قم بتسجيل الدخول
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>ادخل الايميل الخاص بك</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            autoComplete='off'
            onChange={(e) =>
                setDate({ ...data, email: e.target.value })
              }
            name='email'
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel> ادخل كلمة السر </FormLabel>
          <Input type="password"
            autoComplete='off'

          onChange={(e) =>
            setDate({ ...data, password: e.target.value })
          }
          name='password' />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleLogin}
            >
            تسجيل الدخول
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}