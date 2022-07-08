import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { db, objectId } from './db/mongo.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.post('/add', async (req, res) => {
  const games = [
    {
      name: 'The Witcher 3-Wild-Hunt 2',
      url: 'https://i.ibb.co/3h2KbDw/The-Witcher-3-Wild-Hunt-2.png',
      price: 96.8
    },
    {
      name: 'The Witcher Enhanced Edition 1',
      url: 'https://i.ibb.co/4tr2Gcp/The-Witcher-Enhanced-Edition-1.png',
      price: 93.7
    },
    {
      name: 'Watch Dogs',
      url: 'https://i.ibb.co/BBYX1ZX/Watch-Dogs.png',
      price: 97.5
    },
    {
      name: 'Grand Theft Auto-V',
      url: 'https://i.ibb.co/Nt5Sw97/Grand-Theft-Auto-V.png',
      price: 88.3
    },
    {
      name: 'World War Z',
      url: 'https://i.ibb.co/TPhhNM8/World-War-Z.png',
      price: 85.3
    },
    {
      name: 'FIFA 21',
      url: 'https://i.ibb.co/Nxb2Ss0/FIFA-21.png',
      price: 120.9
    },
    {
      name: 'Dark Souls Remastered',
      url: 'https://i.ibb.co/zFzGrL2/Dark-Souls-Remastered.png',
      price: 89.3
    },
    {
      name: 'Dark Souls II',
      url: 'https://i.ibb.co/jT79KLp/Dark-Souls-II.png',
      price: 85.6
    },
    {
      name: 'Dark Souls III',
      url: 'https://i.ibb.co/pzzn3Xc/Dark-Souls-III-2.png',
      price: 85.9
    },
    {
      name: 'Far Cry 3',
      url: 'https://i.ibb.co/7G1GRwj/Far-Cry-3.png',
      price: 99.6
    },
    {
      name: 'Batman Arkham Knight',
      url: 'https://i.ibb.co/Ytrw90K/Batman-Arkham-Knight.png',
      price: 92.9
    },
    {
      name: 'Cuphead',
      url: 'https://i.ibb.co/tLb3BR5/Cuphead.png',
      price: 77.5
    },
    {
      name: "Assassin's Creed Valhalla",
      url: 'https://i.ibb.co/StMwjB7/Assassin-s-Creed-Valhalla.png',
      price: 85.3
    },
    {
      name: "Assassin's Creed Origins",
      url: 'https://i.ibb.co/jR8s5jD/Assassin-s-Creed-Origins.png',
      price: 84.9
    },
    {
      name: "Assassin's Creed Odyssey",
      url: 'https://i.ibb.co/bbgkDS6/Assassin-s-Creed-Odyssey.png',
      price: 82.9
    },
    {
      name: "Assassin's Creed IV-Black Flag",
      url: 'https://i.ibb.co/hCzXkxn/Assassin-s-Creed-IV-Black-Flag.png',
      price: 86.3
    },
    {
      name: "Assassin's Creed III Remastered",
      url: 'https://i.ibb.co/FV95JVx/Assassin-s-Creed-III-Remastered.png',
      price: 84.8
    },
    {
      name: "Assassin's Creed Brotherhood",
      url: 'https://i.ibb.co/gTP3rCr/Assassin-s-Creed-Brotherhood.png',
      price: 81.9
    },
    {
      name: "Assassin's Creed 2",
      url: 'https://i.ibb.co/WPmhVmt/Assassin-s-Creed-2.png',
      price: 82.9
    },
    {
      name: "Assassin's Creed 1",
      url: 'https://i.ibb.co/Ksg808k/Assassin-s-Creed-1.png',
      price: 87.7
    },
    {
      name: 'Among Us',
      url: 'https://i.ibb.co/HG7wwX4/Among-Us.png',
      price: 50.3
    }
  ]
  const toSend = []

  for (const game of games) {
    const id = objectId()

    toSend.push({ ...game, id })
  }
  console.log(toSend)
  res.send('OK')
})

app.use(authRoutes)
app.use(userRoutes)

app.listen(process.env.PORT)
