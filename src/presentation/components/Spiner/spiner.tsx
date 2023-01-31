import React from 'react'
import Styles from './spiner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spiner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={[Styles.spiner, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spiner
