import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { activitesByDate, loading, deleteActivity } = activityStore;
  const [currentTarget, setCurrentTarget] = useState("");
  const handleDeleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    if (e.currentTarget.name === id) {
      setCurrentTarget(e.currentTarget.name);
    }
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group>
        {activitesByDate.map((activity: Activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => activityStore.selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  onClick={(e) => handleDeleteActivity(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={loading && currentTarget === activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
