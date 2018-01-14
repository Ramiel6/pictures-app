import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Icon,
  Dropdown,
  Image,
} from 'semantic-ui-react';
import avatar from '../../assets/avatar.png';


const MobileNavView = (props) => (
  <Menu fixed='top' size='large' pointing>
           <Menu.Item header as={Link} to='/'>Pictures App</Menu.Item>
    
          <Menu.Item name='Add'  as={Link} to='/add-picture' active={props.activeMenu === 'add'}  />
          <Menu.Menu position='right'>
            {/*<Menu.Item name='Snackbar' as='a' onClick={props.handelshowSanckbar}/>*/}
            
          {props.isLogedin && <Dropdown 
                                item 
                                trigger={
                                  <span>
                                    <Image avatar src={( props.user.profilePicture) || avatar} style={{width:'1.7em', height:'1.7em'}} /> 
                                    {/*props.user.name */}
                                  </span>
                                  }
                                  >
              <Dropdown.Menu>
                <Menu.Item name='Profile' icon='user' as={Link} to='/profile'  onClick={() => props.activateNav('profile')}/>
                <Menu.Item name='About' icon='help circle' as={Link} to='/about'  onClick={() => props.activateNav('about')} />
                <Menu.Item name='Logout' icon='log out' as='a' onClick={() => props.logout()}/>
              </Dropdown.Menu>
           </Dropdown>}
            {!props.isLogedin && <Dropdown 
                                item 
                                trigger={
                                  <Icon name="content" />
                                  }
                                  >
              <Dropdown.Menu>
                <Menu.Item name='About' as={Link} to='/about'  active={props.activeMenu === 'about'} onClick={() => props.activateNav('about')}/>
                <Menu.Item name='Sginup' as={Link} to='/signup' active={props.activeMenu === 'signup'} onClick={() => props.activateNav('signup')}/>
                <Menu.Item name='Login' as={Link} to='/login'  active={props.activeMenu === 'login'} onClick={() => props.activateNav('login')}/>
              </Dropdown.Menu>
           </Dropdown>}
          </Menu.Menu>

  </Menu>
);

export default MobileNavView;