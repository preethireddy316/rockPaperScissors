/* eslint-disable react/no-unknown-property */
const Item = props => {
  const {details, select} = props
  const {imageUrl, id} = details
  const selectId = () => {
    select(details)
  }
  return (
    <button
      data-testid={`${id.toLowerCase()}Button`}
      type="button"
      onClick={selectId}
    >
      <img src={imageUrl} alt={id} />
    </button>
  )
}

export default Item
