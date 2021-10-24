import React from 'react';
import {
  Checkbox, ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText, TextField
} from "@material-ui/core";


const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 8 * 2,
  margin: `0 0 8px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgray' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle
});

const CustomItem = (props) => {
  const {item, provided, snapshot, handleChangeQuantity, handleSelect} = props;

  return (<ListItem key={item._id}
                    role={undefined}
                    divider={true}
                    button
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    style={getItemStyle(
                        provided.draggableProps.style,
                        snapshot.isDragging
                    )}>
    <ListItemIcon>
      <Checkbox
          edge="start"
          tabIndex={-1}
          disableRipple
          inputProps={{'aria-labelledby': item._id}}
          onChange={(event) => handleSelect(item._id, event.target.checked)}
      />
    </ListItemIcon>
    <>
      <ListItemText id={item._id} primary={item.item.name}/>
      <ListItemSecondaryAction>
        <TextField
            label={item.item.unitMeasurement.toUpperCase()}
            name={item.item.name}
            type="number"
            value={item.quantity} style={{textAlign: 'right', maxWidth: '50px'}}
            onChange={(event) => handleChangeQuantity(item._id,
                event.target.value)}
        />
      </ListItemSecondaryAction>
    </>
    {provided.placeholder}
  </ListItem>);
}

export default CustomItem;