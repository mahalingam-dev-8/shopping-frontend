"use client";

import { Alert, Fab, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useContext } from "react";
import { AdminContext } from "@/app/auth/admin-context";
import CreateProductModal from "./create-product-modal";

export default function CreateProductFab() {
  const isAdmin = useContext(AdminContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [created, setCreated] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <CreateProductModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
        onCreated={() => setCreated(true)}
      />
      <div className="fixed right-10 bottom-10">
        <Fab
          color="primary"
          variant="extended"
          onClick={() => setModalVisible(true)}
          sx={{ boxShadow: "0 0 24px rgba(245,158,11,0.4)", fontWeight: 700, textTransform: "none" }}
        >
          <AddIcon sx={{ mr: 1 }} />
          List product
        </Fab>
      </div>
      <Snackbar
        open={created}
        autoHideDuration={3000}
        onClose={() => setCreated(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setCreated(false)}>
          Product listed
        </Alert>
      </Snackbar>
    </>
  );
}
