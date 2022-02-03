import React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import styles from './TableActions.module.css'

const TableActions = ({ options = {} }) => (
  <>
    {options.onDelete && (
      <Button
        large
        className={styles.Button}
        icon="trash"
        intent={Intent.DANGER}
        title="Remover"
        onClick={options.onDelete}
      />
    )}
    {options.onEdit && (
      <Button
        large
        className={styles.Button}
        icon="edit"
        intent={Intent.PRIMARY}
        title="Editar"
        onClick={options.onEdit}
      />
    )}
    {options.onRead && (
      <Button
        large
        className={styles.Button}
        icon="eye-open"
        intent={Intent.NONE}
        title="Visualizar"
        onClick={options.onRead}
      />
    )}
  </>
)

export default TableActions
