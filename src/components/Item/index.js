const Item = props => {
  const {details, select} = props
  const {imageUrl} = details
  const selectId = () => {
    select(details)
  }
  return (
    <li>
      <button type="button" onClick={selectId}>
        <img src={imageUrl} alt="image1" />
      </button>
    </li>
  )
}

export default Item
