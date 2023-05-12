//      <PersonForm onSubmit={addPerson} valueName={newName} onNameChange={handleNameChange} 
//        valueNumber={newNumber} onNumberChange={handleNumberChange} />

const PersonsForm = (props) => {
    return (

        <form onSubmit={props.onSubmit}>
            <div> name: <input value={props.valueName} onChange={props.onNameChange}/></div>
            <div> number: <input value={props.valueNumber} onChange={props.onNumberChange}/></div>
            <div><button type="submit">add</button></div>
        </form>

    )
}

export default PersonsForm