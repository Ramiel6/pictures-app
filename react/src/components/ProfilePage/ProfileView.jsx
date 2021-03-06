import React from 'react';
import './ProfileView.css'
import { Link } from 'react-router-dom';
import {
  Grid,    
  Tab,
  Image,
  Button,
  Icon
} from 'semantic-ui-react';
import avatar from '../../assets/avatar.png';

const LocalContent = props => (
    <Tab.Pane>
        <div>
            { window.innerWidth > 800 ?
                <Link to='/update-profile'><Button floated='right' primary ><Icon name='edit'/>Edit</Button></Link>
                :<Link to='/update-profile' className="float-right"><Icon name='edit' size='large'/></Link>}
        </div>
       
        <div className='w-full'>
            <strong>Name: </strong>{props.user.local && props.user.local.name}<br />
            <strong>Email: </strong> {props.user.local && props.user.local.email}
        </div>
    
    </Tab.Pane> 
    );
const GoogleContent = props => (
    <Tab.Pane>
        {props.user.google ?
            <div>
                <div className='text-center w-full'>
                    <strong>Name: </strong>{props.user.google.name}<br />
                    <strong>Email: </strong>{props.user.google.email}
                </div>
            </div>
            :
            <div className="text-center">
                <Button color='google plus' as='a' target= '_self' href="/auth/google">
                  <Icon name='google' size='large' /> Add Google Account
                </Button>
            </div>
        }
    </Tab.Pane> 
    );
const GithubContent = props => (
    <Tab.Pane>
        { props.user.github ?
        <div>
            <div className='text-center w-full'>
                <strong>Name: </strong>{props.user.github.name}<br />
                <strong>Email: </strong>{props.user.github.email || 'no github email!'}
            </div>
        </div>
        :
        <div className="text-center">
            <Button basic as='a' target= '_self' href="/auth/github">
              <Icon name='github' size='large' /> Add Github Account
            </Button>
        </div>
        }
    </Tab.Pane> 
    );

const ProfileView = (props) => (
    <div className='profile'>
    <Grid>
        <Grid.Row>
            <Grid.Column width={4} only='large screen tablet computer'>
                 <Image centered circular className='m-4 w-48 h-48' src={ (props.user.local && props.user.local.profilePicture) || avatar } />
            </Grid.Column>
            <Grid.Column width={12}>
                <Tab menu={{ secondary: true, pointing: true }}
                   panes={[
                      { menuItem: {name:'Local', icon:"save"}, render: () => <LocalContent user = {props.user}/>},
                      { menuItem: {name:'Google', icon:"google"}, render: () => <GoogleContent user = {props.user}/> },
                      { menuItem: {name:'Github', icon:"github"}, render: () => <GithubContent user = {props.user}/> },
                    ]}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
    </div>
);
export default ProfileView;