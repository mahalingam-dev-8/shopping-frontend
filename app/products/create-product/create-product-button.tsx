"use client";

import { Alert, Button, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useContext } from "react";
import { AdminContext } from "@/app/auth/admin-context";
import CreateProductModal from "./create-product-modal";

interface Notice {
  severity: "success" | "warning";
  message: string;
}

/** "List product" button with its modal; renders nothing for customers. */
export default function CreateProductButton() {
  const isAdmin = useContext(AdminContext);
  const [modalVisible, setModalVisible] = useState(false);
  // Kept after closing so the Snackbar's exit animation still has content to show.
  const [notice, setNotice] = useState<Notice>({ severity: "success", message: "" });
  const [noticeOpen, setNoticeOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setModalVisible(true)}
        sx={{ whiteSpace: "nowrap" }}
      >
        List product
      </Button>
      <CreateProductModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
        onCreated={(imageError) => {
          setNotice(
            imageError
              ? { severity: "warning", message: `Product listed, but the image upload failed: ${imageError}` }
              : { severity: "success", message: "Product listed" },
          );
          setNoticeOpen(true);
        }}
      />
      <Snackbar
        open={noticeOpen}
        autoHideDuration={notice.severity === "warning" ? 8000 : 3000}
        onClose={() => setNoticeOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={notice.severity} variant="filled" onClose={() => setNoticeOpen(false)}>
          {notice.message}
        </Alert>
      </Snackbar>
    </>
  );
}
