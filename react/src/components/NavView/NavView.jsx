import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Input,
  Dropdown,
  Image,
} from 'semantic-ui-react';
import avatar from '../../assets/avatar.png';

// const isMobile = () => window.innerWidth < 400;

const NavView = (props) => (
  <Menu fixed='top' size='large' pointing>
           <Menu.Item header as={Link} to='/'>Pictures App</Menu.Item>
         {window.innerWidth < 800 && <Menu.Item name='home' as={Link} to='/' active={props.activeMenu === 'home'} onClick={() => props.activateNav('home')}/>}
          <Menu.Item name='Add'  as={Link} to='/add-picture' active={props.activeMenu === 'add'}  />
          {props.isLogedin && <Menu.Item>
           <Dropdown options={viewOptions} defaultValue={viewOptions[0].value} onChange={(e,data)=>props.viewChange(e,data)}/>
          </Menu.Item>}
          <Menu.Item className='w-2/5'>
            <Input icon='search'  iconPosition='left' placeholder='Search by tags  Ex:Tag1 Tag2 ...' onChange={(e,data) => props.searchByTags(e,data)} />
          </Menu.Item>
          <Menu.Item>
            <Dropdown options={sortOptions} placeholder='Sort By ' onChange={(e,data) => props.sortPictures(e,data)}/>
          </Menu.Item>
          <Menu.Menu position='right'>
            {/*<Menu.Item name='Snackbar' as='a' onClick={props.handelshowSanckbar}/>*/}
            
          {props.isLogedin && <Dropdown 
                                item 
                                trigger={
                                  <span>
                                    <Image avatar src={( props.user.profilePicture) || avatar} style={{width:'1.7em', height:'1.7em'}} /> 
                                    {props.user.name}
                                  </span>
                                  }
                                  >
              <Dropdown.Menu>
                <Menu.Item name='Profile' icon='user' as={Link} to='/profile'  onClick={() => props.activateNav('profile')}/>
                <Menu.Item name='About' icon='help circle' as={Link} to='/about'  onClick={() => props.activateNav('about')} />
                <Menu.Item name='Logout' icon='log out' as='a' onClick={() => props.logout()}/>
              </Dropdown.Menu>
           </Dropdown>}
            {!props.isLogedin && <Menu.Item name='About' as={Link} to='/about'  active={props.activeMenu === 'about'} onClick={() => props.activateNav('about')}/>}
            {!props.isLogedin && <Menu.Item name='Sginup' as={Link} to='/signup' active={props.activeMenu === 'signup'} onClick={() => props.activateNav('signup')}/>}
            {!props.isLogedin && <Menu.Item name='Login' as={Link} to='/login'  active={props.activeMenu === 'login'} onClick={() => props.activateNav('login')}/>}
            
          </Menu.Menu>

  </Menu>
);
const viewOptions = [
  {
    text: 'All Site Pictures',
    value: 'all',
    key: 'all',
    icon: { name:'image' },
  },
  {
    text: 'All User Pictures',
    value: 'user',
    key: 'user',
    icon: { name:'users' },
  },
  {
    text: 'Owend Only',
    value: 'owend',
    key: 'owend',
    icon: { name:'user' },
  },
  {
    text: 'Linked Only',
    value: 'linked',
    key: 'linked',
    icon: { name:'linkify' },
  },
];
const sortOptions = [
  {
    text: 'Date ∨',
    value: 'dateDece',
    key: 'dateDece',
    icon: { name:'time' },
  },
  {
    text: 'Date ∧',
    value: 'dateAsce',
    key: 'dateAsce',
    icon: { name:'time' },
  },
  {
    text: 'Likes',
    value: 'likes',
    key: 'likes',
    icon: { name:'heart' },
  },
];

export default NavView;