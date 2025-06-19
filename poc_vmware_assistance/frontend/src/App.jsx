import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  useToast,
  Flex,
  Text,
  Spinner,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { FaMoon, FaSun, FaRedo } from 'react-icons/fa'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import axios from 'axios'

function App() {
  const [messages, setMessages] = useState([
    {
      text: 'Hola, soy tu asistente virtual. ¿En qué puedo ayudarte?',
      isUser: false,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const [chatOpen, setChatOpen] = useState(false)
  const [firstMessage, setFirstMessage] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message) => {
    if (!message.trim()) return

    if (!chatOpen) {
      setFirstMessage(message)
      setChatOpen(true)
      setMessages([
        {
          text: '¡Hola! Consulta aquí cualquier duda sobre tu infraestructura VMware.',
          isUser: false,
        },
        { text: message, isUser: true },
      ])
      return
    }

    setMessages((prev) => [...prev, { text: message, isUser: true }])
    setIsLoading(true)

    try {
      // reemplazar la url con el endpoint de fastapi
      const response = await axios.post('http://localhost:8000/api/v1/prompt/', {
        message,
      })

      setMessages((prev) => [
        ...prev,
        { text: response.data.response, isUser: false, name: 'VMware Assistance' },
      ])
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'No se pudo obtener respuesta del servidor',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetChat = () => {
    setMessages([
      {
        text: '¡Hola! Consulta aquí cualquier duda sobre tu infraestructura VMware.',
        isUser: false,
      },
    ])
    setChatOpen(false)
    setFirstMessage("")
  }

  return (
    <Box minH="100vh" minW="100vw" bg="#18181A" display="flex" flexDirection="column" alignItems="center" justifyContent="center" position="relative">
      <Box mt={16} mb={2} textAlign="center">
        <Heading size="2xl" color="blue.300" letterSpacing="tight">
          VMware Assistance
        </Heading>
        <Text color="gray.400" fontSize="xl" mt={4}>
          Diagnóstico inteligente de infraestructura virtual
        </Text>
      </Box>
      {chatOpen && (
        <Box position="absolute" top={16} right={24} zIndex={10}>
          <IconButton
            icon={<FaRedo />}
            onClick={handleResetChat}
            aria-label="Reiniciar chat"
            colorScheme="blue"
            variant="solid"
            borderRadius="full"
            size="lg"
            bg="#2196f3"
            _hover={{ bg: '#1976d2' }}
            _active={{ bg: '#1565c0' }}
            color="white"
            boxShadow="0 2px 8px 0 rgba(0,0,0,0.10)"
          />
        </Box>
      )}
      <VStack w="100%" maxW="container.xl" spacing={4}>
        {!chatOpen && (
          <Box
            w="100%"
            maxW="420px"
            mx="auto"
            bg="transparent"
            boxShadow="none"
            borderRadius="none"
            p={0}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="unset"
          >
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} placeholder="Escribe tu consulta..." showCounter={false} modernStyle={true} hideBox={true} inputBg="#232328" />
          </Box>
        )}
        {chatOpen && (
          <Flex w="100%" justify="center">
            <Box
              w={{ base: '100%', sm: '80%', md: '48%' }}
              bg="#232328"
              borderRadius="2xl"
              boxShadow="0 12px 48px 0 rgba(0,0,0,0.30)"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              minH="600px"
              maxH="80vh"
              position="relative"
            >
              <Box
                flex={1}
                overflowY="auto"
                p={8}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#232328',
                    borderRadius: '24px',
                  },
                }}
              >
                <VStack spacing={4} align="stretch">
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      message={msg.text}
                      isUser={msg.isUser}
                    />
                  ))}
                  {isLoading && (
                    <Flex justify="center" my={4}>
                      <Spinner color="blue.300" />
                    </Flex>
                  )}
                  <div ref={messagesEndRef} />
                </VStack>
              </Box>
              <Box p={6} bg="#232328">
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
              </Box>
            </Box>
          </Flex>
        )}
      </VStack>
    </Box>
  )
}

export default App
