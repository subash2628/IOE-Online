import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import { makeStyles } from "@material-ui/core/styles";
//import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//import Button from "@material-ui/core/Button";

export default function SimpleBackdrop() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="d-flex flex-row   mt-5 p-4">
      <div className="align-items-start ">
        <Button>
          <ArrowBackIcon fontSize="large" onClick={() => console.log("Back")} />
        </Button>
      </div>

      <div className="flex-column justify-content-center  flex-fill">
        <h3 className="text-info">Please fill up the form...</h3>
        <TextField
          id="filled-full-width"
          label="Title"
          style={{ margin: 8 }}
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
          style={{ marginTop: 30 }}
        />
        <TextField
          id="filled-full-width"
          label="Description"
          style={{ margin: 8 }}
          placeholder="Description"
          //helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          multiline
          rows={4}
          style={{ marginTop: 20 }}
        />
        <TextField
          id="filled-full-width"
          label="Link"
          style={{ margin: 8 }}
          placeholder="Link"
          //helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ marginTop: 20 }}
          // multiline
          // rows={2}
        />
        <Button
          variant="contained"
          size="large"
          onClick={() => console.log("uploaded")}
          className="mt-2"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
