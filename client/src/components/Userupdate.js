import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const Userupdate = (props) => {
    const [content, setContent] = useState(props.originalContent);

  const [title, settitle] = useState(props.originaltitle);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    const title = e.target.title.value;

    let error = null;

    if (props.validate) {
      error = props.validate(content,title);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
      
        <TextField
          value={content}
          fullWidth
          margin="normal"
          placeholder="content"
          name="content"
          sx={{ backgroundColor: "white" }}
          onChange={handleChange}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ backgroundColor: "white", mt: 1 }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};

export default Userupdate;
