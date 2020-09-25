
export const schema = {
  title: 'ChatBot',
  description: 'Testando ChatBoot',
  type: 'object',
  properties: {
    chatName: {
      title: 'Titulo',
      description: 'nome do chatbot',
      type: 'string',
      default: "Chatbot"
    },
    avatarIcon: {
      title: 'Avatar',
      description: 'Avatar do bot',
      type: 'string',
      default: "-",
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    placeHolder: {
      title: 'Place Holder',
      description: 'Observação da caixa de texto do chat',
      type: 'string',
      default: "Escreva sua mensagem"
    },
  },
}

