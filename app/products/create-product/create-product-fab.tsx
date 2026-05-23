"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useContext } from "react";
import { AdminContext } from "@/app/auth/admin-context";
import CreateProductModal from "./create-product-modal";

export default function CreateProductFab() {
  const isAdmin = useContext(AdminContext);
  const [modalVisible, setModalVisible] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <CreateProductModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
      <div className="fixed left-10 bottom-10">
        <Fab color="primary" onClick={() => setModalVisible(true)} sx={{ boxShadow: "0 0 24px rgba(245,158,11,0.4)" }}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
