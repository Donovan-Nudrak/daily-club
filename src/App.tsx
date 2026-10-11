import { useEffect, useState } from 'react'
import { CartProvider } from './cart/CartProvider.tsx'
import CartPanel from './components/CartPanel.tsx'
import Header from './components/Header.tsx'
import ProductDialog from './components/ProductDialog.tsx'
import { products } from './data/products.ts'
import { LocaleProvider } from './i18n/LocaleProvider.tsx'
import Club from './sections/Club.tsx'
import Collection from './sections/Collection.tsx'
import Footer from './sections/Footer.tsx'
import Hero from './sections/Hero.tsx'
import Looks from './sections/Looks.tsx'

function Page() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const selectedProduct = products.find((product) => product.id === selectedId) ?? null

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    document.getElementById(id)?.scrollIntoView()
  }, [])

  function openProduct(id: string) {
    setCartOpen(false)
    setSelectedId(id)
  }

  function openCart() {
    setSelectedId(null)
    setCartOpen(true)
  }

  return (
    <div id="top">
      <Header onOpenCart={openCart} />
      <main>
        <Hero />
        <Collection onOpenProduct={openProduct} />
        <Looks onOpenProduct={openProduct} />
        <Club />
      </main>
      <Footer />
      <ProductDialog product={selectedProduct} onClose={() => setSelectedId(null)} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <LocaleProvider>
      <CartProvider>
        <Page />
      </CartProvider>
    </LocaleProvider>
  )
}

export default App
