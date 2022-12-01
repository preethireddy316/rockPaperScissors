/* eslint-disable react/no-unknown-property */
import {Button, ListItem} from './styledComponents'

const Item = props => {
  const {details, select} = props
  const {imageUrl, id} = details
  const selectId = () => {
    select(details)
  }
  console.log(`${id.toLowerCase()}Button`)
  return (
    <ListItem>
      <Button
        type="button"
        data-testid={`${id.toLowerCase()}Button`}
        onClick={selectId}
      >
        <img src={imageUrl} alt={id} />
      </Button>
    </ListItem>
  )
}

export default Item
