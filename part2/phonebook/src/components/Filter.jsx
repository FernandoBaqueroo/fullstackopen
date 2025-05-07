const Filter = ({searchName, handleFilterNames}) => {
    return (
        <div>
            filter shown with <input value={searchName} onChange={handleFilterNames}/>
        </div>
    )
}

export default Filter