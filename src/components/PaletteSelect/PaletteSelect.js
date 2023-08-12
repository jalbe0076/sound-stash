import './PaletteSelect.css'

const PaletteSelect = ({ setTheme }) => {
   
    const toggleTheme = (e) => {
        setTheme(e.target.value)
    }

    return (
        <select id='paletteSelect' onChange={toggleTheme}>
            <option value='dark'>purple</option>
            <option value='light'>brown</option>
        </select>
    )
}

export default PaletteSelect