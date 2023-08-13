import './PaletteSelect.css'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const PaletteSelect = ({ isDark, setIsDark }) => {

    const toggleDarkMode = (checked) => {
        setIsDark(checked)
    };

    return (
        <DarkModeSwitch
            style={{ marginLeft: '2rem' }}
            checked={isDark}
            onChange={toggleDarkMode}
            size={30}
        />
    )
}

export default PaletteSelect