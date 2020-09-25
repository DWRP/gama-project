
export interface ChatProps {
  chatName: string
  avatarIcon: string
  placeHolder: string
}
export interface CardProps {
  id: number
  title: string
  subTitle: string
  imageUrl: string
  price: number | string
  attachmentLinkUrl: string
}
export interface OrderProps {
  orderId: string
  statusDescription: string
  erro: string
}