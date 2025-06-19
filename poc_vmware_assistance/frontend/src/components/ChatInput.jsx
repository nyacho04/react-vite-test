import { Input, IconButton, Flex, Text } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react'

const MAX_CHARS = 300

const ChatInput = ({ onSendMessage, isLoading, placeholder = "Escribe tu consulta...", showCounter = false, modernStyle = false, hideBox = false }) => {
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
    <form onSubmit={handleSubmit} style={hideBox ? { width: '100%' } : modernStyle ? { width: '100%' } : {}}>
      <Flex
        p={hideBox ? 0 : modernStyle ? 0 : 4}
        borderTop={hideBox ? 'none' : modernStyle ? 'none' : '1px'}
        borderColor={hideBox ? 'none' : modernStyle ? 'none' : 'gray.200'}
        direction="column"
        align="center"
        w="100%"
        bg={hideBox ? 'transparent' : undefined}
        boxShadow={hideBox ? 'none' : undefined}
      >
        <Flex w="100%" align="center" justify="center">
          <Input
            value={message}
            onChange={handleChange}
            placeholder={placeholder}
            size={hideBox ? 'lg' : modernStyle ? 'lg' : 'lg'}
            mr={2}
            isDisabled={isLoading}
            bg={hideBox ? 'transparent' : modernStyle ? 'white' : (document.body.classList.contains('chakra-ui-dark') ? '#2D3748' : 'white')}
            color={hideBox ? 'white' : modernStyle ? '#232328' : (document.body.classList.contains('chakra-ui-dark') ? 'white' : 'black')}
            borderRadius={hideBox ? 'none' : modernStyle ? 'md' : 'md'}
            fontSize={hideBox ? '1.5rem' : modernStyle ? '1.35rem' : '1rem'}
            fontWeight={hideBox ? 400 : modernStyle ? 500 : 400}
            px={hideBox ? 0 : modernStyle ? 6 : 4}
            py={hideBox ? 2 : modernStyle ? 7 : 2}
            border={hideBox ? 'none' : undefined}
            borderBottom={hideBox ? '2px solid #3a3a3a' : undefined}
            boxShadow={hideBox ? 'none' : modernStyle ? '0 2px 8px 0 rgba(0,0,0,0.10)' : 'none'}
            _placeholder={{ color: hideBox ? '#A0AEC0' : modernStyle ? '#6B7280' : (document.body.classList.contains('chakra-ui-dark') ? 'gray.300' : 'gray.500') }}
            _focus={hideBox ? { borderColor: '#2196f3', boxShadow: 'none' } : {
              borderColor: 'blue.500',
              boxShadow: modernStyle ? '0 0 0 2px #2196f3' : '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
            borderWidth={hideBox ? '0px' : modernStyle ? '0px' : '1px'}
          />
          <IconButton
            type="submit"
            colorScheme={hideBox ? undefined : modernStyle ? undefined : 'blue'}
            aria-label="Enviar mensaje"
            icon={<FaPaperPlane />}
            isLoading={isLoading}
            isDisabled={isLoading || !message.trim() || message.length > MAX_CHARS}
            bg={hideBox ? 'transparent' : modernStyle ? '#2948ff' : 'blue.500'}
            color={hideBox ? '#A0AEC0' : modernStyle ? 'white' : 'white'}
            _hover={hideBox ? { bg: 'transparent', color: '#2196f3' } : modernStyle ? { bg: '#1e2e7a' } : { bg: 'blue.600' }}
            _active={hideBox ? { bg: 'transparent', color: '#1565c0' } : modernStyle ? { bg: '#16204a' } : { bg: 'blue.700' }}
            borderRadius={hideBox ? 'full' : modernStyle ? 'md' : 'md'}
            size={hideBox ? 'lg' : modernStyle ? 'lg' : 'lg'}
            fontSize={hideBox ? '1.5rem' : modernStyle ? '1.5rem' : '1rem'}
            boxShadow={hideBox ? 'none' : modernStyle ? '0 2px 8px 0 rgba(0,0,0,0.10)' : 'none'}
            ml={hideBox ? 2 : modernStyle ? 2 : 0}
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