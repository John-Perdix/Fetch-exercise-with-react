import { Link } from 'react-router-dom';

const MenuNav = ({ children }) => {
	return (
		<>
			<nav className="navbar">
				<Link to="/">Home</Link>
			</nav>
			<div>{children}</div>
		</>
		)
}

export default MenuNav;