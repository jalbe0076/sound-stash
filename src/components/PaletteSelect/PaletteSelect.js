import './PaletteSelect.css'

const PaletteSelect = ({ setTheme }) => {
   
    const toggleTheme = (e) => {
        setTheme(e.target.value)
    }

    return (
        <select id='paletteSelect' onChange={toggleTheme}>
            <option value='purple'>purple</option>
            <option value='brown'>brown</option>
        </select>
    )
}

export default PaletteSelect