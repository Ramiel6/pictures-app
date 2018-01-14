import React from 'react';
import {
  Input,
  Dropdown,
} from 'semantic-ui-react';

// const isMobile = () => window.innerWidth < 400;

const MobileSearchView = (props) => (
  <div>
          
          <div className='block'>
            <Input className="w-4/5 pb-2" icon='search'  iconPosition='left' placeholder='Search by tags  Ex:Tag1 Tag2 ...' onChange={(e,data) => props.searchByTags(e,data)} />
          </div>
          {props.isLogedin && <span className="pr-3">
           <Dropdown options={viewOptions} defaultValue={viewOptions[0].value} onChange={(e,data)=>props.viewChange(e,data)}/>
          </span>}
          
          <span>
            <Dropdown options={sortOptions} placeholder='Sort By ' onChange={(e,data) => props.sortPictures(e,data)}/>
          </span>
  </div>
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

export default MobileSearchView;