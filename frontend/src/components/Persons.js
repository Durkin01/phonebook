const Persons = ({ filterPersons, onClick }) => {
    
    function windowConfirmDelete(person) {
        if (window.confirm("do you really want to delete this name?")) {
            onClick(person.id)
        }
    }

    return (
        filterPersons().map(person => 
            <div key={person.name}> {person.name} {person.number} 
                <button onClick={() => windowConfirmDelete(person)}> 
                    delete
                </button>
            </div>
        )
    )
}

export default Persons 