const now = new Date();

const year = now.getFullYear();
const month = String(
  now.getMonth() + 1
).padStart(2, "0");

const fileName =
  `${year}/${month}/${Date.now()}-${file.name}`;