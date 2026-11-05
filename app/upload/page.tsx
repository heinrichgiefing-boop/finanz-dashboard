import ReceiptUpload from "../../components/ReceiptUpload";

export default function UploadPage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Beleg Upload
      </h1>

      <ReceiptUpload />
    </main>
  );
}