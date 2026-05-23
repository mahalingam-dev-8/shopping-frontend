"use client";

import { Box, Button, Divider, Modal, Stack, TextField, Typography } from "@mui/material";
import { CSSProperties, useState } from "react";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import createProduct from "../actions/create-product";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  bgcolor: "background.paper",
  border: "1px solid #2a2a2a",
  borderRadius: 3,
  boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
  p: 4,
};

const VisuallyHiddenInput: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateProductModal({ open, handleClose }: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const [filename, setfilename] = useState("");

  const onClose = () => {
    setResponse(undefined);
    handleClose();
    setfilename("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles}>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <AddShoppingCartIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={700}>New Product</Typography>
          </Stack>

          <Divider />

          <form
            action={async (formData) => {
              const res = await createProduct(formData);
              setResponse(res);
              if (!res.error) onClose();
            }}
          >
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Product Name"
                variant="outlined"
                required
                fullWidth
                helperText={response?.error}
                error={!!response?.error}
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={2}
              />
              <TextField
                name="price"
                label="Price ($)"
                variant="outlined"
                required
                fullWidth
                type="number"
                inputProps={{ min: 0, step: "0.01" }}
              />

              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ borderStyle: "dashed", py: 1.5 }}
              >
                {filename ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <InsertDriveFileIcon fontSize="small" />
                    <Typography variant="body2" noWrap maxWidth={240}>{filename}</Typography>
                  </Stack>
                ) : (
                  "Upload Image"
                )}
                <input
                  style={VisuallyHiddenInput}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setfilename(e.target.files?.[0]?.name ?? "")}
                />
              </Button>

              <Button type="submit" variant="contained" size="large" fullWidth>
                Create Product
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Modal>
  );
}
