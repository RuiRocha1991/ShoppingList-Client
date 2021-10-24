import React from 'react'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {
  List,
  ListSubheader, makeStyles, RootRef, Typography
} from "@material-ui/core";
import CustomItem from "./components";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#f5f5f5',
    padding: '8px',
  }
}));

const ListItems = (props) => {
  const {
    itemsList,
    setList,
    handleChangeQuantity,
    handleSelect,
    title,
  } = props;

  const classes = useStyles();

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
        itemsList,
        result.source.index,
        result.destination.index
    );
    setList(items)
  }

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <List subheader={
                  <ListSubheader className={classes.header} component="ul"
                                 id="nested-list-subheader">
                    <Typography
                        variant="subtitle1"
                    >
                      {title}
                    </Typography>
                  </ListSubheader>
                }>
                  {itemsList.map((item, index) => (
                      <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                      >
                        {(provided, snapshot) => (
                            <CustomItem item={item}
                                        provided={provided}
                                        snapshot={snapshot}
                                        handleChangeQuantity={handleChangeQuantity}
                                        handleSelect={handleSelect}
                            />
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              </RootRef>
          )}
        </Droppable>
      </DragDropContext>
  );
}
export default ListItems;