
export default function handler(req, res) {
  res.status(200).json({
    status: "success",
    data: {
      message: "Hello World",
      date: new Date(),
    },
  });
}
