import { useLocation } from 'react-router-dom'
import Collection from './Collection'
import Product from './Product'

export default function RouterPage() {
  const location = useLocation()
  const path = location.pathname

  // Match /collections/:id
  const collectionMatch = path.match(/^\/collections\/(.+)$/)
  if (collectionMatch) {
    return <Collection categoryId={collectionMatch[1]} />
  }

  // Match /product/:id
  const productMatch = path.match(/^\/product\/(.+)$/)
  if (productMatch) {
    return <Product productId={productMatch[1]} />
  }

  return null
}
