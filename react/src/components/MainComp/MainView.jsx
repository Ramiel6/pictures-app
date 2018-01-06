import React from 'react';
import StackGrid from "react-stack-grid";
import { Card, Icon, Dimmer, Image, Popup, Modal, Label, Divider } from 'semantic-ui-react';
import LoadingView from '../LoadingView/LoadingView';
import './MainView.css';
import brokenPicture from '../../assets/brokenPicture.png';


class DimmerImage extends React.Component {
  state = {}
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })
  handleImgFallback = () => this.setState({ imgError: true })
  render() {
  const { active, imgError } = this.state;
    return(
      <div>
      
        <Dimmer.Dimmable 
          dimmed={active} 
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          >
          <Dimmer active={active} >
            <Icon name='zoom' size='huge' />
          </Dimmer>
          {imgError ? 
            <Image src={brokenPicture} />
          :
            <Image 
              onError={this.handleImgFallback} 
              src={this.props.imgSrc} 
              className={active ? "img-scale" : ""}
            />
          }
          
        </Dimmer.Dimmable>

      </div>
      )}
}

class MainView extends React.Component {
     
    componentDidMount(){
      this.props.getPictures(true);
    }
     
     render() {
      const {pictures, 
              selectedPicture, 
              modelShow, 
              handelModelActivation,
              likePicture,
              unlikePicture,
              linkToPicture,
              unlinkToPicture,
              deletePicture,
              pageLoading,
              } = this.props;
         
         return (
             <div className='block mt-8 min-height-fiexd'>
              { pageLoading ?
               <LoadingView />
              :
              (pictures &&
              <StackGrid columnWidth={250} gutterWidth={10} gutterHeight={15}  monitorImagesLoaded={true}>
              {pictures.map((picture,index)=>(
              
              <div key={index} >
                <Card raised link color='teal'>
                  <a onClick={() => handelModelActivation(picture,true)}><DimmerImage  imgSrc={picture.picUrl} /></a>
                    <Card.Content textAlign="center">
                      {this.props.user && picture.owner  && picture.owner.id ===  this.props.user._id ?
                        <Popup
                            trigger={<Icon link name='checkmark' size='large' color='green' />}
                            content='Owen Picture'
                            size='tiny'
                            inverted
                          />
                        :
                        (this.props.user && picture.linkers.includes(this.props.user._id) ?
                          <Popup
                            trigger={<Icon link name='linkify' size='large' color='teal' onClick={() => unlinkToPicture(picture)} />}
                            content='Unlink'
                            size='tiny'
                            inverted
                          />
                         :<Popup
                            trigger={<Icon link name='unlinkify' size='large' color='blue' onClick={() => linkToPicture(picture)} />}
                            content='Link To Me'
                            size='tiny'
                            inverted
                          />)}
                       
                        {this.props.user && picture.likes.includes(this.props.user._id) ?
                        <Popup
                          trigger={<span className="relative pr-2">
                                      <Icon link name='heart' size='large' color='pink' onClick={() => unlikePicture(picture)}/>
                                      <Label color='pink' floating  circular  size='tiny'>{picture.likes.length}</Label>
                                  </span>}
                          
                          content='Unlike'
                          size='tiny'
                          inverted
                        />
                        :<Popup
                          trigger={<span className="relative pr-2">
                                      <Icon link name='heart outline' size='large' color='pink' onClick={() => likePicture(picture)} />
                                      <Label color='pink' floating  circular  size='tiny'>{picture.likes.length}</Label>
                                  </span>}
                          
                          content='Like Me'
                          size='tiny'
                          inverted
                        />}
                        
                        
                        
                    </Card.Content>
                  </Card>
              </div>
              ))}
              </StackGrid>)}
            
            
            {selectedPicture && 
            <Modal 
                    open={modelShow}
                    onClose ={() => handelModelActivation(null,false) }
                    closeIcon
                    >
                    <Modal.Header>Selected Photo</Modal.Header>
                    <Modal.Content image>
                      
                      <Image wrapped size='large' src={selectedPicture.picUrl} />
                      
                      <Modal.Description style={{width:'50%'}}>
                        <div>
                          <span className="header-font text-lg font-bold">By</span>
                          {selectedPicture.owner.name ?
                            <span className="header-font  text-grey-dark italic font-font-medium"> {' ' + selectedPicture.owner.name + ' '}</span>
                            :<span className="header-font  text-grey-dark italic font-font-medium"> {' Unknown '}</span>}
                          <span className="float-right mr-3">
                            <Popup
                              trigger={<Label as='a' 
                                              color='blue' 
                                              size='tiny'
                                              href={selectedPicture.picUrl}
                                              target='_blank'
                                              >
                                          <Icon name='zoom' />
                                           Open
                                        </Label>}
                              content='Open In Full Size'
                              size='tiny'
                              inverted
                              />
                            {this.props.user && selectedPicture.owner.id === this.props.user._id &&
                            <Label as='a' color='red' size='tiny' onClick={() => deletePicture (selectedPicture)}>
                                <Icon name='trash' />
                                  Delete
                            </Label>}
                          </span>
                       </div>
                        
                       {/*<Button as='div' labelPosition='right' size="mini">
                            
                              <Button color='red' size="mini">
                                <Icon name='heart' />
                                Like
                              </Button>
                              <Label as='a' basic color='red' pointing='left'>{selectedPicture && selectedPicture.likes.length}</Label>
                            </Button>*/}
                        
                        {selectedPicture.description && <Divider horizontal>Description</Divider>}
                        {selectedPicture.description && <p>{selectedPicture.description}</p>}
                      
                      
                        {selectedPicture.tags.length > 0 && <Divider horizontal>Tags</Divider>}
                        {selectedPicture.tags.length > 0 && selectedPicture.tags.map((tagItem,index) => (<Label tag key={index} style={{marginLeft: '1.3em'}}>{tagItem}</Label>))}

                      </Modal.Description>
                    </Modal.Content>
                  </Modal>}
            
            
            
            
             </div>
             );
     }
}
export default MainView;