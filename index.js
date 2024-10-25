import express from "express";

const app = express();
app.use(express.json());

const PORT = 5000;

const mockMessages = [
  { id: 1, sender: "Rajesh", message: "Amy, good luck getting these guys excited about a dinner with a theme. I gave up when no one cared about my Tom Hanks-Giving." },
  { id: 2, sender: "Wolowitz", message: "Hey, I threw out the first pitch at an Angels game." },
  { id: 3, sender: "Sheldon", message: "The same thing that happened to Homo Erectus. He was replaced by a superior species." },
  { id: 4, sender: "Leonard", message: "I've always been a little confused about this. Why don't Hindus eat beef?" },
  { id: 5, sender: "Amy", message: "Where did you get empty Dove bar wrappers?" },
  { id: 6, sender: "Bernadette", message: "Gosh, Amy. I'm sensing a little hostility. Is it maybe because like Sheldon's work, your sex life is also theoretical?" },
  { id: 7, sender: "Penny", message: "What do you mean new roommate? What happened to Leonard?" },
];

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});


app.get("/api/messages", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value)
    return res.send(mockMessages.filter((message) => message[filter].includes(value)));
  return res.send(mockMessages);
});

app.post("/api/messages", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newMessage = {id: mockMessages[mockMessages.length - 1].id + 1, ...body};
  mockMessages.push(newMessage);
  return res.status(201).send(newMessage);
});


app.get("/api/messages/:id", (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Invalid ID." });
  const findMessage = mockMessages.find((message) => message.id === parsedId);
  if (!findMessage) return res.sendStatus(404);
  return res.send(findMessage);
});


app.put("/api/messages/:id", (req, res) => {
  const { body, params: { id } } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Invalid ID." });
  const findMessageIndex = mockMessages.findIndex((message) => message.id === parsedId);
  if (findMessageIndex === -1) return res.sendStatus(404);
  mockMessages[findMessageIndex] = { id: parsedId, ...body };
  return res.status(200).send(mockMessages[findMessageIndex]);
});

app.patch("/api/messages/:id", (req, res) => {
  const { body, params: { id } } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Invalid ID." });
  const findMessageIndex = mockMessages.findIndex((message) => message.id === parsedId);
  if (findMessageIndex === -1) return res.sendStatus(404);
  mockMessages[findMessageIndex] = { ...mockMessages[findMessageIndex], ...body };
  return res.status(200).send(mockMessages[findMessageIndex]);
});


app.delete("/api/messages/:id", (req, res) => {
  const { params: { id } } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Invalid ID." });
  const findMessageIndex = mockMessages.findIndex((message) => message.id === parsedId);
  if (findMessageIndex === -1) return res.sendStatus(404);
  mockMessages.splice(findMessageIndex, 1);
  return res.send("Message deleted!");
});