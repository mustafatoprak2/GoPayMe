import React, {useState} from 'react';
import { Card, Icon, Image, Label, Progress } from 'semantic-ui-react';
import CreateModal from './CreateModal';
import {useLocation} from 'react-router-dom'

const CardItem = ({ data, handleClick }) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  // <Label color="red" floating>
  //   22
  // </Label>;
  console.log('locat',data._id)
  return (
    <div>
      {data !== {} && (
        <div>
          <Card style={{ height: '25rem', width: '15rem' }} onClick={()=> handleClick(data._id)}>
            {location.pathname === '/fundraisers' ? (
              <Label color="green" floating onClick={() => setOpen(true)}>
                Edit
              </Label>
            ) : (
              <Label color="green" floating >
               Active
              </Label>
            )}
            {open && <CreateModal open={open} setOpen={setOpen} editData={data} />}

            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>{data.title}</Card.Header>
              <Card.Meta>created: days ago</Card.Meta>
              <Card.Description>{data.description?.substring(1, 20) + '...'}</Card.Description>
            </Card.Content>
            {/* <Card.Content extra style={{height: '20rem'}}> */}
              {/* <Icon name="user" size='small'/> */}
              <Progress
                color="purple"
                percent={data.currentAmount ? (data.currentAmount / data.targetAmount) * 100 : 0}
                progress
                style={{margin: '0 2rem 2rem 2rem', height: '2rem'}}
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
