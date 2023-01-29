import { addUser, modifyUser } from '@/controllers/user';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

const user = {
  uid:"0",
  username:"a",
  picture:"flower.jpg",
  friends:[{a:"a"}],
  messages:[{a:"a"}],
  posts:[]
}
