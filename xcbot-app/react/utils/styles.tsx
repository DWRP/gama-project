export const ChatBot = {
  background: '#F5F8FB',
  position: 'fixed',
  bottom: 5,
  right: 15,
  width: '350px',
  height: '450px',
  zIndex: 99,
  border: '1px solid #ccc'
} as React.CSSProperties;

export const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    userBubble: {
      background: '#0B305A'
    },
    chatbubble: {
      background: '#0B7E5B',
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: '13px'
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    height: '10%',
    padding: 5,
  },
  messagesContainer: {
    width: '100%',
    height: '90%',
  } as React.CSSProperties,

  input: {
    fontSize: 16,
    padding: 10,
    height: '30px',
    outline: 'none',
    width: '90%',
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}