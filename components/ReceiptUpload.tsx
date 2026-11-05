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
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Beleg hochladen
      </h2>

      <div
        {...getRootProps()}
        className={`
          border-2
          border-dashed
          rounded-xl
          p-10
          text-center
          cursor-pointer
          transition
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300"
          }
        `}
      >
        <input
          {...getInputProps()}
          accept="image/*"
          capture="environment"
        />

        <p className="font-medium">
          Foto hier hineinziehen
        </p>

        <p className="text-slate-500 mt-2">
          oder antippen um Kamera bzw.
          Galerie zu öffnen
        </p>
      </div>

      {uploading && (
        <div className="mt-4 text-blue-600">
          Upload läuft...
        </div>
      )}

      {message && (
        <div className="mt-4 font-medium">
          {message}
        </div>
      )}

      {previewUrl && (
        <div className="mt-6">

          <h3 className="font-semibold mb-2">
            Vorschau
          </h3>

          <img
            src={previewUrl}
            alt="Beleg Vorschau"
            className="
              max-w-full
              rounded-lg
              border
            "
          />

        </div>
      )}

    </div>
  );
}