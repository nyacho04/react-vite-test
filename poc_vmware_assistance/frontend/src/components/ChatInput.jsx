import { Input, IconButton, Flex, Text } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react'

const MAX_CHARS = 300

const ChatInput = ({ onSendMessage, isLoading, placeholder = "Escribe tu consulta...", showCounter = false, modernStyle = false }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading && message.length <= MAX_CHARS) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleChange = (e) => {
    const newMessage = e.target.value
    if (newMessage.length <= MAX_CHARS) {
      setMessage(newMessage)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={modernStyle ? { width: '100%' } : {}}>
      <Flex
        p={modernStyle ? 0 : 4}
        borderTop={modernStyle ? 'none' : '1px'}
        borderColor={modernStyle ? 'none' : 'gray.200'}
        direction="column"
        align="center"
        w="100%"
      >
        <Flex w="100%" align="center" justify="center">
          <Input
            value={message}
            onChange={handleChange}
            placeholder={placeholder}
            size={modernStyle ? 'lg' : 'lg'}
            mr={2}
            isDisabled={isLoading}
            bg={modernStyle ? 'white' : (document.body.classList.contains('chakra-ui-dark') ? '#2D3748' : 'white')}
            color={modernStyle ? '#232328' : (document.body.classList.contains('chakra-ui-dark') ? 'white' : 'black')}
            borderRadius={modernStyle ? 'md' : 'md'}
            fontSize={modernStyle ? '1.35rem' : '1rem'}
            fontWeight={modernStyle ? 500 : 400}
            px={modernStyle ? 6 : 4}
            py={modernStyle ? 7 : 2}
            _placeholder={{ color: modernStyle ? '#6B7280' : (document.body.classList.contains('chakra-ui-dark') ? 'gray.300' : 'gray.500') }}
            _focus={{
              borderColor: 'blue.500',
              boxShadow: modernStyle ? '0 0 0 2px #2196f3' : '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
            borderWidth={modernStyle ? '0px' : '1px'}
            boxShadow={modernStyle ? '0 2px 8px 0 rgba(0,0,0,0.10)' : 'none'}
          />
          <IconButton
            type="submit"
            colorScheme={modernStyle ? undefined : 'blue'}
            aria-label="Enviar mensaje"
            icon={<FaPaperPlane />}
            isLoading={isLoading}
            isDisabled={isLoading || !message.trim() || message.length > MAX_CHARS}
            bg={modernStyle ? '#2948ff' : 'blue.500'}
            color={modernStyle ? 'white' : 'white'}
            _hover={modernStyle ? { bg: '#1e2e7a' } : { bg: 'blue.600' }}
            _active={modernStyle ? { bg: '#16204a' } : { bg: 'blue.700' }}
            borderRadius={modernStyle ? 'md' : 'md'}
            size={modernStyle ? 'lg' : 'lg'}
            fontSize={modernStyle ? '1.5rem' : '1rem'}
            boxShadow={modernStyle ? '0 2px 8px 0 rgba(0,0,0,0.10)' : 'none'}
            ml={modernStyle ? 2 : 0}
          />
        </Flex>
        {showCounter && (
          <Text
            fontSize={modernStyle ? 'md' : 'sm'}
            color={message.length > MAX_CHARS ? 'red.500' : 'gray.500'}
            mt={modernStyle ? 2 : 1}
            textAlign="right"
            w="100%"
            pr={modernStyle ? 2 : 0}
          >
            {message.length}/{MAX_CHARS}
          </Text>
        )}
      </Flex>
    </form>
  )
}

export default ChatInput 