const Persons = ({filteredPersons, deletePerson}) => {
  return (
    <div>
      {filteredPersons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id)} style={{ marginLeft: '0.5rem' }}>delete</button>
      </p>
      ))}
    </div>
    );
};

export default Persons;