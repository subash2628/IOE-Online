import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  enabled,
  onSubmit,
  toggle,
  currentCatagory,
}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const handleChange = (event) => {
    event.target.id === "title"
      ? setTitle(event.target.value)
      : setLink(event.target.value);
  };

  const clearDataAfterFormSubmit = (_) => {
    console.log("form is cleared");
    setLink("");
    setTitle("");
  };

  const style = { marginTop: 30 };

  return (
    <div>
      <Dialog
        open={enabled}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => toggle()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Contribute {currentCatagory} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Helping others is the way we help ourselves.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              id="title"
              label="Title"
              placeholder="Title"
              //helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              multiline
              rows={2}
              style={style}
              onChange={handleChange}
              value={title}
              //autoComplete={false}
            />
            <TextField
              id="link"
              label="Link"
              placeholder="Link"
              //helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={style}
              onChange={handleChange}
              value={link}
              //autoComplete={false}
              // multiline
              // rows={2}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              onSubmit({
                title,
                link,
                clearDataAfterFormSubmit: () => clearDataAfterFormSubmit(),
              })
            }
            color="primary"
            disabled={
              link.length >= 8 &&
              (link.includes("https://") || link.includes("http://")) &&
              title.length >= 5
                ? false
                : true
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
