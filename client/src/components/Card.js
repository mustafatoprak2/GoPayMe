import React, { useState } from 'react';
import { Card, Icon, Image, Label, Progress } from 'semantic-ui-react';
import CreateModal from './CreateModal';
import { useLocation } from 'react-router-dom';

const CardItem = ({ data, handleClick }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // <Label color="red" floating>
  //   22
  // </Label>;
  console.log('locat', data._id);
  return (
    <div>
      {data !== {} && (
        <div className="hover">
          <Card style={{ height: '25rem', width: '15rem' }}>
            {location.pathname === '/fundraisers' ? (
              <Label color="green" floating onClick={() => setOpen(true)}>
                Edit
              </Label>
            ) : (
              <Label color="green" floating>
                Active
              </Label>
            )}
            {open && <CreateModal open={open} setOpen={setOpen} editData={data} />}
            {/* <div style={{ position: 'absolute', bottom: '200rem' }}>Name : City</div> */}
            <Image
              src={data.image}
              wrapped
              ui={false}
              onClick={() => handleClick(data._id)}
              style={{ cursor: 'pointer' }}
            />

            <Card.Content>
              <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{data.title}</div>
                <div style={{ display: 'flex' }}>
                  <Icon name="thumbs up" /> <p style={{ color: 'gainsboro' }}>2</p>
                </div>
              </Card.Header>
              <Card.Meta>created by: 'data writer'</Card.Meta>
              <Card.Description>{data.description?.substring(1, 20) + '...'}</Card.Description>
            </Card.Content>
            {/* <Card.Content extra style={{height: '20rem'}}> */}
            {/* <Icon name="user" size='small'/> */}
            <Progress
              color="purple"
              percent={data.currentAmount ? (data.currentAmount / data.targetAmount) * 100 : 0}
              progress
              style={{ margin: '0 2rem 2rem 2rem', height: '2rem' }}
              content="Raised"
            />
            {/* </Card.Content> */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default CardItem;
