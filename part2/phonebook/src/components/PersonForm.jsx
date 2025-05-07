
const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addPersonalData}) => {
    return (
        <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type='submit' onClick={addPersonalData}>add</button>
        </div>
      </form>
    )
}

export default PersonForm