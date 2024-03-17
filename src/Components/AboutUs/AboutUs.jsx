'use client'

import { ReactElement } from 'react'
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react'
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc'



const Feature = ({ title, text, icon }) => {
  return (
    <Stack d={"flex"} align={'center'}
    justify={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  )
}

export default function SimpleThreeColumns() {
  return (
    <Box p={4}
    ml={{ sm: 0, md: "250px" }} mb={{sm: "10px", md: "20px"}}
    >
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
         <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
           <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
         <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
         <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
         <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
          <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
         <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Ahmed Ali'}
          text={
            'FrontEnd Develper'
          }
        />
      </SimpleGrid>
    </Box>
  )
}