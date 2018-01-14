import React from 'react';
import { Segment, Label, Header } from 'semantic-ui-react';
import './AboutView.css';
import nodejsLogo from '../../assets/nodejs.svg';
import reactLogo from '../../logo.svg';
import reduxLogo from '../../assets/redux.svg';
import passportjsLogo from '../../assets/passportjs.svg';
import mongodbLogo from '../../assets/mongodb.svg';
import tailwindcssLogo from '../../assets/tailwindcss.svg';
import semanticLogo from '../../assets/semantic.png';
const AboutView = () => (
    <div>
        <div className='mt-2 mb-2'>
            <Header as='h1' textAlign='center'>About</Header>
        </div>
        <Segment>
            <Header as='h3'>Description</Header>
            <div className='pl-2'>
              Pictures App is a full-stack project for freeCodeCamp.
            </div>
        </Segment>
        <Segment>
            <Header as='h3'>Frontend Techniques</Header>
            <div className='pl-2'>
                <Label className="label-mobile" as='a' basic image>
                  <img  src={reactLogo} alt="React" />
                  React
                </Label>
                <Label className="label-mobile" as='a' basic image>
                  <img  src={reduxLogo} alt="React" />
                  Redux
                </Label>
                <Label className="label-mobile" as='a' basic image>
                  <img  style={{padding: '0.125rem'}} src={semanticLogo} alt="Semantic Ui" />
                  Semantic Ui
                </Label>
                <Label className="label-mobile" as='a' basic image>
                  <img  src={tailwindcssLogo} alt="Tailwind CSS" />
                  Tailwind CSS
                </Label>
            </div>
      </Segment>
      <Segment>
            <Header as='h3'>Backend Techniques</Header>
            <div className='pl-2'>
                <Label className="label-mobile" as='a' basic image>
                  <img  style={{padding: '0.125rem'}} src={nodejsLogo} alt="NodeJs" />
                  Node.Js
                </Label>
                <Label className="label-mobile" as='a' basic>
                  Express
                </Label>
                <Label className="label-mobile" as='a' basic image>
                  <img  src={mongodbLogo} alt="MongoDB" />
                  MongoDB
                </Label>
                <Label className="label-mobile" as='a' basic image>
                  <img  style={{padding: '0.125rem'}} src={passportjsLogo} alt="Passportjs" />
                  Passportjs
                </Label>
            </div>
      </Segment>
    </div>
);
export default AboutView