'use strict'

const db = require('../server/db')
const {User, Product, Option, Order, LineItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      firstName: 'Bilbo',
      lastName: 'Baggins',
      email: 'bilbo@theshire.org',
      password: 'passwordlol'
    },
    {
      firstName: 'Olivia',
      lastName: 'Sztanga',
      email: 'oliviasztanga@gmail.com',
      password: 'passwordlol'
    },
    {
      firstName: 'Cole',
      lastName: 'Sztanga',
      email: 'idkimacat@meow.com',
      password: 'passwordlol'
    }
  ]

  const products = [
    {
      id: 1,
      name: 'blush',
      description: 'An easy-to-use, buildable powder blush.',
      category: 'face'
    },
    {
      id: 2,
      name: 'browtint',
      description:
        'An instant brow groomer: fluffs and shapes brows while thickening and grooming them into place.',
      category: 'lashes & brows'
    },
    {
      id: 3,
      name: 'concealer',
      description:
        'A buildable formula that covers everything from dark circles to blemishes with a dewy, glowy finish.',
      category: 'face'
    },
    {
      id: 4,
      name: 'eyeshadow',
      description: 'Easy-to-use, easy-to-wear, matte eyeshadow.',
      category: 'eyes'
    },
    {
      id: 5,
      name: 'lipgloss',
      description:
        'The glossiest gloss. Never gluey, never sticky. Just glassy shine.',
      category: 'lips'
    },
    {
      id: 6,
      name: 'lipstick',
      description:
        'A sheer lip color that gives the look of a just-blotted lip.',
      category: 'lips'
    },
    {
      id: 7,
      name: 'mascara',
      description:
        'The perfect everyday mascara for lengthening and defining natural lashes.',
      category: 'lashes & brows'
    },
    {
      id: 8,
      name: 'powder',
      description:
        'A face powder that cuts shine, blurs the appearance of pores, and sets makeup.',
      category: 'face'
    }
  ]

  const options = [
    {
      id: 1,
      color: 'baby',
      photos: ['blush-baby.jpg'],
      price: 30.0,
      stock: 100,
      productId: 1
    },
    {
      id: 2,
      color: 'bubblegum',
      photos: ['blush-bubblegum.jpg'],
      price: 30.0,
      stock: 100,
      productId: 1
    },
    {
      id: 3,
      color: 'rose',
      photos: ['blush-rose.jpg'],
      price: 30.0,
      stock: 100,
      productId: 1
    },
    {
      id: 4,
      color: 'clear',
      photos: ['browtint-clear.jpg'],
      price: 15.0,
      stock: 100,
      productId: 2
    },
    {
      id: 5,
      color: 'light',
      photos: ['browtint-light.jpg'],
      price: 15.0,
      stock: 100,
      productId: 2
    },
    {
      id: 6,
      color: 'dark',
      photos: ['browtint-dark.jpg'],
      price: 15.0,
      stock: 100,
      productId: 2
    },
    {
      id: 7,
      color: 'beige',
      photos: ['concealer-beige.jpg'],
      price: 23.0,
      stock: 100,
      productId: 3
    },
    {
      id: 8,
      color: 'deep beige',
      photos: ['concealer-deepbeige.jpg'],
      price: 23.0,
      stock: 100,
      productId: 3
    },
    {
      id: 9,
      color: 'light',
      photos: ['concealer-light.jpg'],
      price: 23.0,
      stock: 100,
      productId: 3
    },
    {
      id: 10,
      color: 'mahogany',
      photos: ['concealer-mahogany.jpg'],
      price: 23.0,
      stock: 100,
      productId: 3
    },
    {
      id: 11,
      color: 'warm mahogany',
      photos: ['concealer-warmmahogany.jpg'],
      price: 23.0,
      stock: 100,
      productId: 3
    },
    {
      id: 12,
      color: 'barbie',
      photos: ['eyeshadow-barbie.jpg'],
      price: 27.5,
      stock: 100,
      productId: 4
    },
    {
      id: 13,
      color: 'champagne',
      photos: ['eyeshadow-champagne.jpg'],
      price: 27.5,
      stock: 100,
      productId: 4
    },
    {
      id: 14,
      color: 'plum',
      photos: ['eyeshadow-plum.jpg'],
      price: 27.5,
      stock: 100,
      productId: 4
    },
    {
      id: 15,
      color: 'sea deep',
      photos: ['eyeshadow-seadeep.jpg'],
      price: 27.5,
      stock: 100,
      productId: 4
    },
    {
      id: 16,
      color: 'seafoam',
      photos: ['eyeshadow-seafoam.jpg'],
      price: 27.5,
      stock: 100,
      productId: 4
    },
    {
      id: 17,
      color: 'clear',
      photos: ['lipgloss-clear.jpg'],
      price: 15.5,
      stock: 100,
      productId: 5
    },
    {
      id: 18,
      color: 'glitter',
      photos: ['lipgloss-glitter.jpg'],
      price: 15.5,
      stock: 100,
      productId: 5
    },
    {
      id: 19,
      color: 'coral',
      photos: ['lipstick-coral.jpg'],
      price: 20.0,
      stock: 100,
      productId: 6
    },
    {
      id: 20,
      color: 'deeper',
      photos: ['lipstick-deeper.jpg'],
      price: 20.0,
      stock: 100,
      productId: 6
    },
    {
      id: 21,
      color: 'fatale',
      photos: ['lipstick-fatale.jpg'],
      price: 20.0,
      stock: 100,
      productId: 6
    },
    {
      id: 22,
      color: 'nude',
      photos: ['lipstick-nude.jpg'],
      price: 20.0,
      stock: 100,
      productId: 6
    },
    {
      id: 23,
      color: 'rouge',
      photos: ['lipstick-rouge.jpg'],
      price: 20.0,
      stock: 100,
      productId: 6
    },
    {
      id: 24,
      color: 'black',
      photos: ['mascara.jpg'],
      price: 17.5,
      stock: 100,
      productId: 7
    },
    {
      id: 25,
      color: 'porcelain',
      photos: ['powder-porcelain.jpg'],
      price: 30.0,
      stock: 100,
      productId: 8
    },
    {
      id: 26,
      color: 'medium',
      photos: ['powder-medium.jpg'],
      price: 30.0,
      stock: 100,
      productId: 8
    },
    {
      id: 27,
      color: 'dark',
      photos: ['powder-dark.jpg'],
      price: 30.0,
      stock: 100,
      productId: 8
    }
  ]

  const orders = [
    {
      status: 'started',
      recipientFirstName: 'Bilbo',
      recipientLastName: 'Baggins',
      recipientAddress: '123 Main Street, New York, NY 10001',
      userId: 1
    },
    {
      status: 'started',
      recipientFirstName: 'Olivia',
      recipientLastName: 'Sztanga',
      recipientAddress: '123 Main Street, New York, NY 10001',
      userId: 2
    },
    {
      status: 'started',
      recipientFirstName: 'Olivia',
      recipientLastName: 'Sztanga',
      recipientAddress: '123 Main Street, New York, NY 10001',
      userId: 2
    }
  ]

  const lineitems = [
    {
      quantity: 2,
      optionId: 5,
      orderId: 1
    },
    {
      quantity: 1,
      optionId: 23,
      orderId: 1
    },
    {
      quantity: 2,
      optionId: 6,
      orderId: 2
    },
    {
      quantity: 1,
      optionId: 21,
      orderId: 2
    },
    {
      quantity: 2,
      optionId: 3,
      orderId: 3
    },
    {
      quantity: 1,
      optionId: 5,
      orderId: 3
    }
  ]

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  await Promise.all(
    options.map(option => {
      return Option.create(option)
    })
  )

  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  await Promise.all(
    lineitems.map(lineitem => {
      return LineItem.create(lineitem)
    })
  )

  const orderToCheckout = await Order.findByPk(3)
  await orderToCheckout.checkout()

  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}
