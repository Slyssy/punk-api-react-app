function BuildList(props) {
  return (
    <ul className='unordered-list'>
      <li className='list-title'>{props.item}</li>
      {props.data.map((element) => {
        // console.log(malt.name);
        return <li className='hop'>{element.name}</li>;
      })}
    </ul>
  );
}

export default BuildList;
