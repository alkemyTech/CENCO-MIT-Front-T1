import { MoreVert } from "@mui/icons-material";
import { Box, Popover } from "@mui/material";
import React, { useState } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

interface ActionButtonProps {
  userID: number;
}

export default function ActionButton({ userID }: Readonly<ActionButtonProps>) {
  // popover
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <MoreVert
        aria-describedby={id}
        onClick={handleClick}
        sx={{ color: "var(--text-color)", cursor: "pointer" }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box display={"block"} padding={1.5}>
          <EditButton userID={userID} />
          <DeleteButton userID={userID} />
        </Box>
      </Popover>
    </>
  );
}
