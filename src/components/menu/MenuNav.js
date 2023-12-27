import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import  logo  from '../../logo_RM-02.png'


const navItems = [{
  name: 'Characters',
  path: '/'
},
{
  name: 'Episodes',
  path: '/episodes'
},
{
  name: 'Locations',
  path: '/locations'
}];
const items = navItems.map((item, index) => ({
  key: index + 1,
  label: (
    <Link to={item.path} style={{ color: 'white' }}>
      {item.name}
    </Link>
  )
}));

//menu do ant design
const MenuNav = () => {
  return (
    <div className="demo-logo flex" >
    <Link to='/'><img src={logo} alt='Logotype' width='150px'/></Link>
      <Menu
        mode="horizontal"
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />

    </div>
  )
}

export default MenuNav;