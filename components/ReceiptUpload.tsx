"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../lib/supabase";

export default function ReceiptUpload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      setUploading(true);
      setMessage("");

      try {
        setPreviewUrl(
          URL.createObjectURL(file)
        );

        const now = new Date();

        const year =
          now.getFullYear();

        const month = String(
          now.getMonth() + 1
        ).padStart(2, "0");

        const fileName =
          `${year}/${month}/${Date.now()}-${file.name}`;

        const { error } =
          await supabase.storage
            .from("receipts")
            .upload(
              fileName,
              file,
              {
                upsert: false,
              }
            );

        if (error) {
          throw error;
        }

        setMessage(
          "✅ Beleg erfolgreich hochgeladen"
        );
      } catch (err: any) {
        setMessage(
          `❌ Fehler: ${err.message}`
        );
      } finally {
        setUploading(false);
      }
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div 