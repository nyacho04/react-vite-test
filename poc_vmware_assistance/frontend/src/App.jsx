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
  const [messages, setMessages] = useState([])
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
    <Box minH="100vh" minW="100vw" bg="#18181A" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" position="relative">
      <Box w="100%" px={12} pt={8} pb={2} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Heading size="2xl" color="blue.300" letterSpacing="tight">
            VMware Assistance
          </Heading>
          <Text color="gray.400" fontSize="xl" mt={2}>
            Diagnóstico inteligente de infraestructura virtual
          </Text>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
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
            mt={-2}
          />
          <IconButton
            icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
            onClick={toggleColorMode}
            aria-label="Cambiar tema"
            colorScheme="blue"
            variant="solid"
            borderRadius="full"
            size="lg"
            bg="#2196f3"
            _hover={{ bg: '#1976d2' }}
            _active={{ bg: '#1565c0' }}
            color="white"
            mt={-2}
          />
        </Box>
      </Box>
      <VStack w="100%" maxW="container.xl" spacing={4} flex={1} justifyContent="center">
        {!chatOpen && (
          <Box
            w="100%"
            maxW="800px"
            mx="auto"
            mt={8}
            display="flex"
            alignItems="center"
            bg="#232328"
            borderRadius="xl"
            p={2}
            boxShadow="none"
          >
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} placeholder="Escribe tu consulta..." showCounter={false} modernStyle={true} hideBox={true} inputBg="transparent" fullWidthInput={true} />
          </Box>
        )}
        {chatOpen && (
          <Box w="100%" maxW="800px" mx="auto" mt={8}>
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
            <Box
              w="100%"
              maxW="800px"
              mx="auto"
              mt={8}
              display="flex"
              alignItems="center"
              bg="#232328"
              borderRadius="xl"
              p={2}
              boxShadow="none"
            >
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} placeholder="Escribe tu consulta..." showCounter={false} modernStyle={true} hideBox={true} inputBg="transparent" fullWidthInput={true} />
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default App
