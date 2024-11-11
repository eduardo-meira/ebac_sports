import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Produto as ProdutoType } from '../../App'
import * as S from './styles'

import { adicionar } from '../../store/reducers/carrinho'
import { adicionarfav, removerfav } from '../../store/reducers/favorito'

type Props = {
  produto: ProdutoType
  estaNosFavoritos: boolean
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto, estaNosFavoritos }: Props) => {
  const dispatch = useDispatch()
  const [isFavorited, setIsFavorited] = useState(estaNosFavoritos)

  useEffect(() => {
    setIsFavorited(estaNosFavoritos)
  }, [estaNosFavoritos])

  const toggleFavorito = () => {
    if (isFavorited) {
      dispatch(adicionarfav(produto))
    } else {
      dispatch(removerfav(produto))
    }
    setIsFavorited(!isFavorited)
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={toggleFavorito} type="button">
        {isFavorited ? '+ Adicionar aos favoritos' : '- Remover dos favoritos '}
      </S.BtnComprar>
      <S.BtnComprar onClick={() => dispatch(adicionar(produto))} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
