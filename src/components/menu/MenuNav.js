import { Link } from 'react-router-dom';

const MenuNav = ({ children }) => {
	return (
		<>
			<nav className="navbar">
				<Link to="/">Home</Link>
				<Link to="//characters/:characterId">Character</Link>
			</nav>
			<div>{children}</div>
		</>
		)
}

export default MenuNav;