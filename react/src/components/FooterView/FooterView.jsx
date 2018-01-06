import React from 'react'
import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react';

const FooterView = () => (
    <Segment inverted vertical style={{ padding: '2em 0em', marginTop: '3em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                 <p>Copyright &copy; 2018. All Rights Reserved</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
);
export default FooterView